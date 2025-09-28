import { db } from "../lib/db";
import { v4 as uuid } from "uuid";

// Clear existing algorithms
db.prepare("DELETE FROM user_algorithms").run();
db.prepare("DELETE FROM algorithms").run();

const algorithms = [
  // --- F2L One-Look Examples ---
  {
    name: "F2L Case 1",
    moves: "U R U' R'",
    description: "Standard F2L insertion case",
    category: "F2L",
  },
  {
    name: "F2L Case 2",
    moves: "U' L' U L",
    description: "Inverse F2L insertion case",
    category: "F2L",
  },
  {
    name: "F2L Case 3",
    moves: "R U2 R' U'",
    description: "Corner-edge pair insertion",
    category: "F2L",
  },

  // --- OLL One-Look Examples ---
  {
    name: "Sune",
    moves: "R U R' U R U2 R'",
    description: "Orient all corners with a Sune pattern",
    category: "OLL",
  },
  {
    name: "Anti-Sune",
    moves: "R' U' R U' R' U2 R",
    description: "Inverse of Sune",
    category: "OLL",
  },
  {
    name: "Headlights",
    moves: "R2 D R' U2 R D' R' U2 R'",
    description: "OLL case with headlights",
    category: "OLL",
  },

  // --- PLL One-Look Examples ---
  {
    name: "T Perm",
    moves: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: "Swaps two corners and two edges",
    category: "PLL",
  },
  {
    name: "J Perm",
    moves: "L' U' L F L' U' L U L F' L2 U L U",
    description: "Swaps two corners and two edges differently than T Perm",
    category: "PLL",
  },
  {
    name: "Y Perm",
    moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    description: "Swaps two corners and two edges in a Y shape",
    category: "PLL",
  },
  {
    name: "R Perm",
    moves: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: "Edge and corner swap",
    category: "PLL",
  },
];

const insert = db.prepare(`
  INSERT INTO algorithms (id, name, moves, category, description)
  VALUES (@id, @name, @moves, @category, @description)
`);

for (const algo of algorithms) {
  insert.run({ id: uuid(), ...algo });
}

console.log("Seeded algorithms!");
