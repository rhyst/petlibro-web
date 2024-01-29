"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

import { TokenExpiredEvent } from "@/api";
import { useStore } from "@/store";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Text from "@/components/Text";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const path = usePathname();
  const isLogin = path === "/login";

  useEffect(() => {
    if (!user && !isLogin) {
      router.push("/login");
    }
    if (user && isLogin) {
      router.push("/");
    }
  }, [user, isLogin, router]);

  useEffect(() => {
    const listener = () => {
      logout();
      router.push("/login");
    };
    document.addEventListener(TokenExpiredEvent, listener);
    return () => document.removeEventListener(TokenExpiredEvent, listener);
  }, [logout, router]);

  return (
    <>
      <header>
        <div className="flex items-center justify-between py-2 px-8">
          <Text size="large">Unofficial Petlibro Web App</Text>
          {user ? (
            <div className="flex items-center">
              <>
                <p className="px-2">{user.nickname || user.email}</p>
                <Button variant="transparent" onClick={logout}>Logout</Button>
              </>
            </div>
          ) : null}
        </div>
        {!isLogin ? (
          <div className="flex items-center justify-between py-2 px-8 border-y">
            <Breadcrumbs
              homeElement={"Home"}
              separator={<span className="mx-2"> | </span>}
              activeClasses=""
              containerClasses="flex"
              listClasses="hover:underline font-bold"
              capitalizeLinks
            />
          </div>
        ) : null}
      </header>
      <main className="flex min-h-screen flex-col px-8 pt-2">{children}</main>
      <div id="modal-root"></div>
    </>
  );
}
