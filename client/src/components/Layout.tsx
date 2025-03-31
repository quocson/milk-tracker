import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-baby-blue/10 font-round">
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
            <footer className="bg-white shadow-soft-lg shadow-top py-6 border-t border-baby-blue/20">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <div className="flex items-center justify-center text-lg mb-2">
                        <span className="mx-1">🍼</span>
                        <span className="mx-1">👶</span>
                        <span className="mx-1">🧸</span>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Milk Tracker. Made with 💙 for parents.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;