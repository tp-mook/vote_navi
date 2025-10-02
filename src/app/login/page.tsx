// src/app/login/page.tsx

"use client";

import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs'; // ▼▼▼ 変更点 ▼▼▼

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      console.error(err);
      setError("メールアドレスまたはパスワードが間違っています。");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ▼▼▼ 変更点 ▼▼▼ */}
      <Breadcrumbs items={[{ label: "トップページ", href: "/" }, { label: "管理者ログイン" }]} />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
        {/* ▼▼▼ 変更点 ▼▼▼ */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">管理者ログイン</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              パスワード
            </label>
            <input
              className="text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}