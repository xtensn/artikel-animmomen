"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock, ArrowLeft, Eye } from "lucide-react"
import { getArticleBySlug, incrementViewCount } from "@/lib/articles"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePageClient({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  useEffect(() => {
    // Increment view count when article is viewed
    if (article) {
      incrementViewCount(article.slug)
    }
  }, [article])

  if (!article) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-12">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {article.date}
            </div>
            {article.category && (
              <div className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {article.category}
              </div>
            )}
            {article.viewCount && (
              <div className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                <Eye className="mr-1 h-3 w-3" />
                {article.viewCount} views
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
          <p className="text-xl text-muted-foreground">{article.excerpt}</p>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={article.coverImage || "/placeholder.svg?height=500&width=1000"}
            alt={article.title}
            width={1000}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  )
}

