// src/app/admin/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import AddCandidateForm from '@/components/AddCandidateForm';
import { Candidate } from '@/types/candidate';
import Link from 'next/link';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const router = useRouter();
  
  const fetchCandidates = () => {
    fetch('/api/candidates')
      .then(res => res.json())
      .then(data => setCandidates(data));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCandidates();
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (confirm('本当にこの候補者を削除しますか？')) {
      try {
        const response = await fetch(`/api/candidates/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Deletion failed');
        alert('候補者を削除しました。');
        fetchCandidates();
      } catch (error) {
        alert('削除に失敗しました。');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">管理者ダッシュボード</h2>
        <button
          onClick={async () => { await signOut(auth); router.push('/login'); }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          ログアウト
        </button>
      </div>
      <p className="mb-8 text-gray-800">ようこそ、{user?.email}さん</p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">登録済み候補者一覧</h3>
        <div className="space-y-2">
          {candidates.map(candidate => (
            <div key={candidate.id} className="flex justify-between items-center p-2 border-b">
              {/* ▼▼▼ 変更点 ▼▼▼ */}
              <span className="text-gray-900">{candidate.name} ({candidate.party})</span>
              <div className="space-x-2">
                <Link href={`/admin/edit/${candidate.id}`} className="text-sm text-blue-600 hover:underline">編集</Link>
                <button onClick={() => handleDelete(candidate.id)} className="text-sm text-red-600 hover:underline">削除</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">新規候補者を追加</h3>
        <AddCandidateForm />
      </div>
    </div>
  );
}