// IndexedDB utility functions

const DB_NAME = 'milkTrackerDB';
const DB_VERSION = 1;

export const initializeDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve();
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains('milkEntries')) {
        db.createObjectStore('milkEntries', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('pendingOperations')) {
        db.createObjectStore('pendingOperations', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

export const saveToIndexedDB = <T>(
  storeName: string, 
  data: T | T[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onerror = () => reject(new Error('Failed to open IndexedDB'));

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      if (Array.isArray(data)) {
        // Clear existing data before bulk insert
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => {
          data.forEach(item => store.put(item));
        };
      } else {
        store.put(data);
      }

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(new Error(`Failed to save data to ${storeName}`));
      };
    };
  });
};

export const getFromIndexedDB = <T>(storeName: string): Promise<T[] | null> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onerror = () => reject(new Error('Failed to open IndexedDB'));

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };

      getAllRequest.onerror = () => {
        reject(new Error(`Failed to fetch data from ${storeName}`));
      };
    };
  });
};

export const deleteFromIndexedDB = (
  storeName: string, 
  id: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onerror = () => reject(new Error('Failed to open IndexedDB'));

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const deleteRequest = store.delete(id);

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = () => {
        reject(new Error(`Failed to delete item ${id} from ${storeName}`));
      };
    };
  });
};

export const clearStore = (storeName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onerror = () => reject(new Error('Failed to open IndexedDB'));

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        resolve();
      };

      clearRequest.onerror = () => {
        reject(new Error(`Failed to clear ${storeName}`));
      };
    };
  });
};