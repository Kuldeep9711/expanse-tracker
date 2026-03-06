'use client'

import { useState, useEffect } from "react"
import { Expense } from "../types/expense"

const EXPENSES_KEY = 'my-expenses-v1';

export function useExpenses() {
    const [expenses, setExpense] = useState<Expense[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(EXPENSES_KEY);
            if (saved) {
                try {
                    setExpense(JSON.parse(saved));
                } catch {}
            }
        }
    }, []);

    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses))
        }
    }, [expenses, mounted]);

    const addExpense = (exp: Omit<Expense, 'id' | 'date'>)  => {
        const newExp: Expense = {
            ...exp,
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0],  // YYYY-MM-DD
        };
        setExpense(prev => [...prev, newExp])
    }

    const deleteExpense = (id: string) => {
        setExpense(prev => prev.filter(e  => e.id !== id));
    }

    // Add editExpense later if you want

    return { expenses, addExpense, deleteExpense, mounted };
}