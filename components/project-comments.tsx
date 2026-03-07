"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, Send, User, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

// Interface disesuaikan dengan database
interface Comment {
  id: number
  projectId: number
  name: string
  text: string
  timestamp: string
}

export function ProjectComments({ projectId }: { projectId: number }) {
  const { t, dir } = useLanguage()
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [expanded, setExpanded] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Load comments dari API
  const loadComments = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/comments?projectId=${projectId}`)
      
      if (!res.ok) {
        throw new Error('Failed to load comments')
      }
      
      const data = await res.json()
      setComments(data)
    } catch (error) {
      console.error('Error loading comments:', error)
      setError('Gagal memuat komentar')
    } finally {
      setLoading(false)
    }
  }

  // Load comments saat komponen pertama render atau projectId berubah
  useEffect(() => {
    loadComments()
  }, [projectId])

  // HAPUS useEffect untuk load nama dari localStorage
  // useEffect(() => {
  //   const savedName = localStorage.getItem("comment-username")
  //   if (savedName) setName(savedName)
  // }, [])

  // Format waktu dengan terjemahan
  const timeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return t("comments.justNow")
    if (mins < 60) return t("comments.minutesAgo").replace("{mins}", mins.toString())
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return t("comments.hoursAgo").replace("{hrs}", hrs.toString())
    const days = Math.floor(hrs / 24)
    return t("comments.daysAgo").replace("{days}", days.toString())
  }

  // Submit komentar baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimName = name.trim()
    const trimText = text.trim()
    if (!trimName || !trimText) return

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          name: trimName,
          text: trimText,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to post comment')
      }

      const newComment = await res.json()
      setComments(prev => [newComment, ...prev])
      setText("")
      // HAPUS localStorage.setItem("comment-username", trimName)
      setName("") // Kosongkan nama setelah submit

      // Scroll ke atas komentar
      listRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error('Error posting comment:', error)
      setError(error instanceof Error ? error.message : 'Gagal mengirim komentar')
    } finally {
      setSubmitting(false)
    }
  }

  // Hapus komentar
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/comments?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to delete comment')
      }

      setComments(prev => prev.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting comment:', error)
      setError(error instanceof Error ? error.message : 'Gagal menghapus komentar')
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-border bg-secondary/50" dir={dir}>
      {/* Toggle header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-secondary/80"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <MessageCircle className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="font-mono text-sm font-medium text-foreground">
            {t("comments.title")}
          </span>
          {comments.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 px-1.5 font-mono text-[10px] font-semibold text-primary">
              {comments.length}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Expandable content */}
      {expanded && (
        <div className="border-t border-border px-5 py-4">
          {/* Error message */}
          {error && (
            <div className="mb-3 rounded-lg bg-red-500/10 p-2 text-center">
              <p className="font-mono text-xs text-red-500">{error}</p>
            </div>
          )}

          {/* Comment list */}
          <div
            ref={listRef}
            className={`space-y-3 ${
              comments.length > 3 ? "max-h-64 overflow-y-auto pr-1" : ""
            }`}
          >
            {loading ? (
              <div className="flex justify-center py-6">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : comments.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-6 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border">
                  <MessageCircle className="h-4 w-4 text-muted-foreground/50" />
                </div>
                <p className="font-mono text-xs text-muted-foreground/60">
                  {t("comments.empty")}
                </p>
              </div>
            ) : (
              comments.map((comment, i) => (
                <div
                  key={comment.id}
                  className="group relative rounded-lg border border-border/60 bg-card/60 p-3.5 transition-colors hover:border-primary/20"
                  style={{
                    animation: "fade-slide-up 0.3s ease-out forwards",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-3 w-3 text-primary" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {comment.name}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground/50">
                        {timeAgo(comment.timestamp)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="flex h-5 w-5 items-center justify-center rounded opacity-0 transition-all hover:bg-destructive/10 group-hover:opacity-100"
                      aria-label={t("comments.deleteAria").replace("{name}", comment.name)}
                    >
                      <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                  <p className="pl-8 text-sm text-muted-foreground leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
            <input
              type="text"
              placeholder={t("comments.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="w-full rounded-lg border border-border bg-card px-3.5 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
              disabled={submitting}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t("comments.textPlaceholder")}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={280}
                className="flex-1 rounded-lg border border-border bg-card px-3.5 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={!name.trim() || !text.trim() || submitting}
                className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={t("comments.submit")}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-right font-mono text-[10px] text-muted-foreground/40">
              {text.length}/280
            </p>
          </form>
        </div>
      )}
    </div>
  )
}