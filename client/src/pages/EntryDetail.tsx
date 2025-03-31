import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMilkEntryById } from '../api/milkEntries';
import { MilkEntry } from '../types/MilkEntry';

const EntryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [entry, setEntry] = useState<MilkEntry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const data = await fetchMilkEntryById(Number(id));
                setEntry(data);
            } catch (err) {
                setError('Failed to fetch milk entry');
            } finally {
                setLoading(false);
            }
        };
        if(id) 
        fetchEntry();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!entry) {
        return <div>No entry found</div>;
    }

    return (
        <div>
            <h1>Milk Entry Details</h1>
            <p>ID: {entry.id}</p>
            <p>Datetime: {entry.datetime.toString()}</p>
            <p>Volume (ml): {entry.volume_ml}</p>
            <p>Milk Type: {entry.milk_type}</p>
        </div>
    );
};

export default EntryDetail;