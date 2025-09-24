// src/lib/dummy-data.ts

import { Candidate } from "@/types/candidate";

// ダミーの候補者データ配列
export const DUMMY_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: "選挙 太郎",
    party: "みらい党",
    age: 45,
    electoralDistrict: "東京1区",
    catchphrase: "日本の未来を切り拓く！",
    imageUrl: "https://placehold.jp/150x150.png?text=候補者1",
  },
  {
    id: 2,
    name: "投票 花子",
    party: "国民の絆",
    age: 52,
    electoralDistrict: "大阪2区",
    catchphrase: "暮らしに安心と豊かさを。",
    imageUrl: "https://placehold.jp/150x150.png?text=候補者2",
  },
  {
    id: 3,
    name: "日本 次郎",
    party: "改革維新",
    age: 38,
    electoralDistrict: "神奈川3区",
    catchphrase: "古い政治を壊し、新しい日本へ。",
    imageUrl: "https://placehold.jp/150x150.png?text=候補者3",
  },
  {
    id: 4,
    name: "市民 さくら",
    party: "緑の党",
    age: 61,
    electoralDistrict: "北海道1区",
    catchphrase: "環境と平和を次世代に。",
    imageUrl: "https://placehold.jp/150x150.png?text=候補者4",
  },
];