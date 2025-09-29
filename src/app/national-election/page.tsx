// src/app/national-election/page.tsx

import Breadcrumbs from "@/components/Breadcrumbs";
import CandidateCard from "@/components/CandidateCard";
import { Candidate } from "@/types/candidate"; // Candidateの型を直接インポート

// APIから候補者データを取得する新しい関数
async function fetchCandidatesFromAPI(): Promise<Candidate[]> {
  // process.env.NEXT_PUBLIC_VERCEL_URLはデプロイ時に自動で設定されるURL
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/candidates`, {
    cache: 'no-store', // 常に最新のデータを取得するためキャッシュを無効化
  });

  if (!response.ok) {
    throw new Error('Failed to fetch candidates');
  }
  return response.json();
}

export default async function NationalElectionPage() {
  // 新しい関数を使ってAPIからデータを取得
  const candidates = await fetchCandidatesFromAPI();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: "トップページ", href: "/" },
        { label: "国政選挙 候補者一覧" }
      ]} />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
        国政選挙 候補者一覧
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}