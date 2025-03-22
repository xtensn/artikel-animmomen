import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Search } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { getArticles } from "@/lib/articles"

export default function Home() {
  const articles = getArticles()
  const featuredArticle = articles[0]
  const recentArticles = articles.slice(1, 7)

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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-700">
                    Your Ultimate Anime Media Hub
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover the latest news, reviews, and insights about your favorite anime series and movies.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/latest">
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-700 hover:from-pink-600 hover:to-purple-800">
                      Explore Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/popular">
                    <Button variant="outline">Popular Content</Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
                <Image
                  src="/placeholder.svg?height=550&width=850"
                  width={850}
                  height={550}
                  alt="Hero Image"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {featuredArticle && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Featured Article</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{featuredArticle.title}</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full">
                  <Image
                    src={featuredArticle.coverImage || "/placeholder.svg?height=310&width=550"}
                    width={550}
                    height={310}
                    alt={featuredArticle.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {featuredArticle.date}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">{featuredArticle.title}</h3>
                    <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href={`/articles/${featuredArticle.slug}`}>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-700 hover:from-pink-600 hover:to-purple-800">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="latest" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Articles</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay updated with the newest content from the anime world
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {recentArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/latest">
                <Button variant="outline" className="mt-4">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="newsletter" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Stay Updated with Anime News</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Subscribe to our newsletter to receive the latest updates, reviews, and exclusive content.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-700 hover:from-pink-600 hover:to-purple-800">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
                <Image
                  src="/placeholder.svg?height=310&width=550"
                  width={550}
                  height={310}
                  alt="Newsletter Image"
                  className="h-full w-full object-cover"
                />
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

