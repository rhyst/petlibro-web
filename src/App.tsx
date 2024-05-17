import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";

const pages = import.meta.glob("./pages/**/*.tsx", { eager: true }) as Record<
  string,
  {
    default: React.ComponentType<unknown>;
    ErrorBoundary?: React.ComponentType<unknown>;
  }
>;

const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const rootsWithLayout = [
  {
    element: <Layout />,
    children: routes.map(({ Element, ErrorBoundary, ...rest }) => ({
      ...rest,
      element: <Element />,
      ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    })),
  },
];

const router = createBrowserRouter(rootsWithLayout, {
  basename: import.meta.env.VITE_BASENAME || "/",
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
