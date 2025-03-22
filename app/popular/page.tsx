import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, Search } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { getArticles } from "@/lib/articles"

export default function PopularPage() {
  // Get all articles sorted by view count (highest first)
  const articles = getArticles().sort((a, b) => {
    return (b.viewCount || 0) - (a.viewCount || 0)
  })

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
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form action="/search" method="get" className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search articles..."
                  className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px] lg:w-[300px]"
                />
              </form>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-700">
                  Popular Articles
                </h1>
                <p className="text-xl text-muted-foreground">Artikel terpopuler yang paling banyak dibaca</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <div key={article.slug} className="relative">
                    <ArticleCard article={article} />
                    {article.viewCount && article.viewCount > 0 && (
                      <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 text-xs text-white flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.viewCount}
                      </div>
                    )}
                  </div>
                ))}
              </div>
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

