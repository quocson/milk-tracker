import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

// Milk type configuration with colors and icons
const milkTypeConfig = {
  'breast': {
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    )
  },
  'formula': {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
        <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
      </svg>
    )
  },
  'mixed': {
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
      </svg>
    )
  },
  'default': {
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.125 9.75a.75.75 0 01.75-.75h6.75a.75.75 0 010 1.5H8.625a.75.75 0 01-.75-.75z" clipRule="evenodd" />
      </svg>
    )
  }
};

const MilkEntryList: React.FC = () => {
    const { milkEntries, removeMilkEntry, isOnline } = useAppContext();
    const [error, setError] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState<number>(0);

    const handleDelete = async (entryId: number) => {
        try{
            setDeleteLoading(entryId);
            await removeMilkEntry(entryId);
        } catch (err) {
            setError('Failed to delete entry');
        }
        finally {
            setDeleteLoading(0);
        }
    };

    // Get milk type config, fallback to default if type not found
    const getMilkTypeConfig = (type: string) => {
        const normalizedType = type.toLowerCase();
        return milkTypeConfig[normalizedType as keyof typeof milkTypeConfig] || milkTypeConfig.default;
    };
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            <div className="flex items-center justify-between mb-6 border-b pb-2">
                <h2 className="text-2xl font-bold text-blue-700">Milk Entries</h2>
                {!isOnline && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Offline Mode
                    </span>
                )}
            </div>
            
            {milkEntries.length === 0 ? (
                <p className="text-gray-500 italic">No entries found</p>
            ) : (
                <ul className="space-y-3">
                    {milkEntries.sort((a,b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()).map(entry => {
                        const config = getMilkTypeConfig(entry.milk_type);
                        
                        return (
                            <li key={entry.id} className="bg-white shadow-md rounded-lg p-4 hover:bg-blue-50 transition duration-200">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full flex items-center`}>
                                            {config.icon}
                                            <span className="font-medium">{entry.milk_type}</span>
                                        </div>
                                        <span className="text-gray-700 font-semibold">{entry.volume_ml} mL</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-500 mr-3">{new Date(entry.datetime).toLocaleString()}</span>
                                        <button
                                            onClick={() => handleDelete(entry.id)}
                                            disabled={deleteLoading === entry.id}
                                            className={`p-1.5 rounded-full text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                                                deleteLoading === entry.id ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                            aria-label="Delete entry"
                                        >
                                            {deleteLoading === entry.id ? (
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default MilkEntryList;