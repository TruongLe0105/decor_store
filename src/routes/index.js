import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import MainLayout from '../layouts/MainLayout';
import AccountPage from '../pages/AccountPage';
import ProfilePage from '../pages/ProfilePage';
import ProductsPage from '../pages/ProductsPage';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import AuthRequire from './AuthRequire';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<AuthRequire>
                <MainLayout />
            </AuthRequire>}>
                <Route index element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<DetailPage />} />
                {/* <Route path="/user/account" element={<AccountPage />} /> */}
                <Route path="/user/profile/account" element={<ProfilePage />} />
            </Route>
            <Route element={<BlankLayout />} >
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default Router;