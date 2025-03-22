"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash2, LogOut } from "lucide-react"
import { isAuthenticated, logout } from "@/lib/auth"
import { getArticles, deleteArticle, type Article } from "@/lib/articles"
import { AdminHeader } from "@/components/admin-header"

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/admin")
      return
    }

    // Load articles
    const loadArticles = () => {
      const allArticles = getArticles()
      setArticles(allArticles)
    }

    loadArticles()
  }, [router])

  const handleDeleteArticle = (slug: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle(slug)
      setArticles(getArticles())
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="articles" className="space-y-4">
          <TabsList>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="articles" className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Manage Articles</h2>
              <Link href="/admin/dashboard/articles/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Article
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {articles.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No articles found. Create your first article!</p>
                  </CardContent>
                </Card>
              ) : (
                articles.map((article) => (
                  <Card key={article.slug}>
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{article.title}</CardTitle>
                          <CardDescription>
                            {article.date} • {article.category || "Uncategorized"}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/admin/dashboard/articles/edit/${article.slug}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteArticle(article.slug)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Overview of your website performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground text-sm font-medium">Total Articles</div>
                    <div className="text-2xl font-bold">{articles.length}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground text-sm font-medium">Published This Month</div>
                    <div className="text-2xl font-bold">
                      {
                        articles.filter((a) => {
                          const date = new Date(a.date)
                          const now = new Date()
                          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                        }).length
                      }
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground text-sm font-medium">Categories</div>
                    <div className="text-2xl font-bold">
                      {new Set(articles.map((a) => a.category).filter(Boolean)).size}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground text-sm font-medium">Latest Article</div>
                    <div className="text-md font-medium truncate">
                      {articles.length > 0 ? articles[0].title : "None"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

