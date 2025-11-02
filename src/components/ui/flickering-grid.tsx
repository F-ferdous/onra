"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  accentColor?: string;
  accentMax?: number;
  tintChangeRate?: number;
  useBlur?: boolean;
  shadowBlur?: number;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.1,
  color = "#000000",
  accentColor = "#ef89a6",
  accentMax = 0.2,
  tintChangeRate = 0.05,
  useBlur = true,
  shadowBlur = 2,
  width,
  height,
  className,
  maxOpacity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const toRGBAStringBase = useCallback((colorStr: string) => {
    if (typeof window === "undefined") return "rgba(0,0,0,";
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx = c.getContext("2d");
    if (!ctx) return "rgba(0,0,0,";
    ctx.fillStyle = colorStr;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
    return `rgba(${r}, ${g}, ${b},`;
  }, []);

  const memoizedBase = useMemo(() => toRGBAStringBase(color), [color, toRGBAStringBase]);
  const memoizedAccent = useMemo(() => toRGBAStringBase(accentColor), [accentColor, toRGBAStringBase]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      const tints = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
        tints[i] = Math.random() * accentMax * 0.3; // light accent to start
      }

      return { cols, rows, squares, tints, dpr };
    },
    [squareSize, gridGap, maxOpacity, accentMax],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, tints: Float32Array, deltaTime: number) => {
      const flicker = flickerChance * deltaTime;
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flicker) {
          squares[i] = Math.random() * maxOpacity;
        }
        // subtle tint drift for melting blend
        const drift = (Math.random() - 0.5) * tintChangeRate;
        tints[i] = Math.min(Math.max(tints[i] + drift, 0), accentMax);
        // occasional soft accent pulse
        if (Math.random() < flicker * 0.02) {
          tints[i] = Math.min(accentMax, tints[i] + accentMax * 0.15);
        }
      }
    },
    [flickerChance, maxOpacity, accentMax, tintChangeRate],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      tints: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j;
          const opacity = squares[idx];
          const tint = tints[idx];
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const w = squareSize * dpr;
          const h = squareSize * dpr;

          // base draw (black or configured base)
          ctx.shadowBlur = 0;
          ctx.fillStyle = `${memoizedBase}${opacity})`;
          ctx.fillRect(x, y, w, h);

          // soft accent overlay to "melt" into base
          if (tint > 0) {
            if (useBlur) {
              ctx.shadowColor = `${memoizedAccent}${Math.min(0.6, tint)})`;
              ctx.shadowBlur = shadowBlur * dpr;
            }
            ctx.fillStyle = `${memoizedAccent}${opacity * tint})`;
            ctx.fillRect(x, y, w, h);
          }
        }
      }
    },
    [memoizedBase, memoizedAccent, squareSize, gridGap, useBlur, shadowBlur],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, gridParams.tints, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.tints,
        gridParams.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};

export { FlickeringGrid };