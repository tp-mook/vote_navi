// src/components/Breadcrumbs.tsx

import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav className="mb-6 text-sm">
      <ol className="flex items-center space-x-2 text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <>
                <Link href={item.href} className="text-blue-600 hover:underline">
                  {item.label}
                </Link>
                <span className="mx-2">&gt;</span>
              </>
            ) : (
              <span className="font-semibold text-gray-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}