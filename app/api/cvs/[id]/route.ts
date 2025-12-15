import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cvs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const cv = await db.select().from(cvs).where(eq(cvs.id, id));

    if (cv.length === 0) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    await db.delete(cvs).where(eq(cvs.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting CV:", error);
    return NextResponse.json({ error: "Failed to delete CV" }, { status: 500 });
  }
}
