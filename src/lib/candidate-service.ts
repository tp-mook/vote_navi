// src/lib/candidate-service.ts

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Firestoreのインスタンスをインポート
import { Candidate } from "@/types/candidate";

// Firestoreの'candidates'コレクションへの参照
const candidatesCollectionRef = collection(db, "candidates");

/**
 * すべての候補者データをFirestoreから取得する関数
 */
export async function getAllCandidates(): Promise<Candidate[]> {
  const querySnapshot = await getDocs(candidatesCollectionRef);
  
  const candidates = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id, // ドキュメントIDをidとして使用
      name: data.name || '',
      party: data.party || '',
      age: data.age || 0,
      electoralDistrict: data.electoralDistrict || '',
      catchphrase: data.catchphrase || '',
      imageUrl: data.imageUrl || '',
    } as Candidate;
  });

  return candidates;
}

/**
 * 指定されたIDの候補者データをFirestoreから取得する関数
 */
export async function getCandidateById(id: string): Promise<Candidate | null> {
  const docRef = doc(db, "candidates", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name || '',
      party: data.party || '',
      age: data.age || 0,
      electoralDistrict: data.electoralDistrict || '',
      catchphrase: data.catchphrase || '',
      imageUrl: data.imageUrl || '',
    } as Candidate;
  } else {
    // ドキュメントが見つからない場合
    return null;
  }
}