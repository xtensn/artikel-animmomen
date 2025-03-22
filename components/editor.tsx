"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export function Editor({ value, onChange }: EditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write")

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="write" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="write" className="p-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content here... HTML is supported."
            className="min-h-[300px] border-0 focus-visible:ring-0 rounded-none resize-y"
          />
        </TabsContent>
        <TabsContent value="preview" className="p-4 min-h-[300px] prose dark:prose-invert max-w-none">
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <p className="text-muted-foreground">Nothing to preview</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

