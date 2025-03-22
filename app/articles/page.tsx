import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { getArticles } from "@/lib/articles"

export default function ArticlesPage() {
  const articles = getArticles()

  return (
    <div className="container py-12">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">All Articles</h1>
          <p className="text-xl text-muted-foreground">Browse all our anime articles and reviews</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

