"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Copyright, HelpCircle, History, Plus, Search, Settings } from "lucide-react";
import { useState } from "react";

const recentSearches = [
    "Modern Living Room Sketch",
    "Minimalist Bedroom Layout",
    "Scandinavian Kitchen Design",
    "Cozy Room with Fireplace",
    "Boho Interior Sketch Ideas",
    "Studio Apartment Floor Plan",
];

export function AppSidebar() {
    const [activeSection, setActiveSection] = useState("search")

    return (
        <Sidebar className="border-r border-gray-200">
            <SidebarHeader className="p-6 border-b border-gray-100">
                <div>
                    <div>
                        <img src="/logo.svg" alt="logo-svg" />
                    </div>
                </div>
                
            </SidebarHeader>

            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Quick Actions
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="w-full justify-start h-11 rounded-xl hover:bg-gray-100 transition-colors"
                                    isActive={activeSection === "search"}
                                    onClick={() => setActiveSection("search")}
                                >
                                    <Search className="w-4 h-4" />
                                    <span className="font-medium">New Search</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="w-full justify-start h-11 rounded-xl hover:bg-gray-100 transition-colors">
                                    <Plus className="w-4 h-4" />
                                    <span className="font-medium">Upload PDF</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Recent Searches
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {recentSearches.slice(0, 5).map((search, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton className="w-full justify-start h-10 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                                        <History className="w-3.5 h-3.5 text-gray-400" />
                                        <span className="truncate text-gray-700">{search}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-gray-100">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="w-full justify-start h-11 rounded-xl hover:bg-gray-100 transition-colors">
                            <Settings className="w-4 h-4" />
                            <span className="font-medium">Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="w-full justify-start h-11 rounded-xl hover:bg-gray-100 transition-colors">
                            <HelpCircle className="w-4 h-4" />
                            <span className="font-medium">Help & Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
