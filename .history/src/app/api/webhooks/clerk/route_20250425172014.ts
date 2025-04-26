import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

async function updateUserInDatabase(eventType: string, data: any) {
  switch (eventType) {
    case 'user.created':
    case 'user.updated':
      await prisma.user.upsert({
        where: { clerkId: data.id },
        create: {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address ?? '',
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        },
        update: {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        },
      });
      break;
    case 'user.deleted':
      await prisma.user.update({
        where: { clerkId: data.id },
        data: { deletedAt: new Date() },
      });
      break;
  }
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  try {
    await updateUserInDatabase(evt.type, evt.data);
    return new Response('Success', { status: 200 });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response('Error processing webhook', { status: 500 });
  }
} 