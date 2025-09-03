"use client"

import type React from "react"

import { useState } from "react"
import { Search, Mic, Camera, Grid, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Head from "next/head"

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
    <>
      <Head>
        <title>Nueva pestaña</title>
      </Head>
      <div className="min-h-screen bg-[#202124] flex flex-col">
        {/* Top Navigation */}
        <nav className="w-full flex justify-end p-4">
          <div className="flex items-center gap-4">
            <Link href="#" className="text-[#e8eaed] text-sm hover:underline">
              Gmail
            </Link>
            <Link href="#" className="text-[#e8eaed] text-sm hover:underline">
              Imágenes
            </Link>
            <button className="text-[#e8eaed] p-2 hover:bg-[#303134] rounded-full">
              <Grid className="w-6 h-6" />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#8ab4f8] flex items-center justify-center overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12632557-PlP27PIQcJoCGJ0EWGsxOAnw3DVAaB.png"
                alt="Profile"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-52 text-[rgba(255,255,255,1)] bg-slate-500">
          {" "}
          {/* Updated className */}
          {/* Google Logo */}
          <div className="mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google-white-logo-xV9tIdWqzLF3ztdK3cM02AnedIPyfQ.png"
              alt="Google"
              width={272}
              height={92}
              priority
              className="w-[272px]"
            />
          </div>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-[584px]">
            <div className="flex items-center w-full bg-slate-50 rounded-[24px] px-6 py-3 hover:bg-slate-50 border border-transparent hover:border-[#5f6368] hover:shadow-lg shadow-lg text-[rgba(248,250,252,1)]">
              <Search className="h-5 text-[#9aa0a6] mr-3 w-4 text-[rgba(95,99,104,1)]" />
              <input
                type="text"
                placeholder="Buscar en Google o escribir una URL"
                className="flex-1 outline-none text-base bg-transparent placeholder:text-[#9aa0a6] text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Mic className="w-5 h-5 text-[#8ab4f8] mx-2 text-[rgba(95,99,104,1)]" />
              <Camera className="w-5 h-5 text-[#8ab4f8] text-[rgba(95,99,104,1)]99,104,1)] text-slate-700" />
            </div>
          </form>
          {/* Shortcuts */}
          <div className="flex justify-between w-[300px] mt-8">
            <button className="flex items-center h-auto flex-col px-2.5">
              <div className="w-12 h-12 bg-[#303134] rounded-full flex items-center justify-center mb-2 bg-[rgba(63,63,63,1)]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moodle-Q6cQeovD5w9qfXePBMSL6sCpPHGYcj.png"
                  alt="Moodle"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </div>
              <span className="text-[#e8eaed] text-sm">Moodle</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#303134] rounded-full flex items-center justify-center mb-2 bg-[rgba(63,63,63,1)]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/descarga-zLcHPnMEOWWHJCRwwHCSG54labCEsA.png"
                  alt="Google Drive"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <span className="text-[#e8eaed] text-sm">Drive</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#8ab4f8] rounded-full flex items-center justify-center mb-2 bg-[rgba(21,77,101,1)]">
                <span className="text-[#202124] text-xl font-medium text-white">+</span>
              </div>
              <span className="text-[#e8eaed] text-sm">Acceso directo</span>
            </button>
          </div>
        </main>

        {/* Footer */}
        <div className="fixed bottom-4 right-4">
          <button className="w-12 h-12 bg-[#303134] hover:bg-[#3c4043] rounded-full flex items-center justify-center transition-colors text-[rgba(40,50,56,1)] opacity-100 bg-[rgba(40,50,56,1)]">
            <Pencil className="w-5 h-5 text-[#e8eaed]" />
          </button>
        </div>
      </div>
    </>
  )
}
