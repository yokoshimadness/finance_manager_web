import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Expenses() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState('all');
    const [editExpense, setEditExpense] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (!category) {
            alert('Please select a category');
            return;
        }

        const expenseData = { amount, description, category };

        try {
            if (editExpense) {
                await axios.put(`http://localhost:5000/api/expenses/${editExpense._id}`, expenseData);
                alert('Expense updated');
                setEditExpense(null);
            } else {
                await axios.post('http://localhost:5000/api/expenses', expenseData);
                alert('Expense added');
            }
            fetchExpenses();
            setAmount('');
            setDescription('');
            setCategory('');
        } catch (err) {
            alert('Error adding or updating expense');
            console.error(err);
        }
    };

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/expenses');
            setExpenses(res.data);
        } catch (err) {
            console.error('Error fetching expenses:', err);
        }
    };

    const handleEdit = (expense) => {
        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
        setEditExpense(expense);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/expenses/${id}`);
            alert('Expense deleted');
            fetchExpenses();
        } catch (err) {
            console.error('Error deleting expense:', err);
            alert('Error deleting expense');
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const filteredExpenses = filteredCategory === 'all'
        ? expenses
        : expenses.filter(expense => expense.category === filteredCategory);

    return (
        <div className="expenses">
            <h1>Expenses</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="40"
                    />
                    <p
                        className={`char-count ${description.length === 40 ? 'warning' : ''}`}
                    >
                        {description.length}/40 characters
                    </p>


                </div>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select category</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="housing">Housing</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">{editExpense ? 'Update Expense' : 'Add Expense'}</button>
            </form>

            <h2>Expense List:</h2>
            <div className="filter-container">
                <label>Filter by category:</label>
                <select value={filteredCategory} onChange={(e) => setFilteredCategory(e.target.value)}>
                    <option value="all">All</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="housing">Housing</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <ul>
                {filteredExpenses.length === 0 ? (
                    <li>No expenses available.</li>
                ) : (
                    filteredExpenses.map((expense) => (
                        <li key={expense._id}>
                            ${expense.amount} - {expense.description} - {expense.category}
                            <div className="buttons-container">
                                <button className="edit-btn" onClick={() => handleEdit(expense)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(expense._id)}>Delete</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Expenses;
