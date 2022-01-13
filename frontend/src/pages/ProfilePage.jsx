import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOneUserInfo, editUserInfo } from "../lib/AllDB";
import Form from "react-bootstrap/Form";
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from '@mui/material/Avatar';
import userImage from '../assets/user.png';

export default function ProfilePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  console.log(user)
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [phone, setPhone] = useState(user.phone);
  const [bio, SetBio] = useState(user.bio);
  const [rating, SetRating] = useState(user.rating);
  const [ratingAvg, SetRatingAvg] = useState(user.rating);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    SetRatingAvg(calculateRating(rating));
  }, []);

  const calculateRating = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  };

  const handleNameChange = (e) => (editMode ? setName(e.target.value) : "");
  const handleEmailChange = (e) => (editMode ? setEmail(e.target.value) : "");
  const handlePhoneChange = (e) => (editMode ? setPhone(e.target.value) : "");
  const handleBioChange = (e) => (editMode ? SetBio(e.target.value) : "");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name,
        email,
        phone,
        bio,
      };
      if (window.confirm("Confirm changes")) {
        // const response = await editUserInfo(token, user, currentUser.email);
        // if (response.affectedRows === 1) alert("Edit Successful");
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center profile-page-container">
      <h1 className="m-auto">Profile page</h1>
      <Avatar sx={{width:"100px",height:"100px"}} alt={user.name} src={userImage}/>
      <form className="d-flex m-auto my-3 w-75 profile-form desktop-wrapper width-100" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="col d-flex flex-wrap align-items-end">
          <label className="bold profile-label">Role</label>
          <input type="text" readOnly value={role} className="form-control form-input" />
        </div>
        <div className="col d-flex flex-wrap align-items-end">
          <label className="bold profile-label">Rating</label>
          <input type="text" readOnly value={ratingAvg} className="form-control form-input" />
        </div>
        <div className="col d-flex flex-wrap align-items-end">
          <label className="bold profile-label">Email</label>
          <input type="text" onChange={(e) => handleEmailChange(e)} value={email} className="form-control form-input" />
        </div>
        <div className="col d-flex flex-wrap align-items-end">
          <label className="bold profile-label">Full name</label>
          <input type="text" onChange={(e) => handleNameChange(e)} value={name} className="form-control form-input" maxLength="30" required />
        </div>
        <div className="col d-flex flex-wrap align-items-end">
          <label className="bold profile-label">Phone</label>
          <input type="text" onChange={(e) => handlePhoneChange(e)} value={phone} className="form-control form-input" maxLength="20" required />
        </div>
        <div className="col d-flex flex-wrap align-items-end">
          <label className="bold profile-label">Bio</label>
          <input type="text" onChange={(e) => handleBioChange(e)} value={bio} className="form-control form-input" maxLength="250" required />
        </div>

        <div className="col d-flex width-100">
          {!editMode && (
            <button type="button" onClick={() => setEditMode(true)} className="btn btn-sm btn-warning border round-button width-100">
              Enable Edit Mode
            </button>
          )}

          {editMode && (
            <button type="submit" className="btn btn-sm btn-success border round-button width-100">
              Save changes
            </button>
          )}
        </div>
      </form>

      {editMode === false && <div></div>}
    </div>
  );
}
