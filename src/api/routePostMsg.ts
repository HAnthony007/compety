// app/api/messages/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { messagesTable } from '@/db/schema';

export async function POST(request: Request) {
  const { text, sender_id, receveur_id } = await request.json();

  try {
    // Insertion du message en base et récupération du résultat inséré
    const [message] = await db
      .insert(messagesTable)
      .values({
        text,
        sender_id,
        receveur_id,
      })
      .returning();

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du message' },
      { status: 500 }
    );
  }
}
