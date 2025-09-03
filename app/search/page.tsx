import { Suspense } from "react"
import SearchResults from "./SearchResults"

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#202124] text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
