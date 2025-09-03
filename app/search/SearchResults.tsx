"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Mic, Camera, Grid, X, ChevronDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ChatGPTResponse {
  response?: string
  error?: string
}

async function getChatGPTResponse(query: string): Promise<string> {
  try {
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ChatGPTResponse = await response.json()
    if (!data.response) {
      throw new Error("No se recibió respuesta")
    }

    return data.response
  } catch (error) {
    console.error("Error in getChatGPTResponse:", error)
    throw error
  }
}

// Demo responses for when query is "demo"
const demoResponses = [
  "La inteligencia artificial (IA) es una rama de la informática que se centra en crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana.",
  "Los algoritmos de machine learning permiten a las máquinas aprender y mejorar automáticamente a través de la experiencia sin ser programadas explícitamente para cada tarea específica.",
  "El procesamiento de lenguaje natural (NLP) es una subdisciplina de la IA que se enfoca en la interacción entre computadoras y lenguajes humanos, permitiendo que las máquinas comprendan, interpreten y generen texto humano.",
  "Las redes neuronales artificiales están inspiradas en el funcionamiento del cerebro humano y consisten en capas interconectadas de nodos que procesan información de manera similar a las neuronas.",
  "El deep learning utiliza redes neuronales profundas con múltiples capas ocultas para modelar y entender patrones complejos en grandes conjuntos de datos.",
  "Los sistemas de visión por computadora permiten a las máquinas interpretar y analizar contenido visual del mundo real, incluyendo imágenes y videos.",
  "La automatización inteligente combina IA con tecnologías de automatización para crear sistemas que pueden tomar decisiones y ejecutar tareas complejas de forma autónoma.",
  "Los chatbots y asistentes virtuales utilizan técnicas de IA para mantener conversaciones naturales con usuarios y proporcionar respuestas útiles y contextualmente relevantes.",
]

// Expanded Lorem Ipsum variations for more natural-looking results
const loremIpsumVariations = [
  // Very short (30-50 chars)
  "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  "Sed do eiusmod tempor incididunt ut labore.",
  // Short (80-120 chars)
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  // Medium (150-200 chars)
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa.",
  // Long (250-300 chars)
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  // Very long (350+ chars)
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
]

function getRandomLoremIpsum(): string {
  return loremIpsumVariations[Math.floor(Math.random() * loremIpsumVariations.length)]
}

function generateFakeUrl(query: string, index: number): string {
  const domains = [
    "wikipedia.org",
    "enciclopedia.net",
    "definiciones.com",
    "conceptos.edu",
    "academia.org",
    "ciencia.info",
    "conocimiento.net",
    "estudios.com",
    "investigacion.edu",
    "recursos.org",
    "biblioteca.net",
    "documentacion.com",
    "referencias.info",
    "archivos.edu",
    "repositorio.org",
    "datos.net",
    "informacion.com",
    "contenidos.edu",
    "material.org",
    "documentos.net",
  ]
  const paths = [
    "wiki",
    "articulo",
    "definicion",
    "concepto",
    "tema",
    "entrada",
    "documento",
    "recurso",
    "contenido",
    "pagina",
    "archivo",
    "referencia",
    "guia",
    "manual",
    "texto",
    "informe",
    "estudio",
    "analisis",
    "resumen",
    "explicacion",
  ]
  const subpaths = [
    "completo",
    "detallado",
    "general",
    "basico",
    "avanzado",
    "especializado",
    "principal",
    "secundario",
    "adicional",
    "complementario",
    "especifico",
    "relacionado",
  ]

  const domain = domains[index % domains.length]
  const path = paths[Math.floor(Math.random() * paths.length)]
  const subpath = subpaths[Math.floor(Math.random() * subpaths.length)]
  const sanitizedQuery = query.toLowerCase().replace(/\s+/g, "-")

  return `https://www.${domain}/${path}/${sanitizedQuery}-${subpath}`
}

function generateSiteName(index: number): string {
  const siteNames = [
    "Wikipedia",
    "Enciclopedia",
    "Definiciones",
    "Conceptos",
    "Academia",
    "Ciencia Info",
    "Conocimiento",
    "Estudios",
    "Investigación",
    "Recursos",
    "Biblioteca",
    "Documentación",
    "Referencias",
    "Archivos",
    "Repositorio",
    "Datos",
    "Información",
    "Contenidos",
    "Material",
    "Documentos",
  ]
  return siteNames[index % siteNames.length]
}

function generateUniqueTitle(query: string, index: number, isRealResult: boolean): string {
  const prefixes = [
    "Guía completa:",
    "Descubre",
    "Todo sobre",
    "Análisis de",
    "Explicación detallada:",
    "Entendiendo",
    "Conceptos básicos de",
    "Manual práctico:",
    "Información esencial sobre",
    "Lo que debes saber de",
    "Aspectos fundamentales de",
    "Explorando",
    "Guía definitiva de",
    "Características principales de",
    "Fundamentos de",
    "Introducción a",
    "Comprendiendo",
    "Detalles sobre",
    "Profundizando en",
    "Resumen de",
  ]

  const suffixes = [
    "Una perspectiva completa",
    "En profundidad",
    "Explicado paso a paso",
    "Conceptos clave",
    "Lo esencial",
    "Guía básica",
    "Análisis detallado",
    "Información actualizada",
    "Aspectos importantes",
    "Visión general",
    "Datos fundamentales",
    "Conocimientos básicos",
    "Detalles importantes",
    "Aspectos destacados",
    "Puntos clave",
    "Información relevante",
  ]

  const prefix = prefixes[index % prefixes.length]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]

  // For demo mode, use "inteligencia artificial" as the topic
  const displayQuery = query.toLowerCase() === "demo" ? "inteligencia artificial" : query

  return isRealResult ? `${prefix} ${displayQuery} - ${suffix}` : `${prefix} ${displayQuery}`
}

function generateRelatedQuestions(query: string): string[] {
  // For demo mode, use predefined questions about AI
  if (query.toLowerCase() === "demo") {
    return [
      "¿Qué es la inteligencia artificial y para qué sirve?",
      "¿Qué es machine learning?",
      "¿Para qué se utiliza el deep learning?",
      "¿Quién inventó la inteligencia artificial?",
    ]
  }

  const questionTemplates = [
    `¿Qué es ${query} y para qué sirve?`,
    `¿Qué es ${query}?`,
    `¿Para qué se utiliza ${query}?`,
    `¿Quién es el dueño de ${query}?`,
    `¿Cómo funciona ${query}?`,
    `¿Cuáles son las características de ${query}?`,
    `¿Dónde se puede encontrar ${query}?`,
    `¿Cuándo se creó ${query}?`,
  ]

  return questionTemplates.slice(0, 4).map((template) => template)
}

function splitResponseIntoFragments(response: string): string[] {
  return response
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.length > 15)
    .map((s) => s.trim())
}

const SEARCH_CATEGORIES = [
  { name: "Todo", href: "#", active: true },
  { name: "Noticias", href: "#", active: false },
  { name: "Imágenes", href: "#", active: false },
  { name: "Videos", href: "#", active: false },
  { name: "Productos", href: "#", active: false },
  { name: "Web", href: "#", active: false },
  { name: "Libros", href: "#", active: false },
]

function MoreQuestionsSection({ query }: { query: string }) {
  const questions = generateRelatedQuestions(query)

  return (
    <div className="mb-8 max-w-[652px] bg-[#303134] rounded-lg p-4 bg-transparent">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#e8eaed]">Más preguntas</h3>
        <button className="p-1 hover:bg-[#3c4043] rounded-full">
          <MoreHorizontal className="w-5 h-5 text-[#9aa0a6] justify-center" />
        </button>
      </div>

      <div className="space-y-0">
        {questions.map((question, index) => (
          <div key={index}>
            <button className="w-full flex items-center justify-between py-3 text-left hover:bg-[#3c4043] rounded px-2 -mx-2">
              <span className="text-[#e8eaed] text-base">{question}</span>
              <ChevronDown className="w-4 h-4 text-[#9aa0a6] flex-shrink-0 ml-4" />
            </button>
            {index < questions.length - 1 && <div className="border-b border-[#3c4043]"></div>}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button className="text-sm text-[#8ab4f8] hover:underline text-[rgba(158,158,158,1)]">Sugerencias</button>
      </div>
    </div>
  )
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Update searchQuery when URL query changes
  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && searchQuery.trim() !== query) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  useEffect(() => {
    async function fetchResults() {
      if (!query) return
      setIsLoading(true)
      setError(null)

      try {
        // Check if query is "demo" - use predefined responses instead of ChatGPT
        if (query.toLowerCase() === "demo") {
          // Simulate loading time
          await new Promise((resolve) => setTimeout(resolve, 1000))
          setResults(demoResponses)
        } else {
          const response = await getChatGPTResponse(query)
          const fragments = splitResponseIntoFragments(response)
          setResults(fragments)
        }
      } catch (error) {
        console.error("Error fetching results:", error)
        setError(error instanceof Error ? error.message : "Error al procesar tu consulta")
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className="min-h-screen bg-[#202124] text-[#e8eaed]">
      <header className="sticky top-0 z-50 bg-[#202124]">
        <div className="flex items-center px-6 pt-3 pb-0">
          <div className="flex items-center flex-grow max-w-[692px] gap-3">
            <Link href="/" className="mr-5">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google-white-logo-xV9tIdWqzLF3ztdK3cM02AnedIPyfQ.png"
                alt="Google"
                width={92}
                height={30}
                priority
                className="w-[92px]"
              />
            </Link>
            <div className="flex-grow">
              <form onSubmit={handleSearch}>
                <div className="flex items-center w-full bg-[#303134] rounded-[24px] hover:bg-[#303134]/90 border border-[#5f6368] hover:border-[#8f939b] hover:shadow-md border-none h-auto text-[rgba(77,81,86,1)]">
                  <div className="flex-grow flex items-center min-w-0 px-4 py-3">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-grow min-w-0 bg-transparent text-[#e8eaed] text-base outline-none"
                      placeholder="Buscar en Google o escribir una URL"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="p-1 hover:bg-[#3c4043] rounded-full ml-2"
                      >
                        <X className="w-5 h-5 text-[#9aa0a6]" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center px-4 gap-3">
                    <button type="button" className="p-1 hover:bg-[#3c4043] rounded-full">
                      <Mic className="w-5 h-5 text-[#8ab4f8] text-gray-400" />
                    </button>
                    <button type="button" className="p-1 hover:bg-[#3c4043] rounded-full">
                      <Camera className="w-5 h-5 text-[#8ab4f8] text-gray-400" />
                    </button>
                    <button type="submit" className="p-1 hover:bg-[#3c4043] rounded-full">
                      <Search className="w-5 h-5 text-[#8ab4f8] text-gray-400" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center ml-auto gap-2">
            <button className="p-2 hover:bg-[#3c4043] rounded-full">
              <Grid className="w-6 h-6 text-[#e8eaed]" />
            </button>
            <button className="rounded-full bg-[#8ab4f8] flex items-center justify-center text-[#202124] font-medium w-[34px] h-[34px]">
              A
            </button>
          </div>
        </div>
        <div className="flex items-center mt-3">
          <div className="w-full border-b border-[#3c4043]">
            <div className="flex items-center space-x-5" style={{ marginLeft: "164px" }}>
              <div className="flex -mb-px">
                {SEARCH_CATEGORIES.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className={`px-3 py-3 text-[13px] ${
                      category.active
                        ? "text-[#8ab4f8] border-b-2 border-[#8ab4f8]"
                        : "text-[#969ba1] hover:text-[#e8eaed]"
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
                <button className="px-3 py-3 text-[13px] text-[#969ba1] hover:text-[#e8eaed] flex items-center gap-1">
                  Más
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="ml-auto">
                <button className="px-3 py-3 text-[13px] text-[#969ba1] hover:text-[#e8eaed] flex items-center gap-1">
                  Herramientas
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="py-4" style={{ paddingLeft: "164px", paddingRight: "24px" }}>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8ab4f8]"></div>
          </div>
        ) : error ? (
          <div className="text-red-400 mb-4">
            <p>Error: {error}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#9aa0a6] mb-4">Cerca de {results.length + 15} resultados</p>
            {[...Array(Math.max(20, results.length + 10))].map((_, index) => {
              const siteName = generateSiteName(index)
              const url = generateFakeUrl(query, index)
              const title = generateUniqueTitle(query, index, index < results.length)
              const description = index < results.length ? results[index] : getRandomLoremIpsum()

              return (
                <div className="" key={index}>
                  {/* Insert "Más preguntas" section after the 3rd result */}
                  {index === 3 && <MoreQuestionsSection query={query} />}

                  <div className="mb-6 max-w-[652px]">
                    {/* Site name without icon */}
                    <div className="text-sm text-[#bdc1c6] mb-1">{siteName}</div>

                    {/* URL */}
                    <div className="text-sm text-[#9aa0a6] mb-1">{url}</div>

                    {/* Title */}
                    <h2 className="text-xl text-[#8ab4f8] hover:underline cursor-pointer mb-1">{title}</h2>

                    {/* Description */}
                    <p className="text-sm leading-5 text-[#bdc1c6]">{description}</p>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
