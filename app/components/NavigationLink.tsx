"use client";

import Link from "next/link";
import { ReactNode } from "react";

type NavigationLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function NavigationLink({
  href,
  children,
  className = "",
}: NavigationLinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
