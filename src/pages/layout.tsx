"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

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

  return (
    <>
      <header>
        <div className="flex items-center justify-between py-2 px-8 dark:bg-slate-600">
          <Text size="large">Unofficial Petlibro Web App</Text>
          {user ? (
            <div className="flex items-center">
              <>
                <p className="px-2">{user.nickname || user.email}</p>
                <Button onClick={logout}>Logout</Button>
              </>
            </div>
          ) : null}
        </div>
        {!isLogin ? (
          <div className="flex items-center justify-between py-6 px-8">
            <Breadcrumbs
              homeElement={"Home"}
              separator={<span className="mx-2"> | </span>}
              activeClasses="text-amber-500"
              containerClasses="flex"
              listClasses="hover:underline font-bold"
              capitalizeLinks
            />
          </div>
        ) : null}
      </header>
      <main className="flex min-h-screen flex-col px-8">{children}</main>
    </>
  );
}
