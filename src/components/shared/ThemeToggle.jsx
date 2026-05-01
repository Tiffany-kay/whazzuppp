import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isNight = theme === "night";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isNight ? "day" : "night"} mode`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 text-ink transition-all hover:-translate-y-0.5 hover:border-ink/60"
    >
      {isNight ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
