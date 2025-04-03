import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface MilkEntryFormProps {
  onEntryCreated: (entry: any) => void;
}

const MilkEntryForm: React.FC<MilkEntryFormProps> = ({ onEntryCreated }) => {
    const getLocalISOString = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
        return new Date(now.getTime() - offset).toISOString().slice(0, 16);
    };

    const [datetime, setDatetime] = useState<string>(getLocalISOString());
    const [volumeML, setVolumeML] = useState<number>(0);
    const [milkType, setMilkType] = useState<'breast' | 'formula'>('breast');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { addMilkEntry, isOnline } = useAppContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const newEntry = {
                datetime: new Date(datetime).toISOString(),
                volume_ml: volumeML,
                milk_type: milkType,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            await addMilkEntry(newEntry);
            onEntryCreated(newEntry);
            resetForm();
        } catch (err) {
            setError('Failed to save entry');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setDatetime(getLocalISOString());
        setVolumeML(0);
        setMilkType('breast');
    };

    return (
        <div className="bg-white shadow-soft rounded-2xl p-6 border border-baby-blue/20 font-round">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                    <span className="text-2xl mr-2">🍼</span>
                    <h2 className="text-xl font-bold text-gray-700">New Feeding</h2>
                </div>
                {!isOnline && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Offline Mode
                    </span>
                )}
            </div>
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>{error}</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label htmlFor="datetime" className="flex items-center text-sm font-medium text-gray-700">
                        <span className="mr-1">🕒</span> When was feeding time?
                    </label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        value={datetime}
                        onChange={(e) => setDatetime(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-xl border-baby-blue/30 shadow-sm focus:border-baby-blue focus:ring focus:ring-baby-blue/30 focus:ring-opacity-50 transition-all h-12 px-4"
                    />
                </div>
                
                <div className="space-y-2">
                    <label htmlFor="volume" className="flex items-center text-sm font-medium text-gray-700">
                        <span className="mr-1">📏</span> How much milk? (ml)
                    </label>
                    <input
                        type="number"
                        id="volume"
                        value={volumeML}
                        onChange={(e) => setVolumeML(Number(e.target.value))}
                        required
                        min="0"
                        className="mt-1 block w-full rounded-xl border-baby-blue/30 shadow-sm focus:border-baby-blue focus:ring focus:ring-baby-blue/30 focus:ring-opacity-50 transition-all text-right h-12 px-4"
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                        <span className="mr-1">🥛</span> What type of milk?
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <button
                            type="button"
                            onClick={() => setMilkType('breast')}
                            className={`px-3 py-2 rounded-lg border flex items-center justify-center transition-all ${
                                milkType === 'breast'
                                    ? 'bg-pink-100 border-pink-300 text-pink-800'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span className="mr-1">💗</span> Breast
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => setMilkType('formula')}
                            className={`px-3 py-2 rounded-lg border flex items-center justify-center transition-all ${
                                milkType === 'formula'
                                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span className="mr-1">🍼</span> Formula
                        </button>
                    </div>
                </div>
                
                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors ${
                        submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                >
                    {submitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        <>Save Feeding</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default MilkEntryForm;