'use client'

import { useExpenses } from "@/src/hooks/useExpenses"


export default function ExpensesPage() {
    const { expenses, addExpense, deleteExpense, mounted } = useExpenses();

    // Example add handler - you'll replace with form
    const handleQuickAdd = () => {
        addExpense({
            amount: 500,
            category: 'Cricket Gear',
            note: 'New bat',
        })
    }
  return (
       <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold mb-8 text-center">Expense Tracker</h1>
     
        {mounted ? (
            <div className="max-w-4xl mx-auto">
             <button
             onClick={handleQuickAdd}
             className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
             >
         Quick Add Test Expense
             </button>

             <div className="grid gap-4">
               {expenses.length === 0 ? (
                <p className="text-center text-gray-500">No expenses yet -add one!</p>
               ) : (
                expenses.map(exp => (
                    <div 
                    key={exp.id}
                    className="p-4 bg-white dark:bg-bg-gray-800 rounded-lg shadow flex justify-between items-center"
                    >
                       <div>
                        <p className="font-medium">{exp.category}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            ₹{exp.amount} • {exp.date}
                        </p>
                        </div>
                        <button
                        onClick={() => deleteExpense(exp.id)}
                        className="text-red-600 hover:text-red-800"
                        >
                         Delete 
                        </button>
                        </div>
                ))
               )}
             </div>
            </div>
        ) : (
            <p className="text-center">Loading expenses...</p>
        )}
       </main>
  )
}
