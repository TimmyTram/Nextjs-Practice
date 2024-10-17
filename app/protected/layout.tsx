"use client";

import { SessionProvider } from 'next-auth/react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  // should wrap SessionProvider around pages that require authentication?
  return (
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
  );
}