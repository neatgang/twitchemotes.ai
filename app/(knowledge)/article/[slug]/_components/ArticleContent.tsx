"use client"

import { Article } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const formattedDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString() 
    : 'Not published'

  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Category: {article.category} | Published: {formattedDate}
        </p>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {article.content}
        </div>
      </CardContent>
    </Card>
  )
}