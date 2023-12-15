import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 

  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => '/expenses',
    }),
    createExpense: builder.mutation({
      query: (expense) => ({
        url: '/expenses',
        method: 'POST',
        body: expense,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `/expenses/${expenseId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
