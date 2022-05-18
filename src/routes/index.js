import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import MainLayout from '../layouts/MainLayout';
import ProfilePage from '../pages/account/ProfilePage';
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
import CheckoutCompletedPage from '../pages/CheckoutCompletedPage';
import SearchPage from '../pages/SearchPage';

function Router() {
    return (
        <Routes>
            <Route path="/"
                element={
                    <InitRequire>
                        <MainLayout />
                    </InitRequire>
                }
            >
                <Route index element={<HomePage />} />
                <Route path="/products/categories/:category" element={<CategoryPage />} />
                <Route path="/products/:id" element={<DetailPage />} />
            </Route>

            <Route element={
                <AuthRequire>
                    <MainLayout />
                </AuthRequire>
            } >
                <Route path="/user/account/profile" element={<ProfilePage />} />
                <Route path="/user/purchase" element={<PurchasePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            <Route element={<BlankLayout />} >
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/checkout/completed" element={<CheckoutCompletedPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default Router;