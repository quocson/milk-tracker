export interface MilkEntry {
    id: number;
    datetime: string;
    volume_ml: number;
    milk_type: 'breast' | 'formula';
    createdAt: string;
    updatedAt: string;
}