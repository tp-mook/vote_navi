// src/app/candidates/[id]/page.tsx

import { DUMMY_CANDIDATES } from "@/lib/dummy-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default function CandidateDetailPage({ params }: Props) {
  const candidateId = parseInt(params.id, 10);
  const candidate = DUMMY_CANDIDATES.find((c) => c.id === candidateId);

  // もし該当するIDの候補者が見つからなければ404ページを表示
  if (!candidate) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずリスト */}
      <div className="mb-6 text-sm">
        <Link href="/national-election" className="text-blue-600 hover:underline">
          候補者一覧
        </Link>
        <span className="mx-2">&gt;</span>
        <span>{candidate.name}</span>
      </div>

      {/* 候補者詳細情報 */}
      <div className="bg-white p-8 rounded-lg shadow-md">
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

        {/* 公約・マニフェスト */}
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