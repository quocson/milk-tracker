import axios from 'axios';
import { MilkEntry } from '../types/MilkEntry';

const API_URL = '/api/milk/';

export const fetchMilkEntries = async (milkType?: string, startDate?: string, endDate?: string): Promise<MilkEntry[]> => {
    const response = await axios.get(API_URL, {
        params: {
            milk_type: milkType,
            start_date: startDate,
            end_date: endDate,
        },
    });
    return response.data;
};

export const createMilkEntry = async (entry: Omit<MilkEntry, "id">): Promise<MilkEntry> => {
    const response = await axios.post(API_URL, entry);
    return response.data;
};

export const fetchMilkEntryById = async (id: number): Promise<MilkEntry> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateMilkEntry = async (id: number, entry: MilkEntry): Promise<MilkEntry> => {
    const response = await axios.put(`${API_URL}/${id}`, entry);
    return response.data;
};

export const deleteMilkEntry = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};