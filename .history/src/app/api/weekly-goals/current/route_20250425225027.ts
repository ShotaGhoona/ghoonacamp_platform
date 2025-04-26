import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ユーザーの取得
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 今週の開始日を取得
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(today.getDate() - today.getDay());

    // 今週の目標を取得
    const weeklyGoals = await prisma.weeklyGoal.findMany({
      where: {
        userId: dbUser.id,
        weekStart,
        isPast: false,
      },
      orderBy: [
        { updatedAt: 'desc' }
      ]
    });

    return NextResponse.json({ weeklyGoals });
  } catch (error) {
    console.error("Error fetching weekly goals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 