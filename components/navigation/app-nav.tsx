'use client';
import { usePathname } from 'next/navigation';
import { FileText, FileSpreadsheet, Settings, TableProperties } from 'lucide-react';
import {
  NavMain, SidebarBrand, SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent,
} from '@aeroflow/af-components';
import type { NavMainItem } from '@aeroflow/af-components';
export { SidebarProvider } from '@aeroflow/af-components';

const navItems: NavMainItem[] = [
  { title: 'Billing Report', url: '/', icon: TableProperties },
  { title: 'Claims-NA', url: '/1', icon: FileText },
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

                <SidebarTrigger
                className="
                    shrink-0
                    group-data-[collapsible=icon]:absolute
                    group-data-[collapsible=icon]:left-[calc(100%+14px)]
                    group-data-[collapsible=icon]:ml-5
                    group-data-[collapsible=icon]:-translate-y-1/2
                    group-data-[collapsible=icon]:z-20
                    group-data-[collapsible=icon]:bg-background
                    group-data-[collapsible=icon]:shadow-sm
                "
                />
            </div>
            </SidebarHeader>
        <SidebarContent>
          <NavMain items={items} variant="grouped" label="Applications" />
        </SidebarContent>
      </Sidebar>
  );
}
