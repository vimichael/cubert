"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rendering theme-dependent UI until mounted
    return <button className="btn btn-sm btn-circle"></button>;
  }

  return (
    <button
      onClick={() => setTheme(theme == "silk" ? "business" : "silk")}
      className="btn btn-sm btn-circle"
    >
      {theme == "silk" ? (
        <Image
          src="/light_mode.svg"
          width="24"
          height="24"
          alt="light mode"
        ></Image>
      ) : (
        <Image
          src="/dark_mode.svg"
          width="24"
          height="24"
          alt="dark mode"
        ></Image>
      )}
    </button>
  );
};

export default ThemeToggle;
