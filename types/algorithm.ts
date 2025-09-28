export type AlgorithmCategory = "OLL" | "PLL" | "F2L" | "Other";

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  moves: string;
  description: string;
}

export interface AlgorithmWithStatus {
  algorithm_id: string;
  name: string;
  category: string;
  status: string;
  reps: number;
  moves: string;
  description: string;
  pb_ms: number;
}
