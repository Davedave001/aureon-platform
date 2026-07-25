import type { Metadata } from "next";
import { euclidCircular } from "@/lib/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthSessionProvider } from "@/components/session-provider";
import { auth } from "@/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aureon Capital AI",
  description: "AI-powered financial markets platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${euclidCircular.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider session={session}>
            <TooltipProvider delay={150}>{children}</TooltipProvider>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
