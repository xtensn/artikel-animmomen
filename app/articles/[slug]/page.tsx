import { getArticles } from "@/lib/articles"
import ArticlePageClient from "./ArticlePageClient"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  const articles = getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return <ArticlePageClient params={params} />
}

