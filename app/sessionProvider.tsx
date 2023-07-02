"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children?: ReactNode;
}

export const NextAuthSessionProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};


