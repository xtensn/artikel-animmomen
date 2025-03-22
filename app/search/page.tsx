"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { getArticles, type Article } from "@/lib/articles"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<Article[]>([])

  useEffect(() => {
    if (query) {
      const articles = getArticles()
      const filteredArticles = articles.filter((article) => {
        const searchableText =
          `${article.title} ${article.excerpt} ${article.content} ${article.category || ""}`.toLowerCase()
        return searchableText.includes(query.toLowerCase())
      })
      setSearchResults(filteredArticles)
    } else {
      setSearchResults([])
    }
  }, [query])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-pink-500 to-purple-700">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
              </div>
              <span className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-700">
                ANIMMOMEN
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
                HOME
              </Link>
              <Link
                href="/latest"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
              >
                LATEST
              </Link>
              <Link
                href="/popular"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
              >
                POPULAR
              </Link>
              <Link
                href="/about"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
              >
                ABOUT US
              </Link>
              <Link
                href="https://linktr.ee/animmomen"
                target="_blank"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
              >
                LINKS
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-700">
                  Search Results
                </h1>
                <p className="text-xl text-muted-foreground">
                  {searchResults.length > 0
                    ? `Found ${searchResults.length} result${searchResults.length > 1 ? "s" : ""} for "${query}"`
                    : `No results found for "${query}"`}
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Try searching with different keywords or browse our latest articles
                  </p>
                  <div className="flex justify-center gap-4 mt-6">
                    <Link href="/latest">
                      <Button variant="outline">Browse Latest Articles</Button>
                    </Link>
                    <Link href="/">
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-700 hover:from-pink-600 hover:to-purple-800">
                        Return to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-8">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-700 hover:from-pink-600 hover:to-purple-800">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-pink-500 to-purple-700">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-700">
              ANIMMOMEN
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} AnimMomen. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link
              href="https://linktr.ee/animmomen"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
            >
              Links
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

