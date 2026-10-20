"use client";

import { useEffect, useState } from "react";

const sessionKey = "iso100shots:visitor-counted";

type VisitorCountResponse = {
  count: number | null;
  configured: boolean;
};

function formatCount(count: number) {
  return new Intl.NumberFormat("en-IN").format(count);
}

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function updateCount() {
      const hasCountedThisSession = sessionStorage.getItem(sessionKey) === "true";
      const response = await fetch("/api/visitor-count", {
        method: hasCountedThisSession ? "GET" : "POST",
        cache: "no-store"
      });

      if (!response.ok) return;

      const data = (await response.json()) as VisitorCountResponse;

      if (!data.configured || typeof data.count !== "number") {
        if (isMounted) setIsAvailable(false);
        return;
      }

      if (!hasCountedThisSession) {
        sessionStorage.setItem(sessionKey, "true");
      }

      if (isMounted) {
        setCount(data.count);
      }
    }

    updateCount().catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isAvailable) {
    return <span className="block text-white/32 sm:inline">Visits --</span>;
  }

  if (count === null) {
    return <span className="block text-white/32 sm:inline">Visits ...</span>;
  }

  return (
    <span className="block text-white/32 sm:inline">
      Visits {formatCount(count)}
    </span>
  );
}
