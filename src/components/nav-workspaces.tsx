import { ChevronRight, MoreHorizontal, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavWorkspaces({
  workspaces,
  disableLinks = false,
}: {
  workspaces: {
    name: string
    emoji: React.ReactNode
    pages: {
      name: string
      emoji: React.ReactNode
    }[]
  }[]
  disableLinks?: boolean
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {workspaces.map((workspace) => (
            <Collapsible key={workspace.name}>
              <SidebarMenuItem>
                {disableLinks ? (
                  <SidebarMenuButton>
                    <span>{workspace.emoji}</span>
                    <span>{workspace.name}</span>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <span>{workspace.emoji}</span>
                      <span>{workspace.name}</span>
                    </a>
                  </SidebarMenuButton>
                )}
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <SidebarMenuAction showOnHover>
                  <Plus />
                </SidebarMenuAction>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {workspace.pages.map((page) => (
                      <SidebarMenuSubItem key={page.name}>
                        {disableLinks ? (
                          // Render non-anchor when links are disabled
                          <SidebarMenuSubButton asChild>
                            <span>
                              <span>{page.emoji}</span>
                              <span>{page.name}</span>
                            </span>
                          </SidebarMenuSubButton>
                        ) : (
                          <SidebarMenuSubButton asChild>
                            <a href="#">
                              <span>{page.emoji}</span>
                              <span>{page.name}</span>
                            </a>
                          </SidebarMenuSubButton>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
