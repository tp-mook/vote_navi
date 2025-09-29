// src/app/api/candidates/[id]/route.ts

import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Candidate } from '@/types/candidate';

type Params = {
  id: string;
};

// GETリクエスト（データ取得）に対する処理
// context.params.idでURLの動的な部分（[id]）を取得できる
export async function GET(request: Request, context: { params: Params }) {
  try {
    const { id } = context.params;
    const docRef = doc(db, 'candidates', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // 候補者が見つからない場合は404エラーを返す
      return new NextResponse('Candidate not found', { status: 404 });
    }

    const data = docSnap.data();
    const candidate: Candidate = {
      id: docSnap.id,
      name: data.name || '',
      party: data.party || '',
      age: data.age || 0,
      electoralDistrict: data.electoralDistrict || '',
      catchphrase: data.catchphrase || '',
      imageUrl: data.imageUrl || '',
    };

    return NextResponse.json(candidate);

  } catch (error) {
    console.error(`Error fetching candidate with id:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}