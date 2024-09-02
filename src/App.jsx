import React, { useEffect, useState } from "react";
import { EmployeData } from "./EmployeData";

const App = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    setData(EmployeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
    setUpdate(true);
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("are you sure to delete this item")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = () => {
    let error = "";

    if (firstName === "") error += "first name is required, ";
    if (lastName === "") error += "last name is required, ";
    if (age <= 0) error += "age is required, ";
    if (error === "") {
      const dt = [...data];
      const newObject = {
        id: EmployeData.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      };
      dt.push(newObject);
      setData(dt);
      handleClear();
    }else{
      alert(error )
    }
  };
  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };
  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge(0);
    setUpdate(false);
  };
  return (
    <div className="containerss">
      <div
        style={{ display: "flex", justifyContent: "center", padding: "5px" }}
      >
        <div>
          <label>
            first Name :
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Please Enter Your Name"
            />
          </label>
        </div>
        <div>
          <label>
            last Name :
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Please Enter Your Name"
            />
          </label>
        </div>
        <div>
          <label>
            Age :
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              placeholder="Please Enter Your Name"
            />
          </label>
        </div>
        <div>
          {!update ? (
            <button className="btn btn-primary" onClick={() => handleSave(id)}>
              Save
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => handleUpdate(id)}
            >
              Update
            </button>
          )}
        </div>

        <button className="btn btn-danger" onClick={() => handleClear()}>
          Clear
        </button>
      </div>
      <table className="table table-row">
        <thead>
          <tr>
            <td>Sr.No.</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1} </td>
                <td>{item.id} </td>

                <td>{item.firstName} </td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
