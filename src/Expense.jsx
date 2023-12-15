import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetTotalQuery, useCreateExpensesMutation, useDelExpensesMutation } from './createSlice';

function Expense() {
    const incomeCategory = ['Business', 'Investments', 'Extra income', 'Deposits', 'Lottery', 'Gifts', 'Salary', 'Savings', 'Rental income'];
    const expenseCategory = ['Bill', 'Car', 'Clothes', 'Travel', 'Food', 'Shopping', 'House', 'Entertainment', 'Phone', 'Pets', 'Other'];

    const [category, setCategory] = useState('Income');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    
    const [expenseIncome, responseInfo] = useCreateExpensesMutation();
    const { data, isLoading, isSuccess, isError } = useGetTotalQuery();

    const { id, Blanace } = data || {}
    const [delIncome, response] = useDelExpensesMutation(id)

    useEffect(() => {
        setTotalIncome(0);
        setTotalExpense(0);
        setTotalBalance(0);
    }, [])
    const handleCreate = () => {
        if (category === 'Income') {
            const newTotalIncome = totalIncome + parseFloat(selectedAmount);
            setTotalIncome(newTotalIncome);
            setTotalBalance(newTotalIncome - totalExpense);
        }
        else if (category === 'Expense') {
            const newTotalExpense = totalExpense + parseFloat(selectedAmount);
            setTotalExpense(newTotalExpense);
            setTotalBalance(totalIncome - newTotalExpense);
        }

        const data = {
            Balance: selectedAmount,
            Date: selectedDate,
            Category: category,
            selectedCategory: selectedCategory
        };
        expenseIncome(data);
    }


    return (
        <div>
            <div className="flex gap-3 italic sm:flex-col md:flex-wrap sm:flex-wrap lg:flex-row flex-wrap justify-evenly items-center w-[100vw]">
                <div className="income lg:w-1/4 w-2/4" style={{boxShadow: "rgba(17, 17, 74, 0.879) 0px 30px 60px -12px inset, rgba(216, 211, 211, 0.942) 0px 18px 36px -18px inset"}}>
                    <p className='text-2xl text-white p-4 font-normal'>Income</p>
                    <div>
                        {category === 'Income' && (
                            <p className='text-2xl text-white px-4 pt-2 font-medium'>₹ {totalIncome - totalExpense}</p>
                        )}
                    </div>
                </div>

                <div className="expenseTracker lg:w-2/5 sm:w-3/4 w-4/4 mx-5" style={{ padding: "10px 15px",boxShadow: "rgba(36, 36, 116, 0.879) 0px 30px 60px -12px inset, rgba(216, 211, 211, 0.942) 0px 18px 36px -18px inset" }}>
                    <div className='px-3' style={{ lineHeight: "15px", padding: "0px 10px" }}>
                        <p className='text-2xl text-white pt-3 font-normal'>Expense Tracker</p>
                        <p className='text-blue-900 pt-2' style={{ letterSpacing: ".5px" }}>Now handle your expenses with ease</p>
                        <div className='pt-3' style={{ textAlign: "center", lineHeight: "10px" }}>
                            <h3 className='text-2xl text-blue-900 font-semibold'>Total Balance: ₹ {totalBalance}</h3>
                            <p className='pt-4 text-white'>Try saying:</p>
                            <p className='pt-4 leading-[20px] text-blue-900'>Add Income for ₹50 in Category Salary for Monday</p>
                        </div>
                        <hr className="mt-8 mb-3 w-full" />
                    </div>

                    <div className="flex sm:flex-wrap sm:flex-row flex-col gap-6 justify-between">
                        <select name="category" className="bg-[#0c356b] text-white w-[100%] sm:w-[46%] px-6 h-12" id="category" onChange={(e) => { setCategory(e.target.value) }} style={{borderRadius:"25px 0px 25px 0px"}} >
                            <option className='bg-[#051e4c]' value="Income">Income</option>
                            <option className='bg-[#051e4c]' value="Expense">Expense</option>
                        </select>
                        <input type="number" className="text-white border bg-[#0c356b] border-black text-black px-7 w-[100%] sm:w-[46%] h-12" placeholder="Enter amount" onChange={(e) => { setSelectedAmount(e.target.value) }} style={{borderRadius:"25px 0px 25px 0px"}} />
                        <input type="date" className="text-white border bg-[#0c356b] border-black text-black p-l2 px-6 w-[100%] sm:w-[46%] h-12" placeholder="Select date" onChange={(e) => setSelectedDate(e.target.value)} style={{borderRadius:"25px 0px 25px 0px"}} />
                        <div className="text-black w-[100%] sm:w-[46%] h-12">
                            {category === 'Income' ? (
                                <select className='text-white h-full bg-[#0c356b] w-full px-6 border border-none' name="incomeCategory" id="incomeCategory" onChange={(e) => setSelectedCategory(e.target.value)} style={{borderRadius:"25px 0px 25px 0px"}} >
                                    {incomeCategory.map((option, index) => (
                                        <option className='bg-[#051e4c]' key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <select className='text-white h-full bg-[#0c356b] w-full px-6 border border-none' name="expenseCategory" id="expenseCategory" onChange={(e) => setSelectedCategory(e.target.value)} style={{borderRadius:"25px 0px 25px 0px"}} >
                                    {expenseCategory.map((option, index) => (
                                        <option className='bg-[#051e4c]' key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    <div>
                        <ul className='mt-3' style={{ padding: "0px 5px" }}>
                            {data?.map((check, index) => (
                                <>
                                    <li key={index} className='flex px-1 tracking-wide shadow-lg justify-between align-items-center' style={{ listStyle: "none", width: "100%", paddingTop: "10px" }}>
                                        <p className=' text-blue-900 font-semibold '>{check.Category}, ₹{check.Balance}, {check.selectedCategory} , {check.Date}</p>
                                        <button className='bg-transparent text-blue-900' onClick={() => delIncome(check.id)}><i className="fa-solid fa-trash"></i></button>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                    <button className="hover-btn py-2 mb-7 font-semibold duration-1000 text-blue-900 w-full bg-transparent mt-5 hover:text-white hover:bg-[#0c356b]" style={{borderRadius:"25px 0px 25px 0px",border:"solid #1E3A8A"}} onClick={() => { handleCreate() }} >Create</button>
                </div>

                <div className="expense lg:w-1/4 w-2/4" style={{boxShadow: "rgba(21, 21, 87, 0.879) 0px 30px 60px -12px inset, rgba(216, 211, 211, 0.942) 0px 18px 36px -18px inset"}}>
                    <p className='text-2xl p-4 font-normal text-white'>Expense</p>
                    <div>
                        {category === 'Expense' && (
                            <p className='text-2xl px-4 text-white pt-2 font-medium'>₹ {totalExpense}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Expense

