import React, { useState } from 'react';

const Settings: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [measurementUnit, setMeasurementUnit] = useState('ml');
    const [feedingAlerts, setFeedingAlerts] = useState(true);
    
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <span className="text-3xl">⚙️</span>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent">
                    Settings
                </h1>
            </div>
            
            <p className="text-gray-600">Configure your application preferences here.</p>
            
            <div className="grid gap-6 md:grid-cols-2">
                {/* Appearance Section */}
                <div className="bg-white shadow rounded-2xl p-6 border border-blue-200/20">
                    <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">🎨</span> Appearance
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="darkMode" className="flex items-center cursor-pointer">
                                <span className="text-gray-700">Dark Mode</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type="checkbox"
                                    id="darkMode"
                                    className="sr-only"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <div className={`block w-14 h-8 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${darkMode ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                                Color Theme
                            </label>
                            <select 
                                id="theme"
                                className="w-full rounded-xl border-blue-200/30 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-300/30 focus:ring-opacity-50"
                            >
                                <option>Baby Blue (Default)</option>
                                <option>Pink Dream</option>
                                <option>Mint Fresh</option>
                                <option>Lavender Calm</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Notifications Section */}
                <div className="bg-white shadow rounded-2xl p-6 border border-blue-200/20">
                    <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">🔔</span> Notifications
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="notifications" className="flex items-center cursor-pointer">
                                <span className="text-gray-700">Enable Notifications</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type="checkbox"
                                    id="notifications"
                                    className="sr-only"
                                    checked={notifications}
                                    onChange={() => setNotifications(!notifications)}
                                />
                                <div className={`block w-14 h-8 rounded-full ${notifications ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${notifications ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <label htmlFor="feedingAlerts" className="flex items-center cursor-pointer">
                                <span className="text-gray-700">Feeding Time Alerts</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type="checkbox"
                                    id="feedingAlerts"
                                    className="sr-only"
                                    checked={feedingAlerts}
                                    onChange={() => setFeedingAlerts(!feedingAlerts)}
                                />
                                <div className={`block w-14 h-8 rounded-full ${feedingAlerts ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${feedingAlerts ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Units & Format Section */}
                <div className="bg-white shadow rounded-2xl p-6 border border-blue-200/20">
                    <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">📏</span> Units & Format
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Volume Measurement
                            </label>
                            <div className="flex rounded-lg overflow-hidden border border-blue-200/30">
                                <button 
                                    className={`flex-1 py-2 ${measurementUnit === 'ml' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-700'}`}
                                    onClick={() => setMeasurementUnit('ml')}
                                >
                                    Milliliters (ml)
                                </button>
                                <button 
                                    className={`flex-1 py-2 ${measurementUnit === 'oz' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-700'}`}
                                    onClick={() => setMeasurementUnit('oz')}
                                >
                                    Ounces (oz)
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                                Date Format
                            </label>
                            <select 
                                id="dateFormat"
                                className="w-full rounded-xl border-blue-200/30 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-300/30 focus:ring-opacity-50"
                            >
                                <option>MM/DD/YYYY (US)</option>
                                <option>DD/MM/YYYY (EU)</option>
                                <option>YYYY-MM-DD (ISO)</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Data & Privacy Section */}
                <div className="bg-white shadow rounded-2xl p-6 border border-blue-200/20">
                    <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">🔒</span> Data & Privacy
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <button className="w-full py-2 px-4 border border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center">
                                <span className="mr-2">💾</span> Export My Data
                            </button>
                        </div>
                        
                        <div>
                            <button className="w-full py-2 px-4 border border-red-300 rounded-xl text-red-600 hover:bg-red-50 transition-all flex items-center justify-center">
                                <span className="mr-2">🗑️</span> Delete All Data
                            </button>
                        </div>
                        
                        <div className="pt-2 text-sm text-gray-500">
                            <p>Your data is stored locally on your device and is not shared with any third parties.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end pt-4">
                <button className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl shadow hover:from-blue-600 hover:to-blue-500 transition-all">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;