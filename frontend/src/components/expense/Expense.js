// import React, { useEffect, useState } from "react";
// import "./Expense.css";
// import axios from "axios";

// export default function Expense() {
//     const [expenses, setExpenses] = useState([]);
//     const [edit, setEdit] = useState({
//         date: Date.now,
//         amount: 10000,
//         category: "Expense Category...",
//         description: "Description of you Expense Category...",
//     });
//     const [showEdit, setEditVisibility] = useState(false);
//     const [totalExpense, setTotalExpense] = useState(0);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const response = await axios.post(
//             "http://localhost:3001/api/expense",
//             {
//                 date: document.getElementById("date").value,
//                 amount: document.getElementById("amount").value,
//                 category: document.getElementById("category").value,
//                 description: document.getElementById("description").value,
//             },
//             {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token"),
//                 },
//             }
//         );
//         if (response.status === 201) {
//             setExpenses([...expenses, response.data.newExpense]);
//             setTotalExpense(totalExpense+parseFloat(response.data.newExpense.amount))
//             console.log(response.data.newExpense.amount);
//         }
//     };

//     const getExpense = async () => {
//         const response = await axios.get("http://localhost:3001/api/expense", {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });
//         setExpenses(response.data.expenses);
//     };
//     useEffect(() => getExpense, []);

//     const deleteExpense = (id) => {
//         axios.delete(`http://localhost:3001/api/expense/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });
//         setExpenses(expenses.filter((expense) => expense._id !== id));
//         setTotalExpense(totalExpense - expenses.find((expense) => expense._id === id).amount);
//     };

//     const handleEdit = async (event, edit) => {
//         event.preventDefault();
//         const formData = {
//             date: document.getElementById("edit-date").value || edit.date,
//             amount:
//                 document.getElementById("edit-amount").valueAsNumber || edit.amount,
//             category: document.getElementById("edit-category").value || edit.category,
//             description:
//                 document.getElementById("edit-description").value || edit.description,
//         };
//         const response = await axios.patch(
//             `http://localhost:3001/api/expense/${edit._id}`,
//             formData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             }
//         );
//         let temp = expenses;
//         temp = temp.filter((expense) => expense._id !== edit._id);
//         temp.push(response.data.updatedExpense);
//         setExpenses(temp);
//         setTotalExpense(totalExpense - edit.amount + response.data.updatedExpense.amount);
//         setEditVisibility(false);
//     };

//     return (
//         <>
//             <div className="income-component">
//                 <div className="income">
//                     <h2 className="component-income">Submit Expense</h2>
//                     <form className="income-form">
//                         <input
//                             type="date"
//                             id="date"
//                             placeholder="(Default: Today...)"
//                             required
//                         />{" "}
//                         <br />
//                         <input
//                             type="number"
//                             id="amount"
//                             placeholder="Enter Amount..."
//                             required
//                         />{" "}
//                         <br />
//                         <input
//                             type="text"
//                             id="category"
//                             placeholder="Enter Category..."
//                             required
//                         />{" "}
//                         <br />
//                         <textarea
//                             id="description"
//                             placeholder="Enter Description"
//                             rows={7}
//                             cols={10}
//                         />{" "}
//                         <br />
//                         <input type="submit" id="submit" onClick={handleSubmit} />
//                     </form>
//                 </div>

//                 <div className="income-list">
//                     <h2 className="component-heading">List of Expenses</h2>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Date</th>
//                                 <th>Amount</th>
//                                 <th>Category</th>
//                                 <th>Description</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {expenses.map((expense) => (
//                                 <tr key={expense._id}>
//                                     <td>{expense.date}</td>
//                                     <td>{expense.amount}</td>
//                                     <td>{expense.category}</td>
//                                     <td>{expense.description}</td>
//                                     <td>
//                                         <button
//                                             className="update"
//                                             onClick={() => {
//                                                 setEditVisibility(true);
//                                                 setEdit(expense);
//                                             }}
//                                         >
//                                             <i className="fa-solid fa-pen-to-square"></i>
//                                         </button>
//                                         <button
//                                             className="delete"
//                                             onClick={() => deleteExpense(expense._id)}
//                                         >
//                                             <i className="fa-solid fa-trash"></i>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <h3>Total Expense: {totalExpense.toFixed(2)}</h3>
//                 </div>
//             </div>
//             {showEdit && (
//                 <div className="income-stats">
//                     <div className="edit-income">
//                         <h2 className="component-heading">Edit Fields</h2>
//                         <form
//                             className="update-income-form"
//                             onSubmit={(event) => handleEdit(event, edit)}
//                         >
//                             <input type="date" id="edit-date" placeholder={`${edit.date}`} />
//                             <input
//                                 type="number"
//                                 id="edit-amount"
//                                 placeholder={`${edit.amount}`}
//                             />
//                             <input
//                                 type="text"
//                                 id="edit-category"
//                                 placeholder={`${edit.category}`}
//                             />
//                             <br />
//                             <textarea
//                                 id="edit-description"
//                                 placeholder={`${edit.description}`}
//                             />
//                             <br />
//                             <input type="submit" id="submit" />
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
import React, { useEffect, useState } from "react";
import "./Expense.css";
import axios from "axios";

export default function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [edit, setEdit] = useState({
        date: Date.now(),
        amount: 10000,
        category: "Expense Category...",
        description: "Description of your Expense Category...",
    });
    const [showEdit, setEditVisibility] = useState(false);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        getExpense();
    }, []); // Fetch expenses on component mount

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
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
                setTotalExpense(totalExpense + parseFloat(response.data.newExpense.amount));
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const getExpense = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/expense", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setExpenses(response.data.expenses);
            calculateTotalExpense(response.data.expenses);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/expense/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const deletedExpense = expenses.find((expense) => expense._id === id);
            if (deletedExpense) {
                setTotalExpense(totalExpense - parseFloat(deletedExpense.amount));
            }

            setExpenses(expenses.filter((expense) => expense._id !== id));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                date: document.getElementById("edit-date").value || edit.date,
                amount: parseFloat(document.getElementById("edit-amount").value) || edit.amount,
                category: document.getElementById("edit-category").value || edit.category,
                description: document.getElementById("edit-description").value || edit.description,
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

            setExpenses(expenses.map((expense) => (expense._id === edit._id ? response.data.updatedExpense : expense)));
            setTotalExpense(totalExpense - parseFloat(edit.amount) + parseFloat(response.data.updatedExpense.amount));
            setEditVisibility(false);
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    const calculateTotalExpense = (expensesList) => {
        const total = expensesList.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        setTotalExpense(total);
    };

    return (
        <>
            <div className="income-component">
                <div className="income">
                    <h2 className="component-income">Submit Expense</h2>
                    <form className="income-form" onSubmit={handleSubmit}>
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
                        <input type="submit" id="submit" />
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
                    <h3>Total Expense: {totalExpense.toFixed(2)}</h3>
                </div>
            </div>
            {showEdit && (
                <div className="income-stats">
                    <div className="edit-income">
                        <h2 className="component-heading">Edit Fields</h2>
                        <form
                            className="update-income-form"
                            onSubmit={handleEdit}
                        >
                            <input type="date" id="edit-date" defaultValue={edit.date} />
                            <input
                                type="number"
                                id="edit-amount"
                                defaultValue={edit.amount}
                            />
                            <input
                                type="text"
                                id="edit-category"
                                defaultValue={edit.category}
                            />
                            <br />
                            <textarea
                                id="edit-description"
                                defaultValue={edit.description}
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
