"use client";
import { HeroPrompt } from "@/features/prompt";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarRail,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Home as HomeIcon,
  Info,
  LayoutDashboard,
  Zap,
  AppWindow,
  Users,
  ShieldAlert,
  Settings,
  HelpCircle,
  Rocket,
  Database,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // [Added by Cascade]
import { HomeTopControls } from "@/components/home-top-controls";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"; // [Added by Cascade]
import { Button } from "@/components/ui/button"; // [Added by Cascade]

export default function Home() {
  // [Added by Cascade] Sidebar nav items (Primary)
  const navItems = [
    { title: "Home", url: "/", icon: HomeIcon, isActive: true },
    { title: "Apps", url: "/apps", icon: AppWindow },
    { title: "Published Apps", url: "/apps/published", icon: Rocket },
    { title: "Databases", url: "/databases", icon: Database },
  ];

  // [Added by Cascade] Sidebar nav items (Pages)
  const pageItems = [
    { title: "Auth", url: "/auth", icon: ShieldAlert },
    { title: "Errors", url: "/errors", icon: ShieldAlert },
  ];

  // [Added by Cascade] Sidebar nav items (Other)
  const otherItems = [
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Help Center", url: "/help", icon: HelpCircle },
  ];

  return (
    // [Added by Cascade] Sidebar layout wrapper
    <SidebarProvider>
      {/* [Added by Cascade] App sidebar */}
      <Sidebar collapsible="icon" variant="inset">
        {/* [Added by Cascade] Sidebar header with brand + collapse trigger */}
        <SidebarHeader className="border-b">
          <div className="flex items-center justify-between px-2 h-12">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="flex items-center gap-2"
            >
              {/* [Added by Cascade] Current logo and icon */}
              {/* <Image src="/icon%20onra.svg" alt="Onra icon" width={18} height={18} /> */}
              <Image
                src="/logo-onra.svg"
                alt="Onra logo"
                width={72}
                height={18}
              />
            </Link>
            {/* [Added by Cascade] Sidebar collapsible button */}
            <SidebarTrigger />
          </div>
        </SidebarHeader>

        {/* [Added by Cascade] Sidebar content */}
        <SidebarContent>
          <SidebarGroup>
            <NavMain items={navItems} />
          </SidebarGroup>
          
          {/* [Added by Cascade] Explore More dropdown */}
          <SidebarGroup>
            <Collapsible>
              <SidebarMenu>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Info className="text-foreground" />
                      <span>Explore More</span>
                      <ChevronDown className="ml-auto text-foreground" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="/learn">
                            <span>Learn</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="/docs">
                            <span>Documentation</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </SidebarMenu>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>

        {/* [Added by Cascade] Footer: user email and logout */}
        <SidebarFooter>
          <div className="flex items-center justify-between rounded-md border px-2 py-2">
            <span className="text-xs">admin@orna.com</span>
            <Button size="sm" variant="outline" className="h-7 px-2">Logout</Button>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Existing page content placed inside SidebarInset */}
      <SidebarInset>
        {/* [Added by Cascade] Changed wrapper to div to avoid nested <main> */}
        <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-start px-4 py-2 md:py-2">
          {/* [Added by Cascade] Top bar inside page so it starts after sidebar gap and grows with collapse */}
          <HomeTopControls />

          {/* Page background flicker */}
          <FlickeringGrid
            className="absolute inset-0 z-0 pointer-events-none"
            maxOpacity={0.2}
          />

          {/* Hero */}
          <section className="relative h-[500px] w-full rounded-lg bg-white overflow-hidden border">
            {/* Overlay content */}
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="w-full px-6">
                <HeroPrompt />
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Named export for reuse if needed
export const HomePage = Home;
