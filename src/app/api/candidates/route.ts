// src/app/api/candidates/route.ts

import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Candidate } from '@/types/candidate';

// GETリクエスト（データ取得）に対する処理
export async function GET() {
  try {
    const candidatesCollectionRef = collection(db, 'candidates');
    const querySnapshot = await getDocs(candidatesCollectionRef);

    const candidates = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        party: data.party || '',
        age: data.age || 0,
        electoralDistrict: data.electoralDistrict || '',
        catchphrase: data.catchphrase || '',
        imageUrl: data.imageUrl || '',
      } as Candidate;
    });

    // 取得したデータをJSON形式で返す
    return NextResponse.json(candidates);

  } catch (error) {
    console.error("Error fetching candidates: ", error);
    // エラーが発生した場合は、500エラーステータスとエラーメッセージを返す
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}