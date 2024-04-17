import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Template from "@/components/Template";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(
        `min-h-screen font-sans antialiased grainy`,
        inter.className
      )}>
        <Template>
          {children}
        </Template>
      </body>
    </html>
  );
}
