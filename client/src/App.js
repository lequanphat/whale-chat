import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SetAvatar from './pages/SetAvatar';
import Home from './pages/Home';
import MainLayout from './components/layouts/MainLayout';
import Profile from './pages/Profile';
import AiChat from './pages/AiChat';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Temp from './pages/errors/Temp';
import useAutoLogin from './hooks/useAutoLogin';

function App() {
    const loading = useAutoLogin();
    return loading ? (
        <h1>123</h1>
    ) : (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/set-avatar/:id" element={<SetAvatar />} />
                <Route
                    path="/profile"
                    element={
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    }
                />
                <Route
                    path="/temp"
                    element={
                        <MainLayout>
                            <Temp />
                        </MainLayout>
                    }
                />
                <Route
                    path="/ai-chat"
                    element={
                        <MainLayout>
                            <AiChat />
                        </MainLayout>
                    }
                />
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <MainLayout>
                            <Temp
                                image={'../skeleton.gif'}
                                title={'Page not found'}
                                content={'What do you want to find here? Come back now.'}
                            />
                        </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
