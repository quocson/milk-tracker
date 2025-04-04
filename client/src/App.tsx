import React from 'react';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import Header from './components/Header';
import Layout from './components/Layout';
import Home from './pages/Home';
import Report from './pages/Report';
import EntryDetail from './pages/EntryDetail';
import Settings from './pages/Settings';

const App = () => {
    return (
        <HashRouter>
            <Header />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/entry/:id" element={<EntryDetail />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

export default App;
