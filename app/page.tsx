"use client";
import React from "react";
import { ArcChart } from "./components/ArcChart";

export default function Home() {
  return (
    <main className="flex flex-col justify-center relative items-center h-screen">
      <div className="w-64">
        <ArcChart percent={[0.2, 0.6, 0.1]} background={0.42} />
      </div>
    </main>
  );
}
