import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-background to-muted">
      <div className="space-y-6 max-w-md">
        <div className="relative h-24 w-24 mx-auto overflow-hidden rounded-full bg-gradient-to-br from-pink-500 to-purple-700">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-4xl">404</div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Maaf, Halaman Tidak Ditemukan</h1>
        <p className="text-muted-foreground">
          Halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan kembali ke beranda untuk melanjutkan
          menjelajahi konten kami.
        </p>
        <Link href="/">
          <Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-700 hover:from-pink-600 hover:to-purple-800">
            <Home className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  )
}

