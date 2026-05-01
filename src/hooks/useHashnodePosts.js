import { useEffect, useState } from "react";
import { fetchHashnodePosts } from "@/lib/hashnode";

export function useHashnodePosts(username) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    setStatus("loading");
    fetchHashnodePosts(username).then((p) => {
      if (cancelled) return;
      setPosts(p);
      setStatus(p.length ? "ready" : "empty");
    });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { posts, status };
}
