'use client';
import { usePathname } from 'next/navigation';
import { FileText, FileSpreadsheet, Settings, TableProperties } from 'lucide-react';
import {
  NavMain, SidebarBrand, SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent,
} from '@aeroflow/af-components';
import type { NavMainItem } from '@aeroflow/af-components';
export { SidebarProvider } from '@aeroflow/af-components';

const navItems: NavMainItem[] = [
  { title: 'Billing Report (Lift 115)', url: '/', icon: TableProperties },
  { title: 'Table Shell (Lift-2)', url: '/lift-2', icon: FileText },
  { title: 'Settings-NA', url: '/2', icon: Settings },
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
          <NavMain items={items} variant="grouped" label="Applications" />
        </SidebarContent>
      </Sidebar>
  );
}
