// src/app/candidates/[id]/page.tsx

import Breadcrumbs from "@/components/Breadcrumbs";
import { Candidate } from "@/types/candidate";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

async function fetchCandidateFromAPI(id: string): Promise<Candidate | null> {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/candidates/${id}`, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch candidate');
  }

  return response.json();
}

export default async function CandidateDetailPage({ params }: Props) {
  const candidate = await fetchCandidateFromAPI(params.id);

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
            <h2 className="text-4xl font-bold mt-2 text-gray-900">{candidate.name}</h2>
            <p className="text-lg text-gray-600 mt-1">{candidate.electoralDistrict} / {candidate.age}歳</p>
            <p className="text-2xl mt-4 text-gray-800">
              「{candidate.catchphrase}」
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">主な公約</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {candidate.pledges && candidate.pledges.length > 0 ? (
              candidate.pledges.map((pledge, index) => (
                <li key={index}>{pledge}</li>
              ))
            ) : (
              <li>公約は現在準備中です。</li>
            )}
          </ul>
        </div>

        {/* ▼▼▼ ここから追加 ▼▼▼ */}
        {/* scandalsデータが存在し、かつ1件以上ある場合のみこのセクションを表示 */}
        {candidate.scandals && candidate.scandals.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">過去の不祥事・問題発言</h3>
            <div className="space-y-4">
              {candidate.scandals.map((scandal, index) => (
                <div key={index} className="p-4 border-l-4 border-red-500 bg-red-50">
                  <p className="font-semibold text-gray-800">{scandal.date}: {scandal.title}</p>
                  <p className="text-gray-700 mt-1">{scandal.description}</p>
                  <a href={scandal.source} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                    情報源を確認
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* ▲▲▲ ここまで ▲▲▲ */}

      </div>
    </div>
  );
}