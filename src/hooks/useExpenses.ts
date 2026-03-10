'use client'

import { useState, useEffect } from "react"
import { Expense } from "../types/expense"
import { supabase } from "../lib/supabase";


// const EXPENSES_KEY = 'my-expenses-v1';

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    // Load expenses
    useEffect(() => {
        const loadExpenses = async () => {
            setLoading(true);
            const { data, error } = await supabase
              .from('expenses')
              .select('*')
              .order('date', { ascending: false });

              if (error) {
                console.error('Error loading expenses:', error);
              } else {
                setExpenses(data || []);
              }
              setLoading(false);

        };

        loadExpenses();

        // Realtime subscription (optional - updates live)
        const subscription = supabase
        .channel('expenses-changes')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'expenses'},
            (payload) => {
                loadExpenses();   // reload on any change
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const addExpense = async (exp: Omit<Expense, 'id' | 'date'>) => {
        const newExpense: Expense = {
            ...exp,
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0],  // auto-add today's date
        };

        const { data, error } = await supabase
          .from('expenses')
          .insert(newExpense)
          .select()
          .single();

          if (error) {
            console.log('Add error:', error);
            alert('Failed to add expense');
          } else if (data) {
            setExpenses(prev => [data, ...prev]);
          }
    };

    const deleteExpense = async (id: string) => {
        const { error } = await supabase.from('expense').delete().eq('id', id);
        if (error) {
            console.error('Delete error:', error);
        }
    }

    const editExpense = async (updated: Expense) => {
        const { error } = await supabase 
           .from('expenses')
           .update({
            amount: updated.amount,
            category: updated.category,
            date: updated.date,
            note: updated.note,
           })
           .eq('id', updated.id);

           if (error) {
            console.error('Edit error:', error);
           } else {
            setExpenses(prev => 
                prev.map(e =>(e.id === updated.id ? updated : e))
            )
           }
    }

    return { 
        expenses, 
        addExpense,
         deleteExpense, 
         editExpense, 
         loading,
        };
}