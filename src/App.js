import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import Categories from './components/Categories/Categories';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/TokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.1';
import Details from './components/Details/Details';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';
import Wishlist from './components/wishlist/wishlist';
import SpecificCategory from './components/specific-category/specific-category';
import SpecificBrand from './components/SpecificBrand/SpecificBrand';
import UpDatePassword from './components/UpDatePassword/UpDatePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetCode from './components/ResetCode/ResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword';

let routers = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    { index: true, element: <ProtectedRoutes><Home/></ProtectedRoutes> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'products', element: <ProtectedRoutes><Products/></ProtectedRoutes> },
    { path: 'cart', element: <ProtectedRoutes><Cart/></ProtectedRoutes> },
    { path: 'categories', element: <ProtectedRoutes><Categories/></ProtectedRoutes> },
    { path: 'brands', element: <ProtectedRoutes><Brands/></ProtectedRoutes> },
    { path: 'details/:id', element: <ProtectedRoutes><Details/></ProtectedRoutes> },
    { path: 'specific-category/:id', element: <ProtectedRoutes><SpecificCategory/></ProtectedRoutes> },
    { path: 'specificbrand/:id', element: <ProtectedRoutes><SpecificBrand/></ProtectedRoutes> },
    { path: 'updatepassword', element: <ProtectedRoutes><UpDatePassword/></ProtectedRoutes> },
    { path: 'forgotpassword', element: <ForgotPassword /> },
    { path: 'resetcode', element: <ResetCode /> },
    { path: 'resetpassword', element: <ResetPassword /> },
    { path: 'checkout', element: <ProtectedRoutes><Checkout/></ProtectedRoutes> },
    { path: 'allorders', element: <ProtectedRoutes><AllOrders/></ProtectedRoutes> },
    { path: "wishlist", element: <ProtectedRoutes> <Wishlist /> </ProtectedRoutes> },
    { path: '*', element: <Notfound /> }
  ]}
]);

function App() {
  let {setToken} = useContext(tokenContext);
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'));
    }
  }, []);
  
  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>;
}

export default App;
