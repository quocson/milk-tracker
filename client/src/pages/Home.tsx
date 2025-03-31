import React, { useState } from 'react';
import MilkEntryList from '../components/MilkEntryList';
import MilkEntryForm from '../components/MilkEntryForm';
import { MilkEntry } from '../types/MilkEntry';

const Home: React.FC = () => {
    const [refreshList, setRefreshList] = useState<boolean>(false);

    const handleEntryCreated = (entry: MilkEntry) => {
        // Toggle refreshList to trigger the MilkEntryList to reload data
        setRefreshList(prev => !prev);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl">🏠</span>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent">
                    Welcome to Milk Tracker
                </h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        <MilkEntryForm onEntryCreated={handleEntryCreated} />
                    </div>
                </div>
                
                <div className="lg:col-span-2">
                    <div className="bg-white shadow-soft rounded-2xl overflow-hidden">
                        <div className="flex items-center p-6 border-b border-blue-100/30">
                            <span className="text-xl mr-2">📋</span>
                            <h2 className="text-lg font-bold text-gray-700">Recent Feedings</h2>
                        </div>
                        <div className="p-1">
                            <MilkEntryList key={refreshList.toString()} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100/30">
                <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
                    <span className="text-xl mr-2">💡</span>
                    Tracking Tips
                </h2>
                <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Record each feeding right after it happens for accurate tracking</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Track both the time and amount to identify feeding patterns</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Check the dashboard to see your baby's feeding trends over time</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;