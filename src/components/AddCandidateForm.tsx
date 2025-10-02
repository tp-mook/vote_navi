// src/components/AddCandidateForm.tsx

"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scandal } from '@/types/candidate';

export default function AddCandidateForm() {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [age, setAge] = useState('');
  const [electoralDistrict, setElectoralDistrict] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scandals, setScandals] = useState<Scandal[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleScandalChange = (index: number, field: keyof Scandal, value: string) => {
    const newScandals = [...scandals];
    newScandals[index][field] = value;
    setScandals(newScandals);
  };

  const addScandal = () => {
    setScandals([...scandals, { date: '', title: '', source: '', description: '' }]);
  };

  const removeScandal = (index: number) => {
    const newScandals = scandals.filter((_, i) => i !== index);
    setScandals(newScandals);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const newCandidate = {
      name,
      party,
      age: Number(age),
      electoralDistrict,
      catchphrase,
      imageUrl: imageUrl || 'https://placehold.jp/150x150.png?text=No+Image',
      scandals,
    };

    try {
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCandidate),
      });

      if (!response.ok) {
        throw new Error('Failed to add candidate');
      }

      alert('候補者の追加に成功しました！');
      setName('');
      setParty('');
      setAge('');
      setElectoralDistrict('');
      setCatchphrase('');
      setImageUrl('');
      setScandals([]);
      router.refresh();

    } catch (err) {
      setError('候補者の追加に失敗しました。');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">氏名</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="party" className="block text-sm font-medium text-gray-700">政党</label>
        <input type="text" id="party" value={party} onChange={(e) => setParty(e.target.value)} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">年齢</label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="electoralDistrict" className="block text-sm font-medium text-gray-700">選挙区</label>
        <input type="text" id="electoralDistrict" value={electoralDistrict} onChange={(e) => setElectoralDistrict(e.target.value)} required className={inputClass} />
      </div>
       <div>
        <label htmlFor="catchphrase" className="block text-sm font-medium text-gray-700">キャッチフレーズ</label>
        <input type="text" id="catchphrase" value={catchphrase} onChange={(e) => setCatchphrase(e.target.value)} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">画像URL</label>
        <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClass} />
      </div>

      <div className="border-t pt-4 mt-6">
        <h4 className="text-lg font-medium text-gray-800 mb-2">過去の不祥事・問題発言</h4>
        {scandals.map((scandal, index) => (
          <div key={index} className="p-4 border rounded-md space-y-3 mb-4 relative bg-gray-50">
            <input type="date" placeholder="日付" value={scandal.date} onChange={(e) => handleScandalChange(index, 'date', e.target.value)} required className={inputClass} />
            <input type="text" placeholder="見出し" value={scandal.title} onChange={(e) => handleScandalChange(index, 'title', e.target.value)} required className={inputClass} />
            <input type="url" placeholder="情報源URL" value={scandal.source} onChange={(e) => handleScandalChange(index, 'source', e.target.value)} required className={inputClass} />
            <textarea placeholder="簡単な説明" value={scandal.description} onChange={(e) => handleScandalChange(index, 'description', e.target.value)} required className={`${inputClass} min-h-[80px]`} />
            <button type="button" onClick={() => removeScandal(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold p-1">✕</button>
          </div> // ← ★★★ ここに閉じタグを追加しました ★★★
        ))}
        <button type="button" onClick={addScandal} className="w-full text-sm py-2 px-4 border border-dashed rounded-md text-gray-600 hover:bg-gray-100">
          ＋ 項目を追加
        </button>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 mt-6">
        {isSubmitting ? '追加中...' : '候補者を追加'}
      </button>
    </form>
  );
}