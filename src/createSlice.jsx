import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const expenseApi=createApi({
    reducerPath: 'expenseApi',
    tagTypes: ['totalList', 'totalListById'],
    baseQuery: fetchBaseQuery({
      baseUrl: ' http://localhost:9000/',
    }),

      endpoints: (builder) => ({
        getTotal: builder.query({
          query: () => ({
            url: 'expenseTracker',
            method: 'GET',
          }),
          providesTags: ['totalList'],
        }),

      createExpenses: builder.mutation({
        query: (newExpense) => ({
          url: 'expenseTracker',
          method: 'POST',
          body: newExpense,
        }),
        invalidatesTags: ['totalList'],
      }),

      delExpenses: builder.mutation({
        query: (id) => ({
          url: `expenseTracker/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['totalList'],
      }),
    }),
})

export const { useGetTotalQuery ,useCreateExpensesMutation , useDelExpensesMutation} =expenseApi;



// render website