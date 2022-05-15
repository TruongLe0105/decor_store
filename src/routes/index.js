import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import MainLayout from '../layouts/MainLayout';
import ProfilePage from '../pages/account/ProfilePage';
import Ppage from '../pages/account/Ppage';
import CategoryPage from '../pages/CategoryPage';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import AuthRequire from './AuthRequire';
import InitRequire from './InitRequire';
import CheckoutPage from '../pages/CheckoutPage';
import PurchasePage from '../pages/account/PurchasePage';

function Router() {
    return (
        <Routes>
            <Route element={
                <AuthRequire>
                    <MainLayout />
                </AuthRequire>
            } >
                {/* <Route path="/user/account/profile" element={<ProfilePage />} /> */}
                <Route path="/user/account/profile" element={<Ppage />} />
                <Route path="/user/purchase" element={<PurchasePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            <Route path="/" element={
                <InitRequire>
                    <MainLayout />
                </InitRequire>
            }>
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