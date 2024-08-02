import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login/Login';
import Navbar from '../src/components/Navbar/Navbar'
import Admin from './pages/Admin/Admin';
import Sidebar from './components/Sidebar/Sidebar';
import AddProduct from './components/AddProduct/AddProduct'
import ListProduct from './components/ListProduct/ListProduct'
import Orders from './components/Orders/Orders';


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        // Set authentication state to true when login is successful
        setIsAuthenticated(true);
    };
    const handleLogout = () => {
        // Set authentication state to true when login is successful
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Navbar OnLogOut={handleLogout} /> {/* Navbar should be outside Routes */}
            <div>
                <Routes>
                    {/* Authenticated Routes */}
                    {isAuthenticated && (
                        <Route path="/" element={<Admin />}> 
                            <Route index element={<Sidebar />} /> {/* This will render the Sidebar component on the initial "/" route */}  
                            <Route path="/add_product" element={<AddProduct />} />  
                            <Route path="/all_products" element={<ListProduct />} />
                            <Route path="/view_order" element={<Orders />} />
                        </Route>
                    )}
                    {/* UnAuthenticated Route (Login) */}
                    {!isAuthenticated && (
                        <Route path="/" element={<Login onLogin={handleLogin} />} />
                    )}
                </Routes>
            </div>
        </Router>  
    );
};


export default App;
