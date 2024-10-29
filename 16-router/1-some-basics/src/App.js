import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./components/RootLayout";
import Error from "./pages/Error";
import ProductDeatail from "./pages/ProductDetail";

// alternative way to define routes
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={<Home />} />
//     <Route path='/products' element={<Products />} />
//   </Route>
// );
// const theRouter = createBrowserRouter(routeDefinitions);

// define routes, object based
const theRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      // { path: "/", element: <Home /> },
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/product-details/:id", element: <ProductDeatail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={theRouter}></RouterProvider>;
}

export default App;
