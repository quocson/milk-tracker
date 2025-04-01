import React from 'react';

interface WeeklySummaryProps {
  summary: {
    breast: number;
    formula: number;
    total: number;
  };
  entryCount: number;
}

const WeeklySummaryCards: React.FC<WeeklySummaryProps> = ({ summary, entryCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-sm font-medium text-blue-900 mb-1">Total Volume</h3>
        <p className="text-2xl sm:text-3xl font-bold text-blue-700">{summary.total} ml</p>
        <p className="text-xs text-blue-600 mt-1">{entryCount} feeding{entryCount !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-sm font-medium text-pink-900 mb-1">Breast Milk</h3>
        <p className="text-2xl sm:text-3xl font-bold text-pink-700">{summary.breast} ml</p>
        <p className="text-xs text-pink-600 mt-1">{Math.round((summary.breast / summary.total || 0) * 100)}% of total</p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-sm font-medium text-blue-900 mb-1">Formula</h3>
        <p className="text-2xl sm:text-3xl font-bold text-blue-700">{summary.formula} ml</p>
        <p className="text-xs text-blue-600 mt-1">{Math.round((summary.formula / summary.total || 0) * 100)}% of total</p>
      </div>
    </div>
  );
};

export default WeeklySummaryCards;