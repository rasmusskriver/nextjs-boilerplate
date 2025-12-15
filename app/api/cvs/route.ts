import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cvs } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, fileUrl, fileName, fileSize } = body;

    const newCV = await db.insert(cvs).values({
      userId: 'anonymous',
      userName: 'Anonym',
      userEmail: '',
      title,
      description: description || null,
      fileUrl,
      fileName,
      fileSize,
    }).returning();

    return NextResponse.json(newCV[0]);
  } catch (error) {
    console.error('Error creating CV:', error);
    return NextResponse.json({ error: 'Failed to create CV' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let allCVs;
    if (userId) {
      allCVs = await db.select().from(cvs).where(eq(cvs.userId, userId)).orderBy(cvs.uploadedAt);
    } else {
      allCVs = await db.select().from(cvs).orderBy(cvs.uploadedAt);
    }

    return NextResponse.json(allCVs);
  } catch (error) {
    console.error('Error fetching CVs:', error);
    return NextResponse.json({ error: 'Failed to fetch CVs' }, { status: 500 });
  }
}
