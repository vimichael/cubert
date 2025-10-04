import { db } from "../lib/db";
import { v4 as uuid } from "uuid";

export const seedFn = () => {
  // Clear existing algorithms
  db.prepare("DELETE FROM user_algorithms").run();
  db.prepare("DELETE FROM algorithms").run();

  const algorithms = [
    // --- F2L One-Look Examples ---
    {
      name: "1",
      moves: "U R U' R'",
      description: "Basics",
      category: "F2L",
    },
    {
      name: "2",
      moves: "U' (F' U F)",
      description: "Basics",
      category: "F2L",
    },
    {
      name: "3",
      moves: "F' U' F",
      description: "Basics",
      category: "F2L",
    },
    {
      name: "4",
      moves: "R U R'",
      description: "Basics",
      category: "F2L",
    },

    // --- OLL One-Look Examples ---
    {
      name: "1",
      moves: "R U2 R2 F R F' U2 R' F R F'",
      description: "Dot",
      category: "OLL",
    },
    {
      name: "2",
      moves: "r U r' U2 r U2 R' U2 R U' r'",
      description: "Dot",
      category: "OLL",
    },
    {
      name: "3",
      moves: "r' R2 U R' U r U2 r' U M'",
      description: "Dot",
      category: "OLL",
    },
    {
      name: "4",
      moves: "M U' r U2 r' U' R U' R' M'",
      description: "Dot",
      category: "OLL",
    },
    {
      name: "5",
      moves: "l' U2 L U L' U l",
      description: "Square Shape",
      category: "OLL",
    },
    {
      name: "6",
      moves: "r U2 R' U' R U' r'",
      description: "Square Shape",
      category: "OLL",
    },
    {
      name: "7",
      moves: "r U R' U R U2 r'",
      description: "Small Lightning Bolt",
      category: "OLL",
    },
    {
      name: "8",
      moves: "l' U' L U' L' U2 l",
      description: "Small Lightning Bolt",
      category: "OLL",
    },
    {
      name: "9",
      moves: "R U R' U' R' F R2 U R' U' F'",
      description: "Fish Shape",
      category: "OLL",
    },
    {
      name: "10",
      moves: "R U R' U R' F R F' R U2 R'",
      description: "Fish Shape",
      category: "OLL",
    },
    {
      name: "11",
      moves: "r U R' U R' F R F' R U2 r'",
      description: "Small Lightning Bolt",
      category: "OLL",
    },
    {
      name: "12",
      moves: "M' R' U' R U' R' U2 R U' R r'",
      description: "Small Lightning Bolt",
      category: "OLL",
    },
    {
      name: "13",
      moves: "F U R U' R2 F' R U R U' R'",
      description: "Knight Move Shape",
      category: "OLL",
    },
    {
      name: "14",
      moves: "R' F R U R' F' R F U' F'",
      description: "Knight Move Shape",
      category: "OLL",
    },
    {
      name: "15",
      moves: "l' U' l L' U' L U l' U l",
      description: "Knight Move Shape",
      category: "OLL",
    },
    {
      name: "16",
      moves: "r U r' R U R' U' r U' r'",
      description: "Knight Move Shape",
      category: "OLL",
    },
    {
      name: "17",
      moves: "F R' F' R2 r' U R U' R' U' M'",
      description: "Dot",
      category: "OLL",
    },
    {
      name: "18",
      moves: "r U R' U R U2 r2 U' R U' R' U2 r",
      description: "Dot",
      category: "OLL",
    },
    {
      name: "19",
      moves: "r' R U R U R' U' M' R' F R F'",
      description: "Dot",
      category: "OLL",
    },
    {
      name: "20",
      moves: "r U R' U' M2 U R U' R' U' M'",
      description: "Dot",
      category: "OLL",
    },
    {
      name: "21",
      moves: "R U2 R' U' R U R' U' R U' R'",
      description: "Cross",
      category: "OLL",
    },
    {
      name: "22",
      moves: "R U2 R2 U' R2 U' R2 U2 R",
      description: "Cross",
      category: "OLL",
    },
    {
      name: "23",
      moves: "R2 D' R U2 R' D R U2 R",
      description: "Cross",
      category: "OLL",
    },
    {
      name: "24",
      moves: "r U R' U' r' F R F'",
      description: "Cross",
      category: "OLL",
    },
    {
      name: "25",
      moves: "F' r U R' U' r' F R",
      description: "Cross",
      category: "OLL",
    },
    {
      name: "26",
      moves: "R U2 R' U' R U' R'",
      description: "Cross",
      category: "OLL",
    },
    {
      name: "27",
      moves: "R U R' U R U2 R'",
      description: "Cross",
      category: "OLL",
    },
    {
      name: "28",
      moves: "r U R' U' r' R U R U' R'",
      description: "Corners Oriented",
      category: "OLL",
    },
    {
      name: "29",
      moves: "R U R' U' R U' R' F' U' F R U R'",
      description: "Awkward Shape",
      category: "OLL",
    },
    {
      name: "30",
      moves: "F R' F R2 U' R' U' R U R' F2",
      description: "Awkward Shape",
      category: "OLL",
    },
    {
      name: "31",
      moves: "R' U' F U R U' R' F' R",
      description: "P Shape",
      category: "OLL",
    },
    {
      name: "32",
      moves: "L U F' U' L' U L F L'",
      description: "P Shape",
      category: "OLL",
    },
    {
      name: "33",
      moves: "R U R' U' R' F R F'",
      description: "T Shape",
      category: "OLL",
    },
    {
      name: "34",
      moves: "R U R2 U' R' F R U R U' F'",
      description: "C Shape",
      category: "OLL",
    },
    {
      name: "35",
      moves: "R U2 R2 F R F' R U2 R'",
      description: "Fish Shape",
      category: "OLL",
    },
    {
      name: "36",
      moves: "L' U' L U' L' U L U L F' L' F",
      description: "W Shape",
      category: "OLL",
    },
    {
      name: "37",
      moves: "F R' F' R U R U' R'",
      description: "Fish Shape",
      category: "OLL",
    },
    {
      name: "38",
      moves: "R U R' U R U' R' U' R' F R F'",
      description: "W Shape",
      category: "OLL",
    },
    {
      name: "39",
      moves: "L F' L' U' L U F U' L'",
      description: "Big Lightning Bolt",
      category: "OLL",
    },
    {
      name: "40",
      moves: "R' F R U R' U' F' U R",
      description: "Big Lightning Bolt",
      category: "OLL",
    },
    {
      name: "41",
      moves: "R U R' U R U2 R' F R U R' U' F'",
      description: "Awkward Shape",
      category: "OLL",
    },
    {
      name: "42",
      moves: "R' U' R U' R' U2 R F R U R' U' F'",
      description: "Awkward Shape",
      category: "OLL",
    },
    {
      name: "43",
      moves: "F' U' L' U L F",
      description: "P Shape",
      category: "OLL",
    },
    {
      name: "44",
      moves: "F U R U' R' F'",
      description: "P Shape",
      category: "OLL",
    },
    {
      name: "45",
      moves: "F R U R' U' F'",
      description: "T Shape",
      category: "OLL",
    },
    {
      name: "46",
      moves: "R' U' R' F R F' U R",
      description: "C Shape",
      category: "OLL",
    },
    {
      name: "47",
      moves: "R' U' R' F R F' R' F R F' U R",
      description: "Small L Shape",
      category: "OLL",
    },
    {
      name: "48",
      moves: "F R U R' U' R U R' U' F'",
      description: "Small L Shape",
      category: "OLL",
    },
    {
      name: "49",
      moves: "r U' r2 U r2 U r2 U' r",
      description: "Small L Shape",
      category: "OLL",
    },
    {
      name: "50",
      moves: "r' U r2 U' r2 U' r2 U r'",
      description: "Small L Shape",
      category: "OLL",
    },
    {
      name: "51",
      moves: "F U R U' R' U R U' R' F'",
      description: "I Shape",
      category: "OLL",
    },
    {
      name: "52",
      moves: "R U R' U R U' B U' B' R'",
      description: "I Shape",
      category: "OLL",
    },
    {
      name: "53",
      moves: "l' U2 L U L' U' L U L' U l",
      description: "Small L Shape",
      category: "OLL",
    },
    {
      name: "54",
      moves: "r U2 R' U' R U R' U' R U' r'",
      description: "Small L Shape",
      category: "OLL",
    },
    {
      name: "55",
      moves: "R' F R U R U' R2 F' R2 U' R' U R U R'",
      description: "I Shape",
      category: "OLL",
    },
    {
      name: "56",
      moves: "r' U' r U' R' U R U' R' U R r' U r",
      description: "I Shape",
      category: "OLL",
    },
    {
      name: "57",
      moves: "R U R' U' M' U R U' r'",
      description: "Corners Oriented",
      category: "OLL",
    },

    // --- PLL One-Look Examples ---
    {
      name: "Aa",
      moves: "x L2 D2 L' U' L D2 L' U L'",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Ab",
      moves: "x' L2 D2 L U L' D2 L U' L",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "E",
      moves: "x' L' U L D' L' U' L D L' U' L D' L' U L D",
      description: "Diagonal Corner Swap",
      category: "PLL",
    },
    {
      name: "F",
      moves: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Ga",
      moves: "R2 U R' U R' U' R U' R2 U' D R' U R D'",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Gb",
      moves: "R' U' R U D' R2 U R' U R U' R U' R2 D",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Gc",
      moves: "R2 U' R U' R U R' U R2 U D' R U' R' D",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Gd",
      moves: "R U R' U' D R2 U' R U' R' U R' U R2 D'",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "H",
      moves: "M2 U M2 U2 M2 U M2",
      description: "Edges Only",
      category: "PLL",
    },
    {
      name: "Ja",
      moves: "x R2 F R F' R U2 r' U r U2",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Jb",
      moves: "R U R' F' R U R' U' R' F R2 U' R'",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Na",
      moves: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
      description: "Diagonal Corner Swap",
      category: "PLL",
    },
    {
      name: "Nb",
      moves: "R' U R U' R' F' U' F R U R' F R' F' R U' R",
      description: "Diagonal Corner Swap",
      category: "PLL",
    },
    {
      name: "Ra",
      moves: "R U' R' U' R U R D R' U' R D' R' U2 R'",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Rb",
      moves: "R2 F R U R U' R' F' R U2 R' U2 R",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "T",
      moves: "R U R' U' R' F R2 U' R' U' R U R' F'",
      description: "Adjacent Corner Swap",
      category: "PLL",
    },
    {
      name: "Ua",
      moves: "M2 U M U2 M' U M2",
      description: "Edges Only",
      category: "PLL",
    },
    {
      name: "Ub",
      moves: "M2 U' M U2 M' U' M2",
      description: "Edges Only",
      category: "PLL",
    },
    {
      name: "V",
      moves: "R' U R' U' y R' F' R2 U' R' U R' F R F",
      description: "Diagonal Corner Swap",
      category: "PLL",
    },
    {
      name: "Y",
      moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
      description: "Diagonal Corner Swap",
      category: "PLL",
    },
    {
      name: "Z",
      moves: "M' U M2 U M2 U M' U2 M2",
      description: "Edges Only",
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
};
