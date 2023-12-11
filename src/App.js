import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css';
import Home from './pages/Home';
import Order from './pages/Order';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Staff from './pages/Staff';
import Admin from './pages/Admin';
import PageNotFound from './pages/PageNotFound';
import Orders from './pages/Orders';


import FoodState from './Context/food'
import UserState from './Context/user';
import OrderState from './Context/order';


function App() {
  return (
    <>
      <OrderState>
        <UserState>
          <FoodState>
            <BrowserRouter>
              <Routes>
                <Route path="/:tableno" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/admin/:page" element={<Admin />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </FoodState>
        </UserState>
      </OrderState>
    </>
  );
}

export default App;
