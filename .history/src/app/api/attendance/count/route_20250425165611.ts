import { NextResponse } from 'next/server';

export async function GET() {
  // 一時的なモックデータを返す
  return NextResponse.json({
    totalDays: 30,
    currentStreak: 5,
    longestStreak: 10,
  });
} 