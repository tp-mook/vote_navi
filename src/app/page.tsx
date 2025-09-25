// src/app/page.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [postalCode, setPostalCode] = useState("");

  const handleSearch = () => {
    if (postalCode) {
      router.push("/national-election");
    } else {
      alert("郵便番号を入力してください。");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {/* ... (h2, p, Linkタグ部分は変更なし) ... */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        あなたの一票を、もっと確かなものに。
      </h2>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        候補者の情報を見やすく整理し、あなたの意思決定をサポートします。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link href="/national-election" className="block p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-blue-600 mb-2">国政選挙</h3>
          <p className="text-gray-500">衆議院・参議院選挙の情報を確認する</p>
        </Link>
        <Link href="/local-election" className="block p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-green-600 mb-2">お住まいの地域の選挙</h3>
          <p className="text-gray-500">都道府県・市区町村の選挙情報を確認する</p>
        </Link>
      </div>

      {/* 郵便番号検索セクション */}
      <div className="mt-16">
        <label htmlFor="postal-code" className="block text-lg font-medium text-gray-700 mb-2">
          郵便番号で選挙区を検索
        </label>
        <div className="flex justify-center">
          <input
            type="text"
            id="postal-code"
            placeholder="例: 100-0014"
            // ▼▼▼ classNameの先頭に `text-gray-900` を追加 ▼▼▼
            className="text-gray-900 w-full max-w-xs px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-r-md hover:bg-gray-700"
            onClick={handleSearch}
          >
            検索
          </button>
        </div>
      </div>
    </div>
  );
}