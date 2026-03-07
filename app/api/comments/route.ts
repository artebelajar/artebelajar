import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { comments } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
  }

  try {
    const data = await db
      .select()
      .from(comments)
      .where(eq(comments.projectId, parseInt(projectId)))
      .orderBy(desc(comments.timestamp))

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

// POST /api/comments
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { projectId, name, text } = body

    if (!projectId || !name || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newComment = await db
      .insert(comments)
      .values({
        projectId: parseInt(projectId),
        name: name.trim(),
        text: text.trim(),
        timestamp: new Date(),
      })
      .returning()

    return NextResponse.json(newComment[0])
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}

// DELETE /api/comments?id=1
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Comment ID required' }, { status: 400 })
  }

  try {
    await db
      .delete(comments)
      .where(eq(comments.id, parseInt(id)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
  }
}