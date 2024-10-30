import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";

// - lazy loading refactor, remove eager loading of page
// import BlogPage, { loader as postsLoader } from './pages/Blog';
// import PostPage, { loader as postLoader } from "./pages/Post";

// - lazy loading refactor
import { lazy, Suspense } from "react";

const BlogPage = lazy(() => import("./pages/Blog"));
const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader }, // before lazy loading
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading blog page...</p>}>
                <BlogPage />
              </Suspense>
            ), // - before lazy loading, element: <BlogPage />
            loader: () =>
              import("./pages/Blog").then((loadedModule) =>
                loadedModule.loader()
              ),
          }, // dyanmically, only when it's needed
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading post...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import("./pages/Post").then((loadedModule) =>
                loadedModule.loader(meta)
              ),
          }, // - loader: postLoader
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
