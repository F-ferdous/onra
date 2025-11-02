"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
   Paperclip,
   Globe,
   ChevronDown,
   Undo,
   Wand2,
   Send,
   Globe2,
   BarChart3,
   Play,
   Gamepad2,
   Bot,
   Smartphone,
   MousePointerClick,
   ListChecks,
   Route,
   TrendingUp,
   FlaskConical,
   Orbit,
   Trophy,
   Plane,
   Video,
   Car,
   ShoppingCart,
   LayoutDashboard,
   ShoppingBag,
   Link as LinkIcon
 } from "lucide-react";
import { SplinePointer } from "@/components/ui/spline-pointer";

export default function HeroPrompt() {
  // State: selected category, prompt value, prompt history, theme dropdown open
  const [selected, setSelected] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [themeOpen, setThemeOpen] = useState(false);
  
  // Typing animation state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  // Refs: textarea focus and hidden file input
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Router for navigation
  const router = useRouter();

  // Categories for typing animation with intentional human errors
  const typingTexts = [
    "mvp for my startup that revolutionizes remote work...",
    "Enterprise solution that streamlines workflow management...",
    "ios app for my shopify store that increases mobile sales...",
    "ai agent that automates customer support...",
    "UI design that enhances user experience...",
    "Web application that connects freelancers with clients...",
    "mobile game that teaches coding fundamentals...",
    "Dashboard that visualizes real-time analytics...",
    "e-commerce platform that supports multiple vendors...",
    "Social media app that focuses on privacy...",
    "productivity tool that integrates with existing workflows...",
    "Learning management system that adapts to student needs...",
    "api that handles payment processing securely...",
    "chrome extension that boosts productivity...",
    "Machine learning model that predicts user behavior...",
    "blockchain application for supply chain tracking...",
    "chatbot that provides 24/7 customer service...",
    "video streaming platform with live features..."
  ];

  // Theme hydration guard: avoid SSR/CSR mismatch
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get random next index that hasn't been used recently
  const getRandomIndex = () => {
    const availableIndices = typingTexts
      .map((_, index) => index)
      .filter(index => !usedIndices.includes(index));
    
    if (availableIndices.length === 0) {
      // Reset used indices when all have been used
      setUsedIndices([]);
      return Math.floor(Math.random() * typingTexts.length);
    }
    
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
  };

  // Typing animation effect
  useEffect(() => {
    const typingSpeed = 60; // Faster typing
    const deletingSpeed = 30; // Faster deleting
    const pauseTime = 1500; // Shorter pause

    const timer = setTimeout(() => {
      const fullText = `Let's build an ${typingTexts[currentTextIndex]}`;
      
      if (!isDeleting) {
        // Typing
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (currentText.length > "Let's build an ".length) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          const nextIndex = getRandomIndex();
          setCurrentTextIndex(nextIndex);
          setUsedIndices(prev => [...prev, nextIndex].slice(-Math.floor(typingTexts.length / 2)));
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typingTexts, usedIndices]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 400); // Faster cursor blink

    return () => clearInterval(cursorTimer);
  }, []);

  const themeLabel = !mounted
    ? "Auto theme"
    : resolvedTheme === "dark"
    ? "Dark"
    : resolvedTheme === "light"
    ? "Light"
    : "Auto theme";

  // [Added by Cascade] Stable placeholder to avoid SSR/CSR mismatch
  const placeholder = mounted ? `${currentText}${showCursor ? '|' : ''}` : "";

  // Helper: enhance prompt to clarify scope and planning
  const enhancePrompt = (p: string) => {
    const base = p.trim();
    if (!base) return p;
    return `${base}\n\nPlease clarify scope, list key features, choose tech stack, define data schema, and outline success criteria. Generate an initial plan and file structure.`;
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div>
        <label htmlFor="ai-prompt-input" className="block">
          <h1 className="text-2xl md:text-3xl font-medium">
            Hi Aanin, what do you want to make?
          </h1>
        </label>
      </div>

      <div className="rounded-lg border bg-transparent">
        <div className="p-2">
          <div className="min-h-[96px]">
            <textarea
              id="ai-prompt-input"
              data-cy="ai-prompt-input"
              // [Added by Cascade] Use stable placeholder after mount only
              placeholder={placeholder}
              suppressHydrationWarning
              className="w-full h-[83px] resize-none rounded-md border border-transparent bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
              value={prompt}
              onChange={(e) => { setPromptHistory((h) => [...h, prompt]); setPrompt(e.target.value); }}
              ref={inputRef}
            />
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 px-1 pb-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Attach file"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md border"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </button>
            {/* Hidden file input: accepts text formats and appends content to prompt */}
            <input
              ref={fileInputRef}
              type="file"
              hidden
              suppressHydrationWarning
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const isText = file.type.startsWith("text/") || /\.(csv|md|txt|json)$/i.test(file.name);
                if (isText) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const text = String(reader.result || "");
                    const snippet = text.slice(0, 2000);
                    setPrompt((prev) => `${prev}\n\n[Attached: ${file.name}]\n${snippet}`);
                    inputRef.current?.focus();
                  };
                  reader.readAsText(file);
                } else {
                  setPrompt((prev) => `${prev}\n\n[Attached file: ${file.name}]`);
                  inputRef.current?.focus();
                }
              }}
            />

            <div className="flex items-center gap-2 relative">
              <button
                id="app-theme-select"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={themeOpen}
                className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
                onClick={() => setThemeOpen((o) => !o)}
              >
                <Globe className="h-4 w-4" />
                <span suppressHydrationWarning>{themeLabel}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {themeOpen && (
                <div role="listbox" className="absolute top-full mt-1 z-20 min-w-[140px] rounded-md border bg-background shadow">
                  <button className="block w-full text-left px-3 py-1 text-xs hover:bg-muted" onClick={() => { setTheme("system"); setThemeOpen(false); }}>Auto</button>
                  <button className="block w-full text-left px-3 py-1 text-xs hover:bg-muted" onClick={() => { setTheme("light"); setThemeOpen(false); }}>Light</button>
                  <button className="block w-full text-left px-3 py-1 text-xs hover:bg-muted" onClick={() => { setTheme("dark"); setThemeOpen(false); }}>Dark</button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Undo"
              className={`inline-flex h-6 w-6 items-center justify-center rounded-md border ${promptHistory.length === 0 ? 'opacity-60 cursor-default' : ''}`}
              disabled={promptHistory.length === 0}
              onClick={() => {
                setPromptHistory((h) => {
                  if (h.length === 0) return h;
                  const prev = h[h.length - 1];
                  setPrompt(prev);
                  inputRef.current?.focus();
                  return h.slice(0, -1);
                });
              }}
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Improve prompt"
              className={`inline-flex h-6 w-6 items-center justify-center rounded-md border ${!prompt.trim() ? 'opacity-60 cursor-default' : ''}`}
              disabled={!prompt.trim()}
              onClick={() => {
                if (!prompt.trim()) return;
                const improved = enhancePrompt(prompt);
                setPrompt(improved);
                inputRef.current?.focus();
              }}
            >
              <Wand2 className="h-4 w-4" />
            </button>

            <button
              data-cy="ai-prompt-submit"
              type="button"
              aria-label="Submit prompt"
              className={`inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90 ${!prompt.trim() ? 'opacity-60 cursor-default' : ''}`}
              disabled={!prompt.trim()}
              onClick={() => {
                const p = prompt.trim();
                if (!p) {
                  toast.error("Please enter a prompt first");
                  inputRef.current?.focus();
                  return;
                }
                toast.success("Starting with your prompt…");
                try {
                  router.push(`/demo/navigation-menu?prompt=${encodeURIComponent(p)}`);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              <Send className="h-4 w-4" />
              <span>{prompt.trim() ? "Submit" : "Start chat"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setSelected(selected === 'web' ? null : 'web')}
            aria-pressed={selected==='web'}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs whitespace-nowrap ${selected==='web' ? 'bg-secondary/30 border-secondary' : ''}`}
          >
            <Globe2 className="h-4 w-4" /> Web app
          </button>
          <button
            onClick={() => setSelected(selected === 'data' ? null : 'data')}
            aria-pressed={selected==='data'}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs whitespace-nowrap ${selected==='data' ? 'bg-secondary/30 border-secondary' : ''}`}
          >
            <BarChart3 className="h-4 w-4" /> Data app
          </button>
          <button
            onClick={() => setSelected(selected === 'game' ? null : 'game')}
            aria-pressed={selected==='game'}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs whitespace-nowrap ${selected==='game' ? 'bg-secondary/30 border-secondary' : ''}`}
          >
             <Gamepad2 className="h-4 w-4" /> 3D Game
           </button>
          <button
            onClick={() => setSelected(selected === 'general' ? null : 'general')}
            aria-pressed={selected==='general'}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs whitespace-nowrap ${selected==='general' ? 'bg-secondary/30 border-secondary' : ''}`}
          >
            <MousePointerClick className="h-4 w-4" /> UI & UX
           </button>
           <button
             onClick={() => setSelected(selected === 'mobile' ? null : 'mobile')}
             aria-pressed={selected==='mobile'}
             className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs whitespace-nowrap ${selected==='mobile' ? 'bg-secondary/30 border-secondary' : ''}`}
           >
             <Smartphone className="h-4 w-4" /> Mobile App
           </button>
           <button
             onClick={() => setSelected(selected === 'agents' ? null : 'agents')}
             aria-pressed={selected==='agents'}
             className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs whitespace-nowrap ${selected==='agents' ? 'bg-secondary/30 border-secondary' : ''}`}
           >
            <Bot className="h-4 w-4" /> Agents & Automations
            <span className="ml-2 inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[10px]">Beta</span>
          </button>
        </div>

        {selected === 'web' ? (
            <div className="space-y-2 animate-in fade-in duration-300">
              <p className="text-sm text-muted-foreground">
                Beautiful and powerful websites that handle users, databases, and more. Built with Javascript.
              </p>
              <div className="flex items-center gap-2 overflow-x-auto animate-in fade-in slide-in-from-bottom-1 duration-300">
                <span className="text-xs font-medium">Start with an example</span>

                <button onClick={() => { setPrompt("Build a Habit Tracker web app where users can add habits, set frequency, mark completion, and view streaks. Show progress with charts and store data locally."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-200"><ListChecks className="h-3.5 w-3.5" /> Habit Tracker</button>
                <button onClick={() => { setPrompt("Create a Roadmap Planner with phases, milestones, dependencies, and drag-and-drop reordering. Export as PDF and support team collaboration."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-300"><Route className="h-3.5 w-3.5" /> Roadmap Planner</button>
                <button onClick={() => { setPrompt("Build a full-stack e-commerce web app with auth, product catalog, cart, checkout, orders, and an admin dashboard. Use Next.js + Node/Express (or serverless) with PostgreSQL/Prisma and Stripe for payments. Ensure responsive UI and secure routes."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-400"><ShoppingBag className="h-3.5 w-3.5" /> E-commerce (Full-Stack)</button>
                <button onClick={() => { setPrompt("Create a frontend-only e-commerce storefront in Next.js/React with product grid, filters, product detail page, and client-side cart state. Use mock APIs or local JSON for data."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-500"><LayoutDashboard className="h-3.5 w-3.5" /> Frontend Only</button>
              </div>
            </div>
          ) : selected === 'data' ? (
            <div className="space-y-2 animate-in fade-in duration-300">
              <p className="text-sm text-muted-foreground">
                Interactive dashboards and visualizations for exploring data and creating charts. Built with Python (Streamlit).
              </p>
              <div className="flex items-center gap-2 overflow-x-auto animate-in fade-in slide-in-from-bottom-1 duration-300">
                <span className="text-xs font-medium">Start with an example</span>
                <button onClick={() => { setPrompt("Create an interactive Company Insights dashboard that ingests CSVs and visualizes revenue, churn, cohorts. Include filters (date range, segments) and export charts."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-100"><BarChart3 className="h-3.5 w-3.5" /> Company Insights</button>
                <button onClick={() => { setPrompt("Build a Stock Analyzer: input ticker, fetch historical data, calculate moving averages, RSI, trend detection, and render interactive candlestick charts."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-200"><TrendingUp className="h-3.5 w-3.5" /> Stock Analyzer</button>
                <button onClick={() => { setPrompt("Implement an A/B Test Calculator: inputs for conversions and samples, compute uplift, p-value, statistical power, and recommend sample size."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-300"><FlaskConical className="h-3.5 w-3.5" /> A/B Test Calculator</button>
              </div>
            </div>
          ) : selected === 'game' ? (
            <div className="space-y-2 animate-in fade-in duration-300">
              <p className="text-sm text-muted-foreground">
                3D games, simulations, and interactive experiences. Built using Javascript (Three.js).
              </p>
              <div className="flex items-center gap-2 overflow-x-auto animate-in fade-in slide-in-from-bottom-1 duration-300">
                <span className="text-xs font-medium">Start with an example</span>
                <button onClick={() => { setPrompt("Create a Three.js Solar System with orbiting planets, realistic lighting, and camera controls (orbit/pan/zoom). Add labels and a speed slider."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-100"><Orbit className="h-3.5 w-3.5" /> Solar System</button>
                <button onClick={() => { setPrompt("Build a Trivia Battle game with categories, timer, scoring, streaks, and a question bank. Support local multiplayer or pass-and-play."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-200"><Trophy className="h-3.5 w-3.5" /> Trivia Battle</button>
                <button onClick={() => { setPrompt("Make a lightweight Flight Simulator: basic physics, terrain, keyboard controls, HUD for speed/altitude, and a reset button."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-300"><Plane className="h-3.5 w-3.5" /> Flight Simulator</button>
              </div>
            </div>
          ) : selected === 'mobile' ? (
            <div className="space-y-2 animate-in fade-in duration-300">
              <p className="text-sm text-muted-foreground">
                Building real-time chat applications, location-based services, and e-commerce platforms. Built in: React Native (IOS, Android).
              </p>
              <div className="flex items-center gap-2 overflow-x-auto animate-in fade-in slide-in-from-bottom-1 duration-300">
                <span className="text-xs font-medium">Start with an example</span>
                <button onClick={() => { setPrompt("Create a TikTok-style React Native app: vertical video feed with autoplay, swipe interactions, like/comment UI, and a simple in-memory backend stub."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-100"><Video className="h-3.5 w-3.5" /> Clone TikTok</button>
                <button onClick={() => { setPrompt("Build an Uber Clone in React Native (Android/iOS): map view with current location, pick/drop selection, fare estimate, and mock driver matching flow."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-200"><Car className="h-3.5 w-3.5" /> Uber Clone</button>
                <button onClick={() => { setPrompt("Create a React Native (Android/iOS) Shopify-powered mobile storefront: product list, details, cart, and checkout screen. Use mock APIs or Shopify REST/GraphQL."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-300"><ShoppingCart className="h-3.5 w-3.5" /> E-commerce for Shopify</button>
              </div>
            </div>
          ) : selected === 'general' ? (
            <div className="space-y-2 animate-in fade-in duration-300">
              <p className="text-sm text-muted-foreground">
                Creating user-centric interfaces, interactive wireframes, and reusable design systems. Export in Figma or redy to code.
              </p>
              <div className="flex items-center gap-2 overflow-x-auto animate-in fade-in slide-in-from-bottom-1 duration-300">
                <span className="text-xs font-medium">Start with an example</span>
                <button onClick={() => { setPrompt("Design an Admin UI: sidebar navigation, table with filters and pagination, modal forms, and reusable components (cards, badges, alerts)."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-100"><LayoutDashboard className="h-3.5 w-3.5" /> Admin UI</button>
                <button onClick={() => { setPrompt("Create a Mobile App UI kit: navigation bar, cards, buttons, inputs, and patterns for list/detail. Export to Figma or code-ready components."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-200"><Smartphone className="h-3.5 w-3.5" /> Mobile App UI</button>
                <button onClick={() => { setPrompt("Build an E-commerce UI: product grid with filters, product detail page, cart drawer, checkout, and responsive layout."); inputRef.current?.focus(); }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-300 delay-300"><ShoppingBag className="h-3.5 w-3.5" /> E-commerce UI</button>
              </div>
            </div>
          ) : null}
      </div>
    </div>
  );
}