// src/app/api/candidates/[id]/route.ts

import { NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'; // updateDoc, deleteDocを追加
import { db } from '@/lib/firebase';
import { Candidate } from '@/types/candidate';

type Params = { id: string };

// GETリクエスト (変更なし、pledgesとscandalsを追加)
export async function GET(request: Request, context: { params: Params }) {
  try {
    const { id } = context.params;
    const docSnap = await getDoc(doc(db, 'candidates', id));
    if (!docSnap.exists()) return new NextResponse('Not Found', { status: 404 });
    const data = docSnap.data();
    const candidate: Candidate = {
      id: docSnap.id,
      name: data.name || '',
      party: data.party || '',
      age: data.age || 0,
      electoralDistrict: data.electoralDistrict || '',
      catchphrase: data.catchphrase || '',
      imageUrl: data.imageUrl || '',
      pledges: data.pledges || [],
      scandals: data.scandals || [],
    };
    return NextResponse.json(candidate);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// ▼▼▼ PUTリクエスト（更新）の処理を追加 ▼▼▼
export async function PUT(request: Request, context: { params: Params }) {
  try {
    const { id } = context.params;
    const updatedData = await request.json();
    const docRef = doc(db, 'candidates', id);
    await updateDoc(docRef, {
      ...updatedData,
      age: Number(updatedData.age),
    });
    return NextResponse.json({ message: 'Candidate updated successfully' });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// ▼▼▼ DELETEリクエスト（削除）の処理を追加 ▼▼▼
export async function DELETE(request: Request, context: { params: Params }) {
  try {
    const { id } = context.params;
    const docRef = doc(db, 'candidates', id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}