import React, { useEffect, useState } from 'react';
import { format, isToday } from 'date-fns';

export interface DailyChartData {
  date: Date;
  breast: number;
  formula: number;
  total: number;
}

interface WeeklyChartProps {
  dailyData: Record<string, DailyChartData>;
}

// Define chart colors based on milk type
const milkTypeColors = {
  breast: 'rgba(244, 114, 182, 0.8)', // Pink
  formula: 'rgba(96, 165, 250, 0.8)', // Blue
};

const WeeklyChart: React.FC<WeeklyChartProps> = ({ dailyData }) => {
  const [chartWidth, setChartWidth] = useState<number>(0);
  
  // Find max value for chart scaling
  const maxDailyVolume = React.useMemo(() => {
    return Math.max(
      ...Object.values(dailyData).map(day => day.total), 
      1 // Ensure we don't get zero as max
    );
  }, [dailyData]);
  
  // Set chart width based on container size
  useEffect(() => {
    const updateWidth = () => {
      const container = document.getElementById('chart-container');
      if (container) {
        setChartWidth(container.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Feeding Distribution</h2>
      
      <div id="chart-container" className="w-full overflow-x-auto">
        <div style={{ minWidth: '600px', height: '300px', position: 'relative' }} className="pt-5">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
            <div>
              {maxDailyVolume > 0 ? `${Math.ceil(maxDailyVolume)}ml` : ''}
            </div>
            <div>
              {maxDailyVolume > 0 ? `${Math.ceil(maxDailyVolume / 2)}ml` : ''}
            </div>
            <div>0ml</div>
          </div>
          
          {/* Chart grid */}
          <div className="absolute left-10 right-0 top-0 bottom-0">
            {/* Grid lines */}
            <div className="absolute left-0 right-0 h-px bg-gray-200 top-0"></div>
            <div className="absolute left-0 right-0 h-px bg-gray-200 top-1/2"></div>
            <div className="absolute left-0 right-0 h-px bg-gray-200 bottom-0"></div>
            
            {/* Chart bars */}
            <div className="flex h-full">
              {Object.entries(dailyData).map(([dateStr, data]) => {
                const total = data.breast + data.formula;
                
                // Calculate heights for each type
                const breastHeight = data.breast > 0 ? ((data.breast / maxDailyVolume) * 100) : 0;
                const formulaHeight = data.formula > 0 ? ((data.formula / maxDailyVolume) * 100) : 0;
                
                // Format date for display
                const displayDate = format(data.date, 'EEE');
                const fullDate = format(data.date, 'MMM d');
                
                // Check if this is today
                const isDateToday = isToday(data.date);
                
                return (
                  <div 
                    key={dateStr} 
                    className={`flex-1 flex flex-col justify-end items-center h-full  ${isDateToday ? 'bg-green-100' : ''}`}
                  >
                    {/* Bar segments stacked */}
                    <div 
                      className={`w-5/6 h-full relative flex flex-col-reverse`}
                    >
                      {data.breast > 0 && (
                        <div 
                          className="w-full" 
                          style={{ 
                            backgroundColor: milkTypeColors.breast,
                            height: `${breastHeight}%`
                          }}
                          title={`Breast: ${data.breast}ml`}
                        ></div>
                      )}
                      {data.formula > 0 && (
                        <div 
                          className="w-full" 
                          style={{ 
                            backgroundColor: milkTypeColors.formula,
                            height: `${formulaHeight}%`,
                            borderTopLeftRadius: data.breast === 0 ? '0.125rem' : 0,
                            borderTopRightRadius: data.breast === 0 ? '0.125rem' : 0
                          }}
                          title={`Formula: ${data.formula}ml`}
                        ></div>
                      )}
                    </div>
                    
                    {/* X-axis label */}
                    <div className={`text-xs mt-1 ${isDateToday ? 'font-bold text-blue-600' : 'text-gray-500'}`}>
                      <div>{displayDate}</div>
                      <div className="text-[10px]">{fullDate}</div>
                    </div>
                    
                    {/* Total volume label */}
                      <div className="text-[10px] mt-0.5 text-gray-500">
                        {total} ml
                      </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart legend */}
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: milkTypeColors.breast }}></div>
          <span className="text-xs text-gray-600">Breast</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: milkTypeColors.formula }}></div>
          <span className="text-xs text-gray-600">Formula</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;