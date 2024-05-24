import React, { useEffect, useState } from "react";
import "./Budget.css";
import axios from "axios";

export default function Budget() {
    const [budgets,setBudgets] = useState([]);
    const [edit, setEdit] = useState({
        category: "Budget Category...",
        amount: 10000,
        spentAmount:100,
        startDate:Date.now,
        endDate:Date.now
    });
    const [showEdit, setEditVisibility] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post(
            "http://localhost:3001/api/budget",
            {
                category: document.getElementById("category").value,
                amount: document.getElementById("amount").value,
                spentAmount: document.getElementById("spentAmount").value,
                startDate: document.getElementById("startDate").value,
                endDate: document.getElementById("endDate").value,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        if (response.status === 201) {
            setBudgets([...budgets, response.data.budgets]);
        }
    };

    const getBudget = async () => {
        const response = await axios.get("http://localhost:3001/api/budget", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setBudgets(response.data.budgets);
    };
    useEffect(() => getBudget, []);

    const deleteBudget = (id) => {
        axios.delete(`http://localhost:3001/api/budget/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setBudgets(budgets.filter((budget) => budget._id !== id));
    };

    const handleEdit = async (event, edit) => {
        event.preventDefault();
        const formData = {
            category: document.getElementById("edit-category").value || edit.category,
            amount:document.getElementById("edit-amount").valueAsNumber || edit.amount,
            spentAmount:document.getElementById("edit-spentAmount").valueAsNumber || edit.spentAmount,
            startDate: document.getElementById("edit-startDate").value || edit.startDate,
            endDate: document.getElementById("edit-endDate").value || edit.endDate,
        };
        const response = await axios.patch(
            `http://localhost:3001/api/budget/${edit._id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        let temp = budgets;
        temp = temp.filter((budget) => budget._id !== edit._id);
        temp.push(response.data.updatedBudget);
        setBudgets(temp);
        setEditVisibility(false);
    };

    return (
        <>
            <div className="income-component">
                <div className="income">
                    <h2 className="component-income">Submit Budget</h2>
                    <form className="income-form">
                        <input
                            type="text"
                            id="category"
                            placeholder="Enter Category..."
                            required
                        />{" "}
                        <input
                            type="date"
                            id="startDate"
                            placeholder="(Default: Today...)"
                            required
                        />{" "}
                        <br />
                        <input
                            type="date"
                            id="endDate"
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
                            type="number"
                            id="spentAmount"
                            placeholder="Enter Spent Amount..."
                            required
                        />{" "}
                        <br />
                        <br />
                        <input type="submit" id="submit" onClick={handleSubmit} />
                    </form>
                </div>

                <div className="income-list">
                    <h2 className="component-heading">List of Expenses</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>StartDate</th>
                                <th>EndDate</th>
                                <th>Amount</th>
                                <th>spentAmount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgets.map((budget) => (
                                <tr key={budget._id}>
                                    <td>{budget.category}</td>
                                    <td>{budget.startDate}</td>
                                    <td>{budget.endDate}</td>
                                    <td>{budget.amount}</td>
                                    <td>{budget.spentAmount}</td>
                                    <td>
                                        <button
                                            className="update"
                                            onClick={() => {
                                                setEditVisibility(true);
                                                setEdit(budget);
                                            }}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => deleteBudget(budget._id)}
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
                            <input
                                type="text"
                                id="edit-category"
                                placeholder={`${edit.category}`}
                            />
                            <br />
                            <input type="date" id="edit-startDate" placeholder={`${edit.startDate}`} />
                            <input type="date" id="edit-endDate" placeholder={`${edit.endDate}`} />
                            <input
                                type="number"
                                id="edit-amount"
                                placeholder={`${edit.amount}`}
                            />
                            <input
                                type="number"
                                id="edit-spentAmount"
                                placeholder={`${edit.spentAmountnt}`}
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

