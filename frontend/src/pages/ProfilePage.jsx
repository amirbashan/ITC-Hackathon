import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { getFullUserInfo, editUserInfo } from "../lib/UsersDB";
import Form from "react-bootstrap/Form";

export default function ProfilePage() {
  const { currentUser, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, SetBio] = useState("");
  const [role, SetRole] = useState("");
  const [joined, setJoined] = useState("");
  const [editMode, setEditMode] = useState(false);

  if (!currentUser) navigate(`/`);

  useEffect(() => {
    getFullUserInfo(token).then((response) => {
      setFirst_name(response.first_name);
      setLast_name(response.last_name);
      setPhone(response.phone);
      SetBio(response.bio);
      SetRole(response.isAdmin);
      setJoined(response.created_date);
    });
  }, [token]);

  const fixData = (date) => {
    const newDate = date.substr(8, 2) + "-" + date.substr(5, 2) + "-" + date.substr(0, 4);
    return newDate;
  };

  const handleFirstNameChange = (e) => (editMode ? setFirst_name(e.target.value) : "");
  const handleLastNameChange = (e) => (editMode ? setLast_name(e.target.value) : "");
  const handlePhoneChange = (e) => (editMode ? setPhone(e.target.value) : "");
  const handleBioChange = (e) => (editMode ? SetBio(e.target.value) : "");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        first_name,
        last_name,
        phone,
        bio,
      };
      if (window.confirm("Confirm changes")) {
        const response = await editUserInfo(token, user, currentUser.email);
        if (response.affectedRows === 1) alert("Edit Successful");
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <h1 className="m-auto">Profile page</h1>
      <Form className="d-flex m-auto my-3 w-75" onSubmit={(e) => handleOnSubmit(e)}>
        <Form.Group className="d-flex flex-column w-75 m-auto">
          <div className="row mb-2">
            <div className="col d-flex flex-wrap align-items-end">
              <label>Email</label>
              <input type="text" readOnly value={currentUser.email} className="form-control" />
            </div>
            <div className="col-3 d-flex flex-wrap align-items-end">
              <label>Joined date</label>
              <input type="text" readOnly value={fixData(joined)} className="form-control" />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col d-flex flex-wrap align-items-end">
              <label>First name</label>
              <input type="text" onChange={(e) => handleFirstNameChange(e)} value={first_name} className="form-control" maxLength="30" required />
            </div>
            <div className="col d-flex flex-wrap align-items-end">
              <label>Last Name</label>
              <input type="text" onChange={(e) => handleLastNameChange(e)} value={last_name} className="form-control" maxLength="30" required />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col d-flex flex-wrap align-items-end">
              <label>Phone</label>
              <input type="text" onChange={(e) => handlePhoneChange(e)} value={phone} className="form-control" maxLength="20" required />
            </div>
            <div className="col d-flex flex-wrap align-items-end">
              <label>role</label>
              <input type="text" readOnly value={role === 1 ? "Admin" : "User"} className="form-control" />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col d-flex flex-wrap align-items-end">
              <label>Bio</label>
              <input type="text" onChange={(e) => handleBioChange(e)} value={bio} className="form-control" maxLength="250" required />
            </div>
          </div>
          <div className="row my-2">
            <div className="col d-flex">
              {!editMode && (
                <button type="button" onClick={() => setEditMode(true)} className="btn btn-sm btn-warning border ">
                  Enable Edit Mode
                </button>
              )}

              {editMode && (
                <button type="submit" className="btn btn-sm btn-success border ">
                  Save changes
                </button>
              )}
            </div>
          </div>
        </Form.Group>
      </Form>

      {editMode === false && <div></div>}
    </div>
  );
}
