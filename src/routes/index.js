import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import MainLayout from '../layouts/MainLayout';
import CartPage from '../pages/CartPage';
import ProfilePage from '../pages/account/ProfilePage';
import CategoryPage from '../pages/CategoryPage';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import AuthRequire from './AuthRequire';

function Router() {
    return (
        <Routes>
            <Route element={
                <AuthRequire>
                    <MainLayout />
                </AuthRequire>
            } >
                <Route path="/cart" element={<CartPage />} />
                <Route path="/user/account/profile" element={<ProfilePage />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/products/categories/:category" element={<CategoryPage />} />
                <Route path="/products/:id" element={<DetailPage />} />
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