"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToArchive() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/report/archive/v2/new");
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-accent-blue border-t-transparent mb-8" />
        <p className="text-text-secondary">Redirecting...</p>
      </div>
    </div>
  );
}
