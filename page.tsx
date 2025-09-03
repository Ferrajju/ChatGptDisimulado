"use client"

import { useState } from "react"
import { Search, Grid } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GoogleHomepage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#202124] flex flex-col">
      {/* Top Navigation */}
      <nav className="w-full flex justify-end p-4">
        <div className="flex items-center gap-4">
          <a href="#" className="text-white text-sm hover:underline">
            Gmail
          </a>
          <a href="#" className="text-white text-sm hover:underline">
            Imágenes
          </a>
          <button className="text-white/87 p-2 hover:bg-white/10 rounded-full">
            <Grid className="w-6 h-6" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#5f6368] flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-20">
        {/* Google Text Logo */}
        <div className="mb-8">
          <h1 className="text-6xl font-normal tracking-tighter">
            <span className="text-[#4285f4]">G</span>
            <span className="text-[#ea4335]">o</span>
            <span className="text-[#fbbc05]">o</span>
            <span className="text-[#4285f4]">g</span>
            <span className="text-[#34a853]">l</span>
            <span className="text-[#ea4335]">e</span>
          </h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-[584px]">
          <div className="flex items-center w-full bg-[#303134] rounded-[24px] px-6 py-3 hover:bg-[#303134]/90 border border-transparent hover:border-[#5f6368]">
            <Search className="w-5 h-5 text-white/60 mr-3" />
            <input
              type="text"
              placeholder="Buscar en Google o escribir una URL"
              className="flex-1 outline-none text-base bg-transparent text-white placeholder:text-white/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </main>

      {/* Footer */}
      <div className="fixed bottom-4 right-4">
        <button className="text-[#8ab4f8] text-sm hover:underline flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
          Personalizar Chrome
        </button>
      </div>
    </div>
  )
}
