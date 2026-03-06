'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const expenseSchema = z.object({
    amount: z 
    .string()
    .min(1, 'Amount is required')
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Must be a positive number',
    }),
    category: z.string().min(1, 'Please select a category'),
    note: z.string().optional(),
})

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
    onAdd: (data: {
        amount: number;
        category: string;
        note?: string;
    }) => void
}

export default function ExpenseForm({onAdd}: ExpenseFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ExpenseFormData>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            amount: '',
            category: '',
            note: '',
        },
    });

         const onSubmit = (data: ExpenseFormData) => {
            onAdd({
                amount: Number(data.amount),
                category: data.category,
                note: data.note || undefined,
                
            })
            reset();
         }

  return (
   <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mb-8'>
    <div>
        <label className='block text-sm font-medium mb-1'>Amount (₹)</label>
        <input 
        type='text'
        {...register('amount')}
        placeholder='e.g. 450'
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.amount
            ? 'border-red-500 ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
            } dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
        />
        {errors.amount && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                {errors.amount.message}
            </p>
        )}
    </div>

    <div>
        <label className='block text-sm font-medium mb-1'>Category</label>
        <select 
        {...register('category')}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.category
            ? 'border-red-500 ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
            } dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
        >
         <option value="">Select category</option>
         <option value="Food">Food</option>
         <option value="Transport">Transport</option>
         <option value="Entertainment">Entertainment</option>
         <option value="Cricket">Cricket</option>
         <option value="Other">Other</option>
        </select>
        {errors.category && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
              {errors.category.message}
            </p>
        )}
    </div>

    <div>
        <label className='block text-sm font-medium mb-1'>Note (optional)</label>
        <input 
        type='text'
        {...register('note')}
        placeholder='e.g. Dinner with friends'
        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        />
    </div>
    
    <button
    type='submit'
    className='w-full py-3 bg-green-600 text-white font-white font-medium rounded-md hover:bg-green-700 transition-colors'
    >
     Add Expense 
    </button>
   </form>
  )
}
