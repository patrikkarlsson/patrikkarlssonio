import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
 
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl)

  const secret = searchParams.get('secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' },
      { status: 401 })
  }

  const { full_slug } = await request.json()
  
  if (!full_slug) {
    return NextResponse.json({ message: 'Missing path param' },
      { status: 400 })
  }

  revalidatePath(`/${full_slug}`)
 
  return NextResponse.json({
    revalidated: true,
    now: Date.now() })
}