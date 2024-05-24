import React, { useEffect, useState } from "react";
import "./Investment.css";
import axios from "axios";

export default function Investment() {
  const [investments, setInvestments] = useState([]);
  const [edit, setEdit] = useState({
    investmentName:"Investment 1",
    amountInvested: 10000,
    currentValue:200,
    startDate: Date.now,
    description: "Description of your Investment...",
  });
  const [showEdit, setEditVisibility] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:3001/api/saving",
      {
        investmentName: document.getElementById("investmentName").value,
        amountInvested: document.getElementById("amountInvested").value,
        currentValue: document.getElementById("currentValue").value,
        startDate: document.getElementById("startDate").value,
        description: document.getElementById("description").value,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 201) {
      setInvestments([...investments, response.data.investment]);
    }
  };

  const getInvestment = async () => {
    const response = await axios.get("http://localhost:3001/api/saving", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setInvestments(response.data.investments);
  }
  useEffect(() => getInvestment, []);

  const deleteInvestment = (id) => {
    axios.delete(`http://localhost:3001/api/investment/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setInvestments(investments.filter((investment) => investment._id !== id));
  };

  const handleEdit = async (event, edit) => {
    event.preventDefault();
    const formData = {
      investmentName: document.getElementById("edit-investmentName").value || edit.investmentName,
      amountInvested:document.getElementById("edit-amountInvested").valueAsNumber || edit.amountInvested,
      currentValue:document.getElementById("edit-currentValue").valueAsNumber || edit.currentValue,
      startDate: document.getElementById("edit-startDate").value || edit.startDate,
      description:document.getElementById("edit-description").value || edit.description,
    };
    const response = await axios.patch(
      `http://localhost:3001/api/saving/${edit._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    let temp = investments;
    temp = temp.filter((investment) => investment._id !== edit._id);
    temp.push(response.data.investment);
    setInvestments(temp);
    setEditVisibility(false);
  };

  return (
    <>
      <div className="income-component">
        <div className="income">
          <h2 className="component-income">Submit Investment</h2>
          <form className="income-form">
            <input
              type="text"
              id="investmentName"
              placeholder="Enter investmentName..."
              required
            />{" "}
            <br />
            <input
              type="number"
              id="amountInvested"
              placeholder="Enter amount Invested..."
              required
            />{" "}
            <br />
            <input
              type="number"
              id="currentValue"
              placeholder="Enter current Value..."
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
          <h2 className="component-heading">Investments</h2>
          <table>
            <thead>
              <tr>
                <th>investmentName</th>
                <th>Amount Invested</th>
                <th>currentValue</th>
                <th>Start Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                  <tr key={investment._id}>
                  <td>{investment.investmentName}</td>
                  <td>{investment.amountInvested}</td>
                  <td>{investment.currentValue}</td>
                  <td>{investment.startDate}</td>
                  <td>{investment.description}</td>
                  <td>
                    <button
                      className="update"
                      onClick={() => {
                        setEditVisibility(true);
                        setEdit(investment);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteInvestment(investment._id)}
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
                id="edit-investmentName"
                placeholder={`${edit.investmentName}`}
              />
              <input
                type="number"
                id="edit-amountInvested"
                placeholder={`${edit.amountInvested}`}
              />
              <input
                type="number"
                id="edit-currentValue"
                placeholder={`${edit.currentValue}`}
              />
              <input type="date" id="edit-startDate" placeholder={`${edit.startDate}`} />
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
