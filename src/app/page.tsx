"use client";

import dynamic from "next/dynamic";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

const Header = dynamic(() => import("./_components/Header"), {
  ssr: false,
});

export default function Home() {
  const user = useKindeBrowserClient();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
