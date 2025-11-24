"use client";

import ChatWidget from "../components/ChatWidget";
import AOSProvider from "./AOSProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AOSProvider>
      {children}
      <ChatWidget />
    </AOSProvider>
  );
}
