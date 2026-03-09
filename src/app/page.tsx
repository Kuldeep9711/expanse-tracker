'use client'

import { useExpenses } from "../hooks/useExpenses"
import ExpenseForm from "../components/ExpenseForm"
import ExpenseSummary from "../components/ExpenseSummary";
import { useState } from "react";
import ExpenseItem from "../components/ExpenseItem";

export default function ExpensePage() {
   const { expenses, addExpense, deleteExpense, editExpense, mounted} = useExpenses();
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const filteredExpenses = selectedCategory
     ? expenses.filter(exp => exp.category === selectedCategory)
     : expenses; 

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
         My Expense Tracker 
        </h1>

        {/* form */}
        <div className="mb-12">
         <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>
         <ExpenseForm onAdd={addExpense} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Expenses {expenses.length > 0 && `(${expenses.length})`}
          </h2>

          {mounted ? (
             <>
             <ExpenseSummary expenses={expenses}/>

             {/* Filter */}
              <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Cricket">Cricket / Sports</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>
          

          {/* List */}
        <h2 className="text-2xl font-semibold mb-4">
            Expenses {filteredExpenses.length > 0 && `(${filteredExpenses.length})`}
        </h2>

            {filteredExpenses.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-12">
              {selectedCategory ? `No expenses in ${selectedCategory}`: 'No expenses added yet'}
              </p>
            ) : (
              <div className="space-y-4">
                 {filteredExpenses.map(exp => (
                    <ExpenseItem 
                    key={exp.id}
                    expense={exp}
                    onDelete={deleteExpense}
                    onEdit={editExpense}  // Pass the new handler
                    />        
                 ))}
                </div>
            )}
            </>
          ) : (
            <p className="text-center py-12">Loading your expenses...</p>
          )}
        </div>
        
      </div>

    </main>
  )
}
  


{/* <div
                  key={exp.id}
                  className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                       <div>
                     <p className="font-medium">{exp.category}</p>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                       ₹{exp.amount.toFixed(2)} • {exp.date}
                     </p>
                     {exp.note && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
                         {exp.note}
                      </p>
                     )}
                        </div>
                        <button
                        onClick={() => deleteExpense(exp.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                        >
                           Delete 
                        </button>
                    </div>   */}