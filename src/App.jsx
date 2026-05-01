import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/hooks/useTheme";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";
import NotFound from "@/pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

// Strip trailing slash so basename works in dev ("/") and prod ("/whazzuppp")
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={BASENAME}>
        <AnimatedRoutes />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgb(var(--surface))",
              color: "rgb(var(--ink))",
              border: "1px solid rgb(var(--border))",
            },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
