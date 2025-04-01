import React from 'react';
import { format, isSameDay, startOfWeek } from 'date-fns';

interface WeekNavigationProps {
  selectedWeekStart: Date;
  selectedWeekEnd: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onCurrentWeek: () => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({
  selectedWeekStart, 
  selectedWeekEnd, 
  onPreviousWeek, 
  onNextWeek, 
  onCurrentWeek
}) => {
  // Check if selected week is current week
  const isCurrentWeek = React.useMemo(() => {
    const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    return isSameDay(selectedWeekStart, currentWeekStart);
  }, [selectedWeekStart]);
  
  // Format week display
  const getWeekDisplay = () => {
    const startFormatted = format(selectedWeekStart, 'MMM d');
    const endFormatted = format(selectedWeekEnd, 'MMM d, yyyy');
    return `${startFormatted} - ${endFormatted}`;
  };
  
  return (
    <div className="flex items-center justify-between mb-6">
      <button 
        onClick={onPreviousWeek}
        className="flex items-center px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Previous Week
      </button>
      
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-semibold text-gray-700">{getWeekDisplay()}</h2>
        {!isCurrentWeek && (
          <button
            onClick={onCurrentWeek}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            (Go to current week)
          </button>
        )}
      </div>
      
      <button 
        onClick={onNextWeek}
        disabled={isCurrentWeek}
        className={`flex items-center px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 ${
          isCurrentWeek ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
        }`}
      >
        Next Week
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default WeekNavigation;