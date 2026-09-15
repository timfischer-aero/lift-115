'use client';
import { usePathname } from 'next/navigation';
import { FileText, FileSpreadsheet, Settings, TableProperties } from 'lucide-react';
import { SidebarBrand, SidebarGroup, SidebarGroupLabel, Sidebar, SidebarHeader, SidebarMenu, SidebarContent, SidebarMenuItem, SidebarMenuButton} from '@aeroflow/af-components';
import Link from 'next/link';

import type { NavMainItem } from '@aeroflow/af-components';
export { SidebarProvider } from '@aeroflow/af-components';

const navItems: NavMainItem[] = [
  { title: 'Billing Report (Lift 115)', url: '/', icon: TableProperties },
  { title: 'Table Shell (Lift-2)', url: '/lift-2', icon: FileText },
  { title: 'Settings-NA', url: '#', icon: Settings },
];

export function AppNav() {
  const pathname = usePathname();
  const items = navItems.map((item) => ({ ...item, isActive: pathname === item.url }));

  return (
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader>
            <div className="relative flex items-center gap-2">
                <SidebarBrand
                name="AR Billing"
                description="Billing Reports"
                logo={FileSpreadsheet}
                className="min-w-0 flex-1"
                />
            </div>
            </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Applications</SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}
