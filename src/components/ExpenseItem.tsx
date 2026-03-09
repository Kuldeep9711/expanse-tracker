'use client'

import { useState } from "react"
import { Expense } from "../types/expense"

interface ExpenseItemProps {
    expense: Expense;
    onDelete: (id: string) => void;
    onEdit: (update: Expense) => void;
}

export default function ExpenseItem({ expense, onDelete, onEdit }: ExpenseItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        amount: expense.amount.toString(),
        category: expense.category,
        note: expense.note || '',
    });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
       const { name, value} = e.target;
       setFormData(prev => ({ ...prev, [name]: value}))
    };

    // Save handler - called only when "Save" button is clicked
    const handleSave = () => {
        console.log('Save clicked - current formData', formData);

        const updatedAmount = Number(formData.amount);
        if (isNaN(updatedAmount) || updatedAmount <= 0) {
            console.log('Invalid amount - not saving');
            return;
        }

        const updatedExpenses: Expense = {
           ...expense,
           amount: updatedAmount,
           category: formData.category,
           note: formData.note || undefined,
        };

        console.log('Calling onEdit whit:', updatedExpenses);

        onEdit(updatedExpenses);
        setIsEditing(false);
    }

    console.log('ExpenseItem rendered - isEditing:', isEditing, 'for ID:', expense.id);

    if (isEditing) {
        return (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border space-y-3">
                <input 
                name="amount"
                type="text"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Amount"
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"

                />
              <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              >
             <option value="Food">Food</option>
             <option value="Transport">Transport</option>
             <option value="Entertainment">Entertainment</option>
             <option value="Cricket / Sports">Cricket / Sports</option>
             <option value="Shopping">Shopping</option>
             <option value="Other">Other</option>
              </select>
              <input
              name="note"
              type="text"
              value={formData.note}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              />

              <div className="flex gap-3">
                <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                 Save 
                </button>
                <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
                >
              Cancel 
                </button>

              </div>
            </div>
        )
    }

      

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border flex justify-between items-center">
            <div className="flex-1">
               <p className="font-medium">{expense.category}</p>
               <p className="text-sm text-gray-600 dark:text-gray-400">
                 ₹{expense.amount.toFixed(2)} • {expense.date}
               </p>
               {expense.note && <p className="text-sm italic mt-1">{expense.note}</p>}
            </div>
            <div className="flex gap-3">
             <button
             onClick={() => {
                console.log('Edit button clicked for expense ID:', expense.id);
                setIsEditing(true)
            }}
           //  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
             >
             Edit 
             </button>
             <button
             onClick={() => onDelete(expense.id)}
             className="text-red-600 hover:text-red-800 dark:text-red-400"
             >
             Delete 
             </button>
            </div>
        </div>
    );
}
