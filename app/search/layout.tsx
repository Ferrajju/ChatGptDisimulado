import type { Metadata } from "next"

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
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
