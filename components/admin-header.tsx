import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Settings } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-pink-500 to-purple-700">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
            </div>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-700">
              ANIMMOMEN ADMIN
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3">
              <LayoutDashboard className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline-block">Dashboard</span>
            </Button>
          </Link>
          <Link href="/admin/dashboard/articles/new">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3">
              <FileText className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline-block">New Article</span>
            </Button>
          </Link>
          <Link href="/admin/dashboard/settings">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3">
              <Settings className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline-block">Settings</span>
            </Button>
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm">
              View Site
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

