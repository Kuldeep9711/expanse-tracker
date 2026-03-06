export interface Expense {
    id: string;
    amount: number;
    category: string;  // e.g "Food", "Travel", "Cricket"
    date: string;      // ISD string "2026-03-05"
    note?: string;
}