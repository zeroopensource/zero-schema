"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("http://zerocn.zeroopensource.org/");
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">Redirecting</h2>
        </section>
      </div>
    </div>
  );
}
