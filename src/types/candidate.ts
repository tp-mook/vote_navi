// src/types/candidate.ts

export type Scandal = {
    date: string;
    title: string;
    source: string;
    description: string;
  };
  
  export type Candidate = {
    id: string;
    name: string;
    party: string;
    age: number;
    electoralDistrict: string;
    catchphrase: string;
    imageUrl: string;
    scandals?: Scandal[];
    pledges?: string[]; // ▼▼▼ この行を追加 ▼▼▼
  };