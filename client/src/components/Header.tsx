import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isOnline, toggleOnlineMode } = useAppContext();
        
    return (
        <header className="bg-white shadow-soft font-round">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-3xl">🍼</span>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Milk Tracker
                        </h1>
                    </Link>
                    
                    {/* Online/Offline Toggle */}
                    <div className="flex items-center">
                        <button
                            onClick={toggleOnlineMode}
                            className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                isOnline 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }`}
                        >
                            <div className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            {isOnline ? 'Online' : 'Offline'}
                            {!isOnline && (
                                <span className="ml-2 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">!</span>
                            )}
                        </button>
                    </div>
                    
                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        {menuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                    
                    {/* Desktop navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            <li>
                                <Link 
                                    to="/" 
                                    className="text-gray-600 hover:text-primary transition-colors flex items-center"
                                >
                                    <span className="mr-1">🏠</span> Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/report" 
                                    className="text-gray-600 hover:text-primary transition-colors flex items-center"
                                >
                                    <span className="mr-1">📊</span> Report
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/settings" 
                                    className="text-gray-600 hover:text-primary transition-colors flex items-center"
                                >
                                    <span className="mr-1">⚙️</span> Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                {/* Mobile navigation */}
                {menuOpen && (
                    <nav className="md:hidden py-4 pb-6">
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    to="/" 
                                    className="text-gray-600 hover:text-primary transition-colors flex items-center"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span className="mr-2">🏠</span> Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/report" 
                                    className="text-gray-600 hover:text-primary transition-colors flex items-center"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span className="mr-2">📊</span> Report
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/settings" 
                                    className="text-gray-600 hover:text-primary transition-colors flex items-center"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span className="mr-2">⚙️</span> Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;