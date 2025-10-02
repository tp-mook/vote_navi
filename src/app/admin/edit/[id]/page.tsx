// src/app/admin/edit/[id]/page.tsx

"use client";

import { useEffect, useState, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Candidate, Scandal } from '@/types/candidate';
import Link from 'next/link';

export default function EditCandidatePage() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // データの読み込み
  useEffect(() => {
    if (id) {
      fetch(`/api/candidates/${id}`)
        .then(res => res.json())
        .then(data => {
          setCandidate(data);
          setIsLoading(false);
        });
    }
  }, [id]);

  // 各入力フィールドの変更をハンドルする
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!candidate) return;
    const { name, value } = e.target;
    
    if (name === "pledges") {
      setCandidate({ ...candidate, pledges: value.split('\n') });
    } else {
      setCandidate({ ...candidate, [name]: value });
    }
  };

  // 不祥事入力欄の変更をハンドルする
  const handleScandalChange = (index: number, field: keyof Scandal, value: string) => {
    if (!candidate || !candidate.scandals) return;
    const newScandals = [...candidate.scandals];
    newScandals[index] = { ...newScandals[index], [field]: value };
    setCandidate({ ...candidate, scandals: newScandals });
  };

  const addScandal = () => {
    if (!candidate) return;
    const newScandals = [...(candidate.scandals || []), { date: '', title: '', source: '', description: '' }];
    setCandidate({ ...candidate, scandals: newScandals });
  };

  const removeScandal = (index: number) => {
    if (!candidate || !candidate.scandals) return;
    const newScandals = candidate.scandals.filter((_, i) => i !== index);
    setCandidate({ ...candidate, scandals: newScandals });
  };

  // フォーム送信処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!candidate) return;

    try {
      const response = await fetch(`/api/candidates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidate),
      });

      if (!response.ok) throw new Error('Update failed');
      
      alert('候補者情報を更新しました！');
      router.push('/admin');
      router.refresh();

    } catch (error) {
      alert('更新に失敗しました。');
    }
  };

  if (isLoading) return <p className="text-center mt-12">Loading...</p>;
  if (!candidate) return <p className="text-center mt-12">Candidate not found.</p>;
  
  const inputClass = "mt-1 block w-full rounded-md border-gray-500 shadow-sm sm:text-sm text-gray-900";
  // ▼▼▼ ここの font-medium を font-bold に変更 ▼▼▼
  const labelClass = "block text-sm font-bold text-gray-900"; 

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block">&larr; 管理者ダッシュボードに戻る</Link>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">{candidate.name} の情報を編集</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>氏名</label>
          <input type="text" id="name" name="name" value={candidate.name} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="party" className={labelClass}>政党</label>
          <input type="text" id="party" name="party" value={candidate.party} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="age" className={labelClass}>年齢</label>
          <input type="number" id="age" name="age" value={candidate.age} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="electoralDistrict" className={labelClass}>選挙区</label>
          <input type="text" id="electoralDistrict" name="electoralDistrict" value={candidate.electoralDistrict} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="catchphrase" className={labelClass}>キャッチフレーズ</label>
          <input type="text" id="catchphrase" name="catchphrase" value={candidate.catchphrase} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="imageUrl" className={labelClass}>画像URL</label>
          <input type="text" id="imageUrl" name="imageUrl" value={candidate.imageUrl} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="pledges" className={labelClass}>主な公約（1行に1つずつ）</label>
          <textarea 
            id="pledges" 
            name="pledges" 
            value={candidate.pledges?.join('\n') || ''} 
            onChange={handleChange}
            rows={5}
            className={`${inputClass} min-h-[120px]`}
          />
        </div>
        
        <div className="border-t pt-4 mt-6">
          <h4 className="text-lg font-bold text-gray-800 mb-2">過去の不祥事・問題発言</h4>
          {(candidate.scandals || []).map((scandal, index) => (
            <div key={index} className="p-4 border rounded-md space-y-3 mb-4 relative bg-gray-50">
              <input type="date" placeholder="日付" value={scandal.date} onChange={(e) => handleScandalChange(index, 'date', e.target.value)} required className={inputClass} />
              <input type="text" placeholder="見出し" value={scandal.title} onChange={(e) => handleScandalChange(index, 'title', e.target.value)} required className={inputClass} />
              <input type="url" placeholder="情報源URL" value={scandal.source} onChange={(e) => handleScandalChange(index, 'source', e.target.value)} required className={inputClass} />
              <textarea placeholder="簡単な説明" value={scandal.description} onChange={(e) => handleScandalChange(index, 'description', e.target.value)} required className={`${inputClass} min-h-[80px]`} />
              <button type="button" onClick={() => removeScandal(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold p-1">✕</button>
            </div>
          ))}
          <button type="button" onClick={addScandal} className="w-full text-sm py-2 px-4 border border-dashed rounded-md text-gray-600 hover:bg-gray-100">
            ＋ 不祥事・問題発言を追加
          </button>
        </div>

        <button type="submit" className="w-full justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 mt-6">
          情報を更新
        </button>
      </form>
    </div>
  );
}