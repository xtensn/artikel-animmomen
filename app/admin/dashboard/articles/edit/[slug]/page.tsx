"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AdminHeader } from "@/components/admin-header"
import { isAuthenticated } from "@/lib/auth"
import { getArticleBySlug, updateArticle, type Article } from "@/lib/articles"
import { Editor } from "@/components/editor"

interface EditArticlePageProps {
  params: {
    slug: string
  }
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin")
      return
    }

    const articleData = getArticleBySlug(params.slug)
    if (!articleData) {
      notFound()
    }

    setArticle(articleData)
    setTitle(articleData.title)
    setSlug(articleData.slug)
    setCategory(articleData.category || "")
    setExcerpt(articleData.excerpt)
    setContent(articleData.content)
    setCoverImage(articleData.coverImage || "")
  }, [params.slug, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!article) return

    const updatedArticle = {
      ...article,
      title,
      slug,
      category,
      excerpt,
      content,
      coverImage,
    }

    updateArticle(params.slug, updatedArticle)
    router.push("/admin/dashboard")
  }

  if (!article) {
    return <div className="container py-12">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-url-slug"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., News, Review, Opinion"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">Leave empty to use a placeholder image</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of the article"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Editor value={content} onChange={setContent} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Update Article</Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  )
}

