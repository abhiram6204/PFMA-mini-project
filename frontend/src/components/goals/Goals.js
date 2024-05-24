import React, { useEffect, useState } from "react";
import "./Goals.css";
import axios from "axios";

export default function Goals() {
    const [goals, setGoals] = useState([]);
    const [edit, setEdit] = useState({
        goalName:"Goal 1",
        targetAmount:10000,
        currentAmount: 100,
        startDate: Date.now,
        targetDate: Date.now,
        description: "Description of you Goal...",
    });
    const [showEdit, setEditVisibility] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post(
            "http://localhost:3001/api/goal",
            {
                goalName: document.getElementById("goalName").value,
                targetAmount: document.getElementById("targetAmount").value,
                currentAmount: document.getElementById("currentAmount").value,
                startDate: document.getElementById("startDate").value,
                targetDate: document.getElementById("targetDate").value,
                description: document.getElementById("description").value,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        if (response.status === 201) {
            setGoals([...goals, response.data.goal]);
        }
    };

    const getGoal = async () => {
        const response = await axios.get("http://localhost:3001/api/goal", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setGoals(response.data.goals);
    }
    useEffect(() => getGoal, []);

    const deleteGoal = (id) => {
        axios.delete(`http://localhost:3001/api/goal/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setGoals(goals.filter((goal) => goal._id !== id));
    };

    const handleEdit = async (event, edit) => {
        event.preventDefault();
        const formData = {
            goalName:document.getElementById("edit-goalName").value||edit.goalName,
            targetAmount:document.getElementById("edit-targetAmount").valueAsNumber || edit.targetAmount,
            currentAmount:document.getElementById("edit-currentAmount").valueAsNumber || edit.currentAmount,
            startDate: document.getElementById("edit-startDate").value || edit.startDate,
            description:document.getElementById("edit-description").value || edit.description,
        };
        const response = await axios.patch(
            `http://localhost:3001/api/goal/${edit._id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        let temp = goals;
        temp = temp.filter((goal) => goal._id !== edit._id);
        temp.push(response.data.updatedGoal);
        setGoals(temp);
        setEditVisibility(false);
    };

    return (
        <>
            <div className="income-component">
                <div className="income">
                    <h2 className="component-income">Submit Goal</h2>
                    <form className="income-form">
                        <input
                            type="text"
                            id="goalName"
                            placeholder="(Default: Goal 1...)"
                            required
                        />{" "}
                        <br />
                        <input
                            type="number"
                            id="targetAmount"
                            placeholder="Enter target Amount..."
                            required
                        />{" "}
                        <br />
                        <input
                            type="number"
                            id="currentAmount"
                            placeholder="Enter current Amount..."
                            required
                        />{" "}
                        <br />
                        <input
                            type="date"
                            id="startDate"
                            placeholder="(Default: Today...)"
                            required
                        />{" "}
                        <br />
                        <input
                            type="date"
                            id="targetDate"
                            placeholder="(Default: Today...)"
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
                    <h2 className="component-heading">List of Goals</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Goal Name</th>
                                <th>Target Amount</th>
                                <th>Current Amount</th>
                                <th>Start Date</th>
                                <th>Target Date</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {goals.map((goal) => (
                                <tr key={goal._id}>
                                    <td>{goal.goalName}</td>
                                    <td>{goal.startDate}</td>
                                    <td>{goal.targetDate}</td>
                                    <td>{goal.amount}</td>
                                    <td>{goal.targetAmount}</td>
                                    <td>{goal.description}</td>
                                    <td>
                                        <button
                                            className="update"
                                            onClick={() => {
                                                setEditVisibility(true);
                                                setEdit(goal);
                                            }}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => deleteGoal(goal._id)}
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
                                id="edit-goalName"
                                placeholder={`${edit.goalName}`}
                            />
                            <br />
                            <input type="date" id="edit-startDate" placeholder={`${edit.startDate}`} />
                            <input type="date" id="edit-targetDate" placeholder={`${edit.targetDate}`} />
                            <input
                                type="number"
                                id="edit-targetAmount"
                                placeholder={`${edit.targetAmount}`}
                            />
                            <input
                                type="number"
                                id="edit-currentAmount"
                                placeholder={`${edit.currentAmount}`}
                            />
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
