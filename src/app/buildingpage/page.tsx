"use client";

import Image from "next/image";
import { useState } from "react";

type Tab = "preview" | "console";

function TopLeftCluster({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center gap-2 text-gray-700">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-sm hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Image src="/icon onra.svg" alt="App icon" width={16} height={16} />
        <svg
          viewBox="0 0 20 20"
          className="h-3 w-3 text-gray-700"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 7l5 6 5-6H5z" />
        </svg>
      </button>

      <div className="mx-1 h-4 w-px bg-gray-200" />

      <div className="flex items-center gap-2">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-gray-200 bg-gray-50">
          <span className="h-2 w-2 rounded-[2px] bg-gray-400" />
        </span>
        <span className="text-xs font-medium text-gray-800">PetCareHome</span>
      </div>

      <div className="mx-1 h-4 w-px bg-gray-200" />

      <div className="flex items-center gap-2">
        <div className="h-2 w-16 rounded-full bg-gray-200">
          <div className="h-2 w-[70%] rounded-full bg-pink-600" />
        </div>
        <span className="text-[11px] text-pink-700">70%</span>
      </div>

      <button className="rounded-md bg-pink-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-pink-700">
        Upgrade
      </button>

      <div className="mx-1 h-4 w-px bg-gray-200" />

      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("preview")}
          className={`${
            tab === "preview"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:text-gray-800"
          } inline-flex items-center gap-2 rounded-md px-3 py-1.5`}
        >
          <span className="font-medium">Preview</span>
        </button>
        <button
          onClick={() => setTab("console")}
          className={`${
            tab === "console"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:text-gray-800"
          } inline-flex items-center gap-2 rounded-md px-3 py-1.5`}
        >
          <span className="font-medium">Console</span>
        </button>
        <div className="group relative">
          <button
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            aria-label="Add"
          >
            <span className="-mt-px text-lg leading-none">+</span>
          </button>
          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600 shadow-sm group-hover:block">
            Tools & files
          </div>
        </div>
      </div>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-9 z-20 w-48 rounded-md border border-gray-200 bg-white py-2 text-sm shadow-md"
        >
          <div className="px-3 py-1.5 text-gray-500">Menu (placeholder)</div>
        </div>
      )}
    </div>
  );
}

export default function BuildingPage() {
  const [tab, setTab] = useState<Tab>("preview");
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCodebase, setShowCodebase] = useState(false);
  const drawerWidthPx = 306; // 15% narrower than previous 360px
  return (
    <main className="min-h-dvh bg-white">
      <div className="w-full border-b bg-white">
        <div className="mx-auto max-w-full px-2">
          <div className="flex items-center justify-between gap-3 py-2 text-sm">
            <TopLeftCluster tab={tab} setTab={setTab} />
            <TopRightCluster
              onSearch={() => setShowSearch(true)}
              onProfile={() => setShowProfile(true)}
              onPublish={() => {}}
              onToggleCodebase={() => setShowCodebase((v) => !v)}
            />
          </div>
        </div>
      </div>

      <div
        className={`mx-auto max-w-full px-2 transition-[padding] duration-200 ${
          showCodebase ? `pr-[${drawerWidthPx}px]` : ""
        }`}
      >
        <div className="grid grid-cols-1 gap-2 py-2 lg:grid-cols-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="rounded-2xl border bg-white shadow-sm">
              <div className="flex min-h-[calc(100dvh-96px)] flex-col overflow-hidden">
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 8v5l3 2" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                    <div className="truncate text-sm text-gray-900">
                      Add foundational components and stylin...
                    </div>
                    <span className="ml-2 shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-medium text-orange-700">
                      Agent 3
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-50"
                      aria-label="expand"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M9 9H5V5h4zM19 19h-4v-4h4zM19 5v4h-4V5zM9 15v4H5v-4z" />
                      </svg>
                    </button>
                    <button
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-50"
                      aria-label="new"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-200" />

                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                  <div className="text-xs text-gray-500">Today</div>
                  <div className="max-w-[85%] rounded-lg border bg-white p-3 text-sm text-gray-800 shadow-sm">
                    Hi! Describe what you want to build and I’ll create it.
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-lg bg-pink-50 p-3 text-sm text-gray-800 shadow-sm">
                      Create a pet healthcare home service app with booking and
                      pricing.
                    </div>
                  </div>
                </div>

                <div className="border-t p-3">
                  <div className="rounded-2xl border border-gray-300/80 bg-white p-3 shadow-sm">
                    <textarea
                      rows={2}
                      className="w-full resize-none rounded-xl bg-transparent px-2 py-1 text-[15px] leading-6 text-gray-800 placeholder:text-gray-400 focus:outline-none"
                      placeholder="Make, test, iterate..."
                    />

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="group relative">
                          <button className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-200">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
                              <path d="M3 7l9 4 9-4" />
                            </svg>
                            Build
                            <svg
                              viewBox="0 0 20 20"
                              className="-mr-0.5 h-3.5 w-3.5"
                              fill="currentColor"
                            >
                              <path d="M5 7l5 6 5-6H5z" />
                            </svg>
                          </button>
                          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                            Build options
                          </div>
                        </div>
                        <div className="group relative">
                          <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50"
                            aria-label="Select area"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeDasharray="2 2"
                              strokeWidth="1.5"
                            >
                              <rect x="5" y="5" width="14" height="14" rx="1" />
                            </svg>
                          </button>
                          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                            Select region
                          </div>
                        </div>
                        <div className="group relative">
                          <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 hover:bg-gray-50"
                            aria-label="Attach"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M21 15V7a5 5 0 0 0-10 0v9a3 3 0 1 0 6 0V8" />
                            </svg>
                          </button>
                          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                            Attach
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="group relative">
                          <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 hover:bg-gray-50"
                            aria-label="Settings"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M10.5 6h8" />
                              <path d="M5.5 6h1" />
                              <path d="M7 6a2 2 0 1 0 4 0 2 2 0 1 0-4 0Z" />
                              <path d="M13.5 12h5" />
                              <path d="M5.5 12h6" />
                              <path d="M17 12a2 2 0 1 0-4 0 2 2 0 1 0 4 0Z" />
                              <path d="M12.5 18h6" />
                              <path d="M5.5 18h4" />
                              <path d="M15 18a2 2 0 1 0-4 0 2 2 0 1 0 4 0Z" />
                            </svg>
                          </button>
                          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                            Settings
                          </div>
                        </div>
                        <div className="group relative">
                          <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-white hover:bg-gray-800"
                            aria-label="Send"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M5 12h14" />
                              <path d="M13 5l7 7-7 7" />
                            </svg>
                          </button>
                          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                            Send
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section
            className="lg:col-span-8 xl:col-span-9 transition-[padding] duration-200"
            style={{ paddingRight: showCodebase ? drawerWidthPx : undefined }}
          >
            {tab === "preview" ? (
              <div className="relative min-h-[calc(100dvh-96px)] rounded-2xl border bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-2 rounded-t-2xl border-b bg-gray-50/80 px-2 py-1.5">
                  <div className="flex flex-1 min-w-0 items-center gap-1.5">
                    <div className="group relative">
                      <button className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-white" aria-label="Back">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 6l-6 6 6 6"/></svg>
                      </button>
                      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white group-hover:block">Back</div>
                    </div>
                    <div className="group relative">
                      <button className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-white" aria-label="Forward">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6"/></svg>
                      </button>
                      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white group-hover:block">Forward</div>
                    </div>
                    <div className="group relative">
                      <button className="ml-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-white" aria-label="Refresh">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 11a8 8 0 1 1-2.34-5.66"/><path d="M20 4v7h-7"/></svg>
                      </button>
                      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white group-hover:block">Refresh</div>
                    </div>
                    <div className="ml-1 flex-1 min-w-0">
                      <div className="inline-flex w-full items-center gap-2 rounded-md bg-white px-2 py-1 text-xs text-gray-600 shadow-sm">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20Z"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20"/></svg>
                        <input className="w-full min-w-0 bg-transparent text-gray-700 outline-none" defaultValue=".replit.dev/" />
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 pr-1">
                    <div className="group relative">
                      <button className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-white" aria-label="Settings">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.67 0 1.21.33 1.51 1.02.3.7.3 1.28 0 1.98Z"/></svg>
                      </button>
                      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white group-hover:block">Settings</div>
                    </div>
                    <div className="group relative">
                      <button className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-white" aria-label="Responsive">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="8" height="16" rx="1"/><rect x="13" y="7" width="8" height="11" rx="1"/></svg>
                      </button>
                      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white group-hover:block">Responsive</div>
                    </div>
                    <div className="group relative">
                      <button className="inline-flex h-6 items-center justify-center rounded-md px-2 text-xs text-gray-700 hover:bg-white">Theme</button>
                      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white group-hover:block">Theme</div>
                    </div>
                    <div className="group relative">
                      <button className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-white" aria-label="Open in new window">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M5 12v7h7"/></svg>
                      </button>
                      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white group-hover:block">Open in new window</div>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[calc(100dvh-96px-40px)] items-center justify-center pl-8 pr-0 py-8">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
                      <div className="h-7 w-7 rounded-md bg-violet-400 opacity-80"></div>
                    </div>
                    <div className="text-[17px] font-semibold text-gray-800">
                      Preview will be available soon
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Seamless integrations with 3rd party tools
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border bg-white p-4 shadow-sm min-h-[calc(100dvh-96px)] overflow-hidden">
                <div className="mb-2 text-sm font-medium text-gray-700">
                  Console
                </div>
                <div className="h-[calc(100dvh-96px-44px)] w-full overflow-auto rounded-md border bg-black p-3 text-xs text-gray-200">
                  <div className="text-green-400">$ agent build --dry-run</div>
                  <div>[10:21:03] Starting build pipeline...</div>
                  <div>[10:21:04] Fetching tools...</div>
                  <div>[10:21:06] Waiting for integrations...</div>
                  <div className="text-gray-500">
                    [10:21:06] Preview will be available soon
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 text-sm font-medium text-gray-800">Search</div>
            <input
              autoFocus
              className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              placeholder="Type to search..."
            />
          </div>
        </div>
      )}

      {showProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowProfile(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 text-sm font-medium text-gray-800">
              Profile
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Name: User</div>
              <div>Email: user@example.com</div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed right-0 top-[48px] z-40 h-[calc(100dvh-48px)] transform border-l bg-white p-4 shadow-xl transition-transform ${
          showCodebase ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: drawerWidthPx }}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-800">AI Codebase</div>
          <button
            className="rounded-md border px-2 py-1 text-xs"
            onClick={() => setShowCodebase(false)}
          >
            Close
          </button>
        </div>
        <div className="h-full overflow-auto text-xs text-gray-700">
          <pre className="whitespace-pre-wrap">
            // Generated files will appear here. src/ app/ buildingpage/
            page.tsx components/ ...
          </pre>
        </div>
      </div>
    </main>
  );
}

function TopRightCluster({
  onSearch,
  onProfile,
  onPublish,
  onToggleCodebase,
}: {
  onSearch: () => void;
  onProfile: () => void;
  onPublish: () => void;
  onToggleCodebase: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onSearch}
        aria-label="Search"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-800 hover:bg-gray-50"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
      <button
        onClick={onProfile}
        aria-label="Profile"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-800 hover:bg-gray-50"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
        <span className="ml-0.5 text-[10px]">+</span>
      </button>
      <button
        onClick={onPublish}
        className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-pink-700"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20" />
        </svg>
        Publish
      </button>
      <button
        onClick={onToggleCodebase}
        aria-label="Toggle codebase"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-800 hover:bg-gray-50"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="8" height="16" rx="1" />
          <rect x="13" y="4" width="8" height="16" rx="1" />
        </svg>
      </button>
    </div>
  );
}
