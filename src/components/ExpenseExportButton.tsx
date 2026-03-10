'use client'

import { blob } from "stream/consumers";
import { Expense } from "../types/expense"

interface ExpenseExportButtonProps {
    expenses: Expense[];
}


export default function ExpenseExportButton({expenses}: ExpenseExportButtonProps) {
     const handleExport = () => {
        if (expenses.length === 0) {
            alert('No expenses to export')
            return;
        }

        // Headers
        const headers = ['Date', 'Category', 'Amount (₹)', 'Note'];


        // Rows
        const rows = expenses.map(exp => [
            exp.date,
            `"${exp.category}"`,
            exp.amount,
            exp.note ? `"${exp.note}"` : '',
        ]);

        // CSV content
        const csv = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
        

        // Download
        const blob = new Blob([csv], {type:'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
     };

    return (
    <button
    onClick={handleExport}
    disabled={expenses.length === 0}
    className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
    >
       Export to CSV 
    </button>
  );
}
