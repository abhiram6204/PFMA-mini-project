import React, { useEffect, useState } from "react";
import "./Expense.css";
import axios from "axios";

export default function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [edit, setEdit] = useState({
        date: Date.now,
        amount: 10000,
        category: "Expense Category...",
        description: "Description of you Expense Category...",
    });
    const [showEdit, setEditVisibility] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post(
            "http://localhost:3001/api/expense",
            {
                date: document.getElementById("date").value,
                amount: document.getElementById("amount").value,
                category: document.getElementById("category").value,
                description: document.getElementById("description").value,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        if (response.status === 201) {
            setExpenses([...expenses, response.data.newExpense]);
            console.log(expenses);
        }
    };

    const getExpense = async () => {
        const response = await axios.get("http://localhost:3001/api/expense", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setExpenses(response.data.expenses);
    };
    useEffect(() => getExpense, []);

    const deleteExpense = (id) => {
        axios.delete(`http://localhost:3001/api/expense/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setExpenses(expenses.filter((expense) => expense._id !== id));
    };

    const handleEdit = async (event, edit) => {
        event.preventDefault();
        const formData = {
            date: document.getElementById("edit-date").value || edit.date,
            amount:
                document.getElementById("edit-amount").valueAsNumber || edit.amount,
            category: document.getElementById("edit-category").value || edit.category,
            description:
                document.getElementById("edit-description").value || edit.description,
        };
        const response = await axios.patch(
            `http://localhost:3001/api/expense/${edit._id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        let temp = expenses;
        temp = temp.filter((expense) => expense._id !== edit._id);
        temp.push(response.data.updatedExpense);
        setExpenses(temp);
        setEditVisibility(false);
    };

    return (
        <>
            <div className="income-component">
                <div className="income">
                    <h2 className="component-income">Submit Expense</h2>
                    <form className="income-form">
                        <input
                            type="date"
                            id="date"
                            placeholder="(Default: Today...)"
                            required
                        />{" "}
                        <br />
                        <input
                            type="number"
                            id="amount"
                            placeholder="Enter Amount..."
                            required
                        />{" "}
                        <br />
                        <input
                            type="text"
                            id="category"
                            placeholder="Enter Category..."
                            required
                        />{" "}
                        <br />
                        <textarea
                            id="description"
                            placeholder="Enter Description"
                            rows={7}
                            cols={10}
                        />{" "}
                        <br />
                        <input type="submit" id="submit" onClick={handleSubmit} />
                    </form>
                </div>

                <div className="income-list">
                    <h2 className="component-heading">List of Expenses</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense._id}>
                                    <td>{expense.date}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.description}</td>
                                    <td>
                                        <button
                                            className="update"
                                            onClick={() => {
                                                setEditVisibility(true);
                                                setEdit(expense);
                                            }}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => deleteExpense(expense._id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showEdit && (
                <div className="income-stats">
                    <div className="edit-income">
                        <h2 className="component-heading">Edit Fields</h2>
                        <form
                            className="update-income-form"
                            onSubmit={(event) => handleEdit(event, edit)}
                        >
                            <input type="date" id="edit-date" placeholder={`${edit.date}`} />
                            <input
                                type="number"
                                id="edit-amount"
                                placeholder={`${edit.amount}`}
                            />
                            <input
                                type="text"
                                id="edit-category"
                                placeholder={`${edit.category}`}
                            />
                            <br />
                            <textarea
                                id="edit-description"
                                placeholder={`${edit.description}`}
                            />
                            <br />
                            <input type="submit" id="submit" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
