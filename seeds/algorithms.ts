import { db } from "../lib/db";
import { v4 as uuid } from "uuid";

// Clear existing algorithms
db.prepare("DELETE FROM algorithms").run();

// Seed some PLL algorithms
const algorithms = [
  {
    name: "T Perm",
    moves: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: "Swaps two corners and two edges",
  },
  {
    name: "J Perm",
    moves: "L' U' L F L' U' L U L F' L2 U L U",
    description:
      "Swaps two corners and two edges in a different way than T Perm",
  },
];

const insert = db.prepare(`
  INSERT INTO algorithms (id, name, moves, description)
  VALUES (@id, @name, @moves, @description)
`);

for (const algo of algorithms) {
  insert.run({ id: uuid(), ...algo });
}

console.log("Seeded algorithms!");
