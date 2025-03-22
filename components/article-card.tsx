import Link from "next/link"
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Eye } from "lucide-react"
import type { Article } from "@/lib/articles"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={article.coverImage || "/placeholder.svg?height=200&width=400"}
          alt={article.title}
          width={400}
          height={200}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 flex-wrap">
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
              {article.viewCount}
            </div>
          )}
        </div>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/articles/${article.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

