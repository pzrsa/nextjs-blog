import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? (
          <MdOutlineLightMode />
        ) : (
          <MdOutlineDarkMode />
        )}
      </button>
    </div>
  );
};

export default ThemeChanger;
