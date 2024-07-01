// import React, { useEffect, useState } from "react";
// import "./Income.css";
// import axios from "axios";
  
// export default function Income() {
//   const [incomes, setIncomes] = useState([]);
//   const [edit, setEdit] = useState();
//   const [showEdit, setEditVisibility] = useState(false);
//   const [totalIncome, setTotalIncome] = useState(0);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await axios.post(
//       "http://localhost:3001/api/income",
//       {
//         date: document.getElementById("date").value,
//         amount: document.getElementById("amount").value,
//         source: document.getElementById("source").value,
//         description: document.getElementById("description").value,
//       },
//       {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       }
//     );
//     if (response.status === 201) {
//       setIncomes([...incomes, response.data.income]);
//       setTotalIncome(totalIncome + parseFloat(response.data.income.amount));

//     }
//   };

//   const getIncome = async () => {
//     const response = await axios.get("http://localhost:3001/api/income", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     setIncomes(response.data.income);
//   };
//   useEffect(() => getIncome, []);

//   const deleteIncome = (id) => {
//     axios.delete(`http://localhost:3001/api/income/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     setIncomes(incomes.filter((income) => income._id !== id));
//     setTotalIncome(totalIncome - incomes.find((income) => income._id === id).amount);

//   };

//   const handleEdit = async (event, edit) => {
//     event.preventDefault();
//     const formData = {
//       date: document.getElementById("edit-date").value || edit.date,
//       amount:
//         document.getElementById("edit-amount").valueAsNumber || edit.amount,
//       source: document.getElementById("edit-source").value || edit.source,
//       description:
//         document.getElementById("edit-description").value || edit.description,
//     };
//     const response = await axios.patch(
//       `http://localhost:3001/api/income/${edit._id}`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     let temp = incomes;
//     temp = temp.filter((income) => income._id !== edit._id);
//     temp.push(response.data.updatedIncome);
//     setIncomes(temp);
//     setTotalIncome(totalIncome - edit.amount + response.data.updatedIncome.amount);
//     setEditVisibility(false);
//   };

//   return (
//     <>
//       <div className="income-component">
//         <div className="income">
//           <h2 className="component-income">Submit Income</h2>
//           <form className="income-form">
//             <input
//               type="date"
//               id="date"
//               placeholder="(Default: Today...)"
//               required
//             />{" "}
//             <br />
//             <input
//               type="number"
//               id="amount"
//               placeholder="Enter Amount..."
//               required
//             />{" "}
//             <br />
//             <input
//               type="text"
//               id="source"
//               placeholder="Enter Source..."
//               required
//             />{" "}
//             <br />
//             <textarea
//               id="description"
//               placeholder="Enter Description"
//               rows={7}
//               cols={10}
//             />{" "}
//             <br />
//             <input type="submit" id="submit" onClick={handleSubmit} />
//           </form>
//         </div>

//         <div className="income-list">
//           <h2 className="component-heading">Income Sources</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Source</th>
//                 <th>Description</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {incomes.map((income) => (
//                 <tr key={income._id}>
//                   <td>{income.date}</td>
//                   <td>{income.amount}</td>
//                   <td>{income.source}</td>
//                   <td>{income.description}</td>
//                   <td>
//                     <button
//                       className="update"
//                       onClick={() => {
//                         setEditVisibility(true);
//                         setEdit(income);
//                       }}
//                     >
//                       <i className="fa-solid fa-pen-to-square"></i>
//                     </button>
//                     <button
//                       className="delete"
//                       onClick={() => deleteIncome(income._id)}
//                     >
//                       <i className="fa-solid fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <h3>Total Income: {totalIncome.toFixed(2)}</h3>
//         </div>
//       </div>
//       {showEdit && (
//         <div className="edit-income">
//           <h2 className="component-heading">Edit Fields</h2>
//           <form
//             className="update-income-form"
//             onSubmit={(event) => handleEdit(event, edit)}
//           >
//             <input type="date" id="edit-date" placeholder={`${edit.date}`} />
//             <input
//               type="number"
//               id="edit-amount"
//               placeholder={`${edit.amount}`}
//             />
//             <input
//               type="text"
//               id="edit-source"
//               placeholder={`${edit.source}`}
//             />
//             <br />
//             <textarea
//               id="edit-description"
//               placeholder={`${edit.description}`}
//             />
//             <br />
//             <input type="submit" id="submit" />
//           </form>
//         </div>
//       )}
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import "./Income.css";
import axios from "axios";

export default function Income() {
  const [incomes, setIncomes] = useState([]);
  const [edit, setEdit] = useState();
  const [showEdit, setEditVisibility] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:3001/api/income",
      {
        date: document.getElementById("date").value,
        amount: document.getElementById("amount").value,
        source: document.getElementById("source").value,
        description: document.getElementById("description").value,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 201) {
      setIncomes([...incomes, response.data.income]);
      setTotalIncome(totalIncome + parseFloat(response.data.income.amount));
    }
  };

  const getIncome = async () => {
    const response = await axios.get("http://localhost:3001/api/income", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setIncomes(response.data.income);
    setTotalIncome(
      response.data.income.reduce((total, income) => total + income.amount, 0)
    );
  };
  useEffect(() => getIncome, []);

  const deleteIncome = (id) => {
    axios.delete(`http://localhost:3001/api/income/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setIncomes(incomes.filter((income) => income._id !== id));
    setTotalIncome(totalIncome - incomes.find((income) => income._id === id).amount);
  };

  const handleEdit = async (event, edit) => {
    event.preventDefault();
    const formData = {
      date: document.getElementById("edit-date").value || edit.date,
      amount:
        document.getElementById("edit-amount").valueAsNumber || edit.amount,
      source: document.getElementById("edit-source").value || edit.source,
      description:
        document.getElementById("edit-description").value || edit.description,
    };
    const response = await axios.patch(
      `http://localhost:3001/api/income/${edit._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    let temp = incomes;
    temp = temp.filter((income) => income._id !== edit._id);
    temp.push(response.data.updatedIncome);
    setIncomes(temp);
    setTotalIncome(totalIncome - edit.amount + response.data.updatedIncome.amount);
    setEditVisibility(false);
  };

  return (
    <>
      <div className="income-component">
        <div className="income">
          <h2 className="component-income">Submit Income</h2>
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
              id="source"
              placeholder="Enter Source..."
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
           <h2 className="component-heading">Income Sources</h2>
           <table>
             <thead>
               <tr>
                 <th>Date</th>
                 <th>Amount</th>
                 <th>Source</th>
                 <th>Description</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
             {incomes.map((income) => (
                <tr key={income._id}>
                  <td>{income.date}</td>
                  <td>{income.amount}</td>
                  <td>{income.source}</td>
                  <td>{income.description}</td>
                  <td>
                    <button
                      className="update"
                      onClick={() => {
                        setEditVisibility(true);
                        setEdit(income);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteIncome(income._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Income: {totalIncome.toFixed(2)}</h3>
        </div>
      </div>
       {showEdit && (
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
              id="edit-source"
              placeholder={`${edit.source}`}
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
      )}

    </>
  );
}