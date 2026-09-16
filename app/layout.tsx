import type { Metadata } from "next";
import "./globals.css";

import '@aeroflow/af-components/styles.css';
import "@aeroflow/design-tokens/index.css";

import { SidebarProvider, AppNav } from "@/components/navigation/app-nav";
import { ThemeProvider } from '@aeroflow/design-tokens';

export const metadata: Metadata = {
  title: "LIFT-115",
  description: "LIFT-115 Start",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider theme="utility">
          <SidebarProvider defaultOpen={true}>
            <AppNav />
            <main className="min-w-0 flex-1">{children}</main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
