export const metadata = {
  title: 'EmoteMaker.ai - Emoteboard: Your Ultimate Emote Creation Tool',
  description: 'Unlock your creativity with Emoteboard, the ultimate tool for designing, creating, and editing emotes. Perfect for streamers, Discord communities, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
