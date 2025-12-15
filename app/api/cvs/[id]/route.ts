import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cvs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { stackServerApp } from "@/stack/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    
    // Get the current user
    const user = await stackServerApp.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the CV
    const cv = await db.select().from(cvs).where(eq(cvs.id, id));

    if (cv.length === 0) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    // Check if the user is the owner of the CV
    if (cv[0].userId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own CVs" },
        { status: 403 }
      );
    }

    // Delete the CV
    await db.delete(cvs).where(eq(cvs.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting CV:", error);
    return NextResponse.json({ error: "Failed to delete CV" }, { status: 500 });
  }
}
