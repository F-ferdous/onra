"use client";

// [Added by Cascade] Full-width top bar: left menu (Home, About) + right search
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // [Added by Cascade]

export function HomeTopControls() {
  return (
    // [Added by Cascade] Container bar
    <div className="w-full bg-white relative z-10 mb-3 shadow-sm"> {/* [Added by Cascade] solid white bar */}
      <div className="flex items-center justify-between px-4 py-3"> {/* [Added by Cascade] +4px padding */}
        {/* [Added by Cascade] Left menu */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" aria-current="page" className="font-medium rounded-md bg-muted px-2 py-1">
            Home
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>{" "}
          {/* [Added by Cascade] */}
        </nav>

        {/* [Added by Cascade] Right search */}
        <div className="flex items-center gap-2">
          <Input placeholder="Search" className="h-8 w-40 md:w-64" />
          {/* [Added by Cascade] Download button to the right of search */}
          <Button size="sm" className="h-8 px-3">
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
