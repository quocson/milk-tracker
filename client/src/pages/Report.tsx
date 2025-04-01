import React, { useState, useMemo } from 'react';
import { 
  parseISO, 
  startOfWeek, 
  endOfWeek, 
  addWeeks, 
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { useAppContext } from '../context/AppContext';
import WeekNavigation from '../components/WeekNavigation';
import WeeklySummaryCards from '../components/WeeklySummaryCards';
import WeeklyChart from '../components/WeeklyChart';
import DailyEntries from '../components/DailyEntries';

const Report: React.FC = () => {
  const { milkEntries } = useAppContext();
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  
  // Calculate week end date and day array
  const selectedWeekEnd = useMemo(() => 
    endOfWeek(selectedWeekStart, { weekStartsOn: 1 }), 
    [selectedWeekStart]
  );
  
  const daysOfWeek = useMemo(() => 
    eachDayOfInterval({ start: selectedWeekStart, end: selectedWeekEnd }),
    [selectedWeekStart, selectedWeekEnd]
  );
  
  // Get entries for the selected week
  const weeklyEntries = useMemo(() => {
    return milkEntries.filter(entry => {
      const entryDate = parseISO(entry.datetime);
      return entryDate >= selectedWeekStart && entryDate <= selectedWeekEnd;
    });
  }, [milkEntries, selectedWeekStart, selectedWeekEnd]);
  
  // Calculate weekly totals by milk type
  const weeklySummary = useMemo(() => {
    const totals = {
      breast: 0,
      formula: 0,
      total: 0,
    };
    
    weeklyEntries.forEach(entry => {
      const type = entry.milk_type.toLowerCase() as 'breast' | 'formula';
      if (type === 'breast' || type === 'formula') {
        totals[type] += entry.volume_ml;
      }
      totals.total += entry.volume_ml;
    });
    
    return totals;
  }, [weeklyEntries]);
  
  // Organize data by day for the chart
  const dailyData = useMemo(() => {
    // Initialize with all days of the week
    const dailyTotals: Record<string, { date: Date; breast: number; formula: number; total: number }> = {};
    
    // Create entry for each day of the week
    daysOfWeek.forEach(day => {
      const dateString = format(day, 'yyyy-MM-dd');
      dailyTotals[dateString] = {
        date: day,
        breast: 0,
        formula: 0,
        total: 0
      };
    });
    
    // Aggregate entry data by day
    weeklyEntries.forEach(entry => {
      const entryDate = parseISO(entry.datetime);
      const dateString = format(entryDate, 'yyyy-MM-dd');
      
      if (dailyTotals[dateString]) {
        const type = entry.milk_type.toLowerCase() as 'breast' | 'formula';
        
        if (type === 'breast' || type === 'formula') {
          dailyTotals[dateString][type] += entry.volume_ml;
        }
        
        dailyTotals[dateString].total += entry.volume_ml;
      }
    });
    
    return dailyTotals;
  }, [weeklyEntries, daysOfWeek]);
  
  // Week navigation handlers
  const goToPreviousWeek = () => {
    setSelectedWeekStart(prev => addWeeks(prev, -1));
  };
  
  const goToCurrentWeek = () => {
    setSelectedWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };
  
  const goToNextWeek = () => {
    setSelectedWeekStart(prev => addWeeks(prev, 1));
  };
  
  // Get entries for a specific day
  const getEntriesForDay = (day: Date) => {
    const start = startOfDay(day);
    const end = endOfDay(day);
    
    return weeklyEntries.filter(entry => {
      const entryDate = parseISO(entry.datetime);
      return entryDate >= start && entryDate <= end;
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Weekly Feeding Report</h1>
      
      {/* Week navigation */}
      <WeekNavigation 
        selectedWeekStart={selectedWeekStart}
        selectedWeekEnd={selectedWeekEnd}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        onCurrentWeek={goToCurrentWeek}
      />
      
      {/* Weekly summary cards */}
      <WeeklySummaryCards 
        summary={weeklySummary}
        entryCount={weeklyEntries.length}
      />
      
      {/* Weekly chart */}
      <WeeklyChart 
        dailyData={dailyData}
      />
      
      {/* Daily entries section */}
      <div className="space-y-8">
        {daysOfWeek.map((day) => (
          <DailyEntries 
            key={format(day, 'yyyy-MM-dd')}
            day={day}
            entries={getEntriesForDay(day)}
          />
        ))}
      </div>
    </div>
  );
};

export default Report;