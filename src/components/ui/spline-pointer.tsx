import * as React from "react";

export interface SplinePointerProps extends React.SVGProps<SVGSVGElement> {}

// Simple pointer-like SVG icon
function SplinePointer({ className, ...props }: SplinePointerProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4 20L10.5 13.5M10.5 13.5L15 15L13.5 10.5M10.5 13.5L13.5 10.5M13.5 10.5L20 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="4" r="1.75" fill="currentColor" />
    </svg>
  );
}

export { SplinePointer };