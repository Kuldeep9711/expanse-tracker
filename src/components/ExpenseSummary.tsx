
import { Expense } from "../types/expense"

interface ExpenseSummaryProps {
    expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
   // Total spent ever
   const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0)

   // Total this month
   const now = new Date();
   const thisMonth = now.toISOString().slice(0, 7) // YYYY-MM
    const thisMonthSpent = expenses
      .filter(exp => exp.date.startsWith(thisMonth))
      .reduce((sum, exp) => sum + exp.amount, 0);

      // Category breakdown
      const categoryMap = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Total Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-b-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Total Spent 
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹{totalSpent.toFixed(0)}
        </p>
      </div>

      {/* This Month Card */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            This Month 
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
             ₹{thisMonthSpent.toFixed(0)}
          </p>
         </div>

         {/* Category Breakdown */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                 Top Categories 
            </h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(categoryMap)
              .sort(([, a], [, b]) => b - a)  // highest first 
              .slice(0, 5)
              .map(([categoryMap, amt]) => (
                <li key={cat} className="flex justify-between">
                  <span>{cat}</span>
                  <span className="font-medium"> ₹{amt.toFixed(0)}</span>
                </li>
              ))}  
            </ul>
          </div>
    </div>
  );
}
