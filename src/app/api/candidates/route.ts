// src/app/api/candidates/route.ts

import { NextResponse } from 'next/server';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Candidate } from '@/types/candidate';

// GETリクエスト
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'candidates'));
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
        scandals: data.scandals || [], // ▼▼▼ この行を追加 ▼▼▼
      } as Candidate;
    });
    return NextResponse.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates: ", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POSTリクエスト
export async function POST(request: Request) {
  try {
    const newCandidateData = await request.json();
    if (!newCandidateData.name || !newCandidateData.party) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    const docRef = await addDoc(collection(db, 'candidates'), {
      ...newCandidateData,
      age: Number(newCandidateData.age),
      scandals: newCandidateData.scandals || [], // ▼▼▼ この行を追加 ▼▼▼
    });
    return NextResponse.json({ message: "Candidate added successfully", id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error adding candidate: ", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}