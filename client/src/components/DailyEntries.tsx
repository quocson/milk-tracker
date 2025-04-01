import React from 'react';
import { format, parseISO, isToday } from 'date-fns';
import { MilkEntry } from '../types/MilkEntry';

interface DailyEntriesProps {
  day: Date;
  entries: MilkEntry[];
}

const DailyEntries: React.FC<DailyEntriesProps> = ({ day, entries }) => {
  if (entries.length === 0) return null;
  
  // Sort entries by time (most recent first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {isToday(day) ? 'Today' : format(day, 'EEEE, MMMM d')}
        </h2>
        <span className="text-sm text-gray-500">
          {entries.length} feeding{entries.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="divide-y divide-gray-100">
        {sortedEntries.map(entry => {
          const entryTime = format(parseISO(entry.datetime), 'h:mm a');
          const milkTypeConfig = {
            breast: { bg: 'bg-pink-100', text: 'text-pink-800' },
            formula: { bg: 'bg-blue-100', text: 'text-blue-800' },
            mixed: { bg: 'bg-purple-100', text: 'text-purple-800' }
          };
          
          const type = entry.milk_type.toLowerCase() as keyof typeof milkTypeConfig;
          const config = milkTypeConfig[type] || { bg: 'bg-gray-100', text: 'text-gray-800' };
          
          return (
            <div key={entry.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`${config.bg} ${config.text} px-2.5 py-0.5 rounded-full text-xs font-medium`}>
                    {entry.milk_type}
                  </span>
                  <span className="ml-3 text-gray-700">{entry.volume_ml} ml</span>
                </div>
                <span className="text-sm text-gray-500">{entryTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyEntries;