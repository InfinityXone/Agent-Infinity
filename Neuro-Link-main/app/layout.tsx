import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Infinity X One - AI Operating System",
  description: "Futuristic AI Operating System Interface",
  manifest: "/manifest.json",
  themeColor: "#00F0FF",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Infinity X One",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent MetaMask and other Web3 auto-connections
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  // Disable automatic Web3 connections
                  if (window.ethereum) {
                    window.ethereum.autoRefreshOnNetworkChange = false;
                  }
                });
                
                // Global error handler for unhandled rejections
                window.addEventListener('unhandledrejection', function(event) {
                  if (event.reason && event.reason.message && event.reason.message.includes('MetaMask')) {
                    console.warn('MetaMask connection prevented:', event.reason);
                    event.preventDefault();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
