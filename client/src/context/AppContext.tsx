import React, { createContext, useContext, useState, useEffect } from 'react';
import { MilkEntry } from '../types/MilkEntry';
import { initializeDB, saveToIndexedDB, getFromIndexedDB, deleteFromIndexedDB } from '../utils/indexedDB';
import { fetchMilkEntries, createMilkEntry, deleteMilkEntry } from '../api/milkEntries';

interface AppContextType {
  milkEntries: MilkEntry[];
  isOnline: boolean;
  setIsOnline: (online: boolean) => void; // Updated to use custom setter
  // CRUD operations for MilkEntries
  addMilkEntry: (entry: Omit<MilkEntry, 'id'>) => Promise<MilkEntry>;
  removeMilkEntry: (entryId: number) => Promise<boolean>;
  toggleOnlineMode: () => void; // New function to toggle mode
}

interface PendingOperation {
  type: 'create' | 'update' | 'delete';
  store: 'milkEntries';
  data?: any;
  id?: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ONLINE_MODE_KEY = 'milk_tracker_online_mode';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get stored online mode from localStorage, default to true if not set
  const getInitialOnlineMode = (): boolean => {
    const stored = localStorage.getItem(ONLINE_MODE_KEY);
    return stored === null ? true : stored === 'true';
  };

  const [milkEntries, setMilkEntries] = useState<MilkEntry[]>([]);
  const [isOnline, setIsOnlineState] = useState<boolean>(getInitialOnlineMode());
  const [dbInitialized, setDbInitialized] = useState<boolean>(false);
  
  // Custom setter for isOnline that also updates localStorage
  const setIsOnline = (online: boolean) => {
    setIsOnlineState(online);
    localStorage.setItem(ONLINE_MODE_KEY, online.toString());
  };

  // Toggle online mode function
  const toggleOnlineMode = () => {
    // Only allow manual toggle if the browser isn't actually offline
    if (!navigator.onLine && isOnline) {
      // If browser is offline but we're trying to go online, don't allow it
      alert("Your device appears to be offline. Cannot switch to online mode.");
      return;
    }    
    setIsOnline(!isOnline);    
  };
  

  // Initialize IndexedDB and set up online/offline detection
  useEffect(() => {
    const setupIndexedDB = async () => {
      try {

        
        // If we're online and in online mode, try to fetch fresh data
        if (navigator.onLine && isOnline) {
          
          try {
            await fetchInitialData();
          } catch (error) {
            console.error('Failed to fetch initial data:', error);
          }
        } else {
          await initializeDB();
          setDbInitialized(true);          
          const storedEntries = await getFromIndexedDB('milkEntries');
          if (storedEntries) 
            setMilkEntries(storedEntries as MilkEntry[]);
          // If we're offline, we'll use the local data from IndexedDB
          console.log('Offline mode: Using local data from IndexedDB', storedEntries);
        }
      } catch (error) {
        console.error('Failed to initialize IndexedDB:', error);
      }
    };

    // If switching to online mode and we have pending changes, sync them
    
    setupIndexedDB();

    return () => {
    };
  }, [isOnline]); // Added isOnline as dependency to refetch when mode changes


  // Fetch initial data from server
  const fetchInitialData = async () => {
    try {
      
      const fetchedEntries = await fetchMilkEntries();
      setMilkEntries(fetchedEntries);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      // If we fail, we'll use the local data from IndexedDB
    }
  };

  // CRUD operation for MilkEntries
  const addMilkEntry = async (entry: Omit<MilkEntry, 'id'>): Promise<MilkEntry> => {
    if (isOnline) {
      try {
        // When online, create on server first
        const newEntry = await createMilkEntry(entry);
        
        // Then update local state
        setMilkEntries(prev => [...prev, newEntry]);
        return newEntry;
      } catch (error) {
        console.error('Failed to create entry on server:', error);
        // Fall back to offline mode if server request fails
        return addMilkEntryOffline(entry);
      }
    } else {
      // When offline, just update local state
      return addMilkEntryOffline(entry);
    }
  };
  
  const addMilkEntryOffline = (entry: Omit<MilkEntry, 'id'>): MilkEntry => {
    // Generate a temporary negative ID (to avoid conflicts with server IDs)
    const tempId = Math.floor(Math.random() * 1000000);
    
    const newEntry: MilkEntry = {
      ...entry,
      id: tempId
    };
    
    // Add to local state
    setMilkEntries(prev => [...prev, newEntry]);
    saveToIndexedDB('milkEntries', newEntry);
    
    return newEntry;
  };
  
  
  const removeMilkEntry = async (entryId: number): Promise<boolean> => {
    if (isOnline) {
      try {
        // When online, delete from server first
        await deleteMilkEntry(entryId);
        
        // Then update local state
        setMilkEntries(prev => prev.filter(e => e.id !== entryId));
        return true;
      } catch (error) {
        console.error('Failed to delete entry from server:', error);
        // Fall back to offline mode if server request fails
        return removeMilkEntryOffline(entryId);
      }
    } else {
      // When offline, just update local state
      return removeMilkEntryOffline(entryId);
    }
  };
  
  const removeMilkEntryOffline = (entryId: number): boolean => {
    // Remove from local state
    setMilkEntries(prev => prev.filter(e => e.id !== entryId));
    deleteFromIndexedDB('milkEntries', entryId);
    return true;
  };
  

  return (
    <AppContext.Provider value={{ 
      milkEntries, 
      isOnline,
      setIsOnline,
      addMilkEntry,
      removeMilkEntry,
      toggleOnlineMode // New exported function
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};