// src/app/candidates/[id]/page.tsx

import Breadcrumbs from "@/components/Breadcrumbs";
import { Candidate } from "@/types/candidate"; // 型をインポート
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

// 新しくAPIから特定の候補者データを取得する関数
async function fetchCandidateFromAPI(id: string): Promise<Candidate | null> {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/candidates/${id}`, {
    cache: 'no-store', // 常に最新のデータを取得
  });

  if (response.status === 404) {
    return null; // 候補者が見つからなかった場合
  }

  if (!response.ok) {
    throw new Error('Failed to fetch candidate');
  }

  return response.json();
}

export default async function CandidateDetailPage({ params }: Props) {
  // 新しい関数を使ってAPIからデータを取得
  const candidate = await fetchCandidateFromAPI(params.id);

  // もし該当するIDの候補者が見つからなければ404ページを表示
  if (!candidate) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: "トップページ", href: "/" },
        { label: "国政選挙 候補者一覧", href: "/national-election" },
        { label: candidate.name }
      ]} />
      <div className="bg-white p-8 rounded-lg shadow-md mt-6">
        <div className="flex flex-col md:flex-row items-start">
          <Image
            src={candidate.imageUrl}
            alt={candidate.name}
            width={150}
            height={150}
            className="rounded-lg mr-8 mb-4 md:mb-0"
          />
          <div className="flex-1">
            <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
              {candidate.party}
            </span>
            <h2 className="text-4xl font-bold mt-2">{candidate.name}</h2>
            <p className="text-lg text-gray-600 mt-1">{candidate.electoralDistrict} / {candidate.age}歳</p>
            <p className="text-2xl mt-4 text-gray-800">
              「{candidate.catchphrase}」
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <h3 className="text-2xl font-bold mb-4">主な公約</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>経済成長を促進し、国民の所得を向上させます。</li>
            <li>子育て支援を拡充し、安心して子供を育てられる社会を実現します。</li>
            <li>再生可能エネルギーへの転換を進め、環境問題に取り組みます。</li>
            <li>外交・安全保障を強化し、国民の安全を守ります。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}