import React from 'react';
import MilkEntryList from '../components/MilkEntryList';

const Dashboard: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            
            <div className="bg-white shadow-lg rounded-lg mb-8">
                <MilkEntryList />
            </div>
        </div>
    );
};

export default Dashboard;