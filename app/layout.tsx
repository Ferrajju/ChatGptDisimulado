import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nueva pestaña",
  icons: {
    icon: [
      {
        url: "https://www.google.com/chrome/static/images/chrome-favicon-dark.ico",
        sizes: "16x16",
        type: "image/x-icon",
      },
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
