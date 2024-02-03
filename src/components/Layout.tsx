import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { TokenExpiredEvent } from "@/api";
import { useStore } from "@/store";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Text from "@/components/Text";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ready = useStore((state) => state.ready);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const isLogin = location.pathname === "/login";

  useEffect(() => {
    if (!user && !isLogin) {
      navigate("/login");
    }
    if (user && isLogin) {
      navigate("/");
    }
  }, [user, isLogin, navigate]);

  useEffect(() => {
    const listener = () => {
      logout();
      navigate("/login");
    };
    document.addEventListener(TokenExpiredEvent, listener);
    return () => document.removeEventListener(TokenExpiredEvent, listener);
  }, [logout, navigate]);

  return (
    <>
      <header>
        <div className="flex items-center justify-between py-2 px-8">
          <Text size="large" className="font-bold">
            Unofficial Petlibro Web App
          </Text>
          {user ? (
            <div className="flex items-center">
              <>
                <p className="px-2">{user.nickname || user.email}</p>
                <Button variant="transparent" onClick={logout}>
                  Logout
                </Button>
              </>
            </div>
          ) : null}
        </div>
        {!isLogin ? (
          <div className="flex items-center justify-between py-2 px-8 border-y border-black dark:border-white">
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
      <main className="flex min-h-screen flex-col px-8 pt-2">
        {ready ? <Outlet /> : <Text>Loading...</Text>}
      </main>
      <div id="modal-root"></div>
    </>
  );
};

export default Layout;
