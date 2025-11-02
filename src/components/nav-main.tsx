"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  disableLinks = false,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
  disableLinks?: boolean;
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          {disableLinks ? (
            <SidebarMenuButton isActive={item.isActive}>
              <item.icon className="text-gray-700 bg-gray-700" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton asChild isActive={item.isActive}>
              <a href={item.url}>
                <item.icon className="text-gray-700" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
