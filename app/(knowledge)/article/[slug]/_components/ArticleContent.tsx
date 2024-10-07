"use client"

import { Article } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const formattedDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString() 
    : 'Not published'

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="text-3xl font-bold mb-2">{article.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Category: {article.category} | Published: {formattedDate}
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="mb-2" {...props} />,
              a: ({node, ...props}) => <a className="text-blue-500 hover:underline" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}