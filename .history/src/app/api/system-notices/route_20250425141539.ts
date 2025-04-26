import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const notices = await prisma.$queryRaw`
      SELECT n.*, 
             json_agg(json_build_object(
               'tag', json_build_object(
                 'id', t.id,
                 'name', t.name,
                 'color', t.color
               )
             )) as tags
      FROM system_notices n
      LEFT JOIN system_notice_on_tags nt ON n.id = nt.notice_id
      LEFT JOIN system_notice_tags t ON nt.tag_id = t.id
      WHERE n.is_public = true
        AND n.publish_start_at <= NOW()
        AND n.publish_end_at >= NOW()
        AND n.deleted_at IS NULL
      GROUP BY n.id
      ORDER BY n.created_at DESC;
    `;

    return NextResponse.json(notices);
  } catch (error) {
    console.error('システム通知の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'システム通知の取得に失敗しました' },
      { status: 500 }
    );
  }
} 