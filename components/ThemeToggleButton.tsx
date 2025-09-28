"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme == "silk" ? "business" : "silk")}
      className="btn btn-sm"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
