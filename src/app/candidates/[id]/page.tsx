// src/app/candidates/[id]/page.tsx

import Breadcrumbs from "@/components/Breadcrumbs";
import { getCandidateById } from "@/lib/candidate-service";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function CandidateDetailPage({ params }: Props) {
  const candidate = await getCandidateById(params.id);

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
        {/* ... (以降の候補者詳細情報部分は変更なし) ... */}
      </div>
    </div>
  );
}