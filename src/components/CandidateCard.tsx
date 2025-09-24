// src/components/CandidateCard.tsx

import Image from "next/image";
import { Candidate } from "@/types/candidate";
import Link from "next/link"; // Linkをインポート

type Props = {
  candidate: Candidate;
};

export default function CandidateCard({ candidate }: Props) {
  return (
    // Linkコンポーネントでカード全体を囲む
    <Link href={`/candidates/${candidate.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform hover:-translate-y-1 transition-transform duration-300">
        <div className="p-6">
          <div className="flex items-start">
            <Image
              src={candidate.imageUrl}
              alt={candidate.name}
              width={80}
              height={80}
              className="rounded-md mr-4"
            />
            <div>
              <div className="flex items-baseline">
                <span className="inline-block bg-blue-500 text-white text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                  {candidate.party}
                </span>
              </div>
              <h3 className="text-2xl font-bold mt-1">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.electoralDistrict} / {candidate.age}歳</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            「{candidate.catchphrase}」
          </p>
        </div>
      </div>
    </Link>
  );
}