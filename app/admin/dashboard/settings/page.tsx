"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AdminHeader } from "@/components/admin-header"
import { isAuthenticated } from "@/lib/auth"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin")
      return
    }

    // Load settings from localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true"
    const savedEmailNotifications = localStorage.getItem("emailNotifications") !== "false"

    setDarkMode(savedDarkMode)
    setEmailNotifications(savedEmailNotifications)
  }, [router])

  const handleSaveSettings = () => {
    // Save settings to localStorage
    localStorage.setItem("darkMode", darkMode.toString())
    localStorage.setItem("emailNotifications", emailNotifications.toString())

    // Show success message
    alert("Settings saved successfully!")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the admin dashboard looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website Information</CardTitle>
              <CardDescription>Basic information about your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Website Name</Label>
                <div className="rounded-md border p-2">AnimMomen</div>
              </div>
              <div className="grid gap-2">
                <Label>Admin Email</Label>
                <div className="rounded-md border p-2">admin@animmomen.com</div>
              </div>
              <div className="grid gap-2">
                <Label>Version</Label>
                <div className="rounded-md border p-2">1.0.0</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

