// src/app/national-election/page.tsx

import CandidateCard from "@/components/CandidateCard";
import { DUMMY_CANDIDATES } from "@/lib/dummy-data";

export default function NationalElectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
        国政選挙 候補者一覧
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* ダミーデータをもとに候補者カードを一覧表示 */}
        {DUMMY_CANDIDATES.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}