import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import Swal from 'sweetalert2';


const Users = () => {
  const [passwordRetype, setPasswordRetype] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]); 


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password != passwordRetype ){

      Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Password does not match',
            });

      return;
    }

    const usersData = { username, email, password, passwordRetype };
    try {
      await axios.post('http://localhost:5000/users', usersData);
      console.log('User data submitted successfully');
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  useEffect(() => {
     const fetchUsers = async () => {

      try{
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      }catch(error){
        console.error('Error fetching users:', error);
      }

     }
     fetchUsers();
  }, []);

  return (
    <div className="container-fluid"> {/* Full-width container */}
      <h2 className="text-white bg-dark text-center py-3">USERS LIST</h2>
      <form onSubmit={handleSubmit}>
        <div className="row align-items-center"> {/* Align items in one line */}
          {/* Username Input */}
          <div className="col-4 col-md-3"> {/* Adjust width */}
            <label className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi-gear"></i> {/* Bootstrap Icons */}
              </span>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          {/* Email Input */}
          <div className="col-4 col-md-3"> {/* Adjust width */}
            <label className="form-label">Email or Phone</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi-envelope"></i> {/* Bootstrap Icons */}
              </span>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* Password Input */}
          <div className="col-4 col-md-3"> {/* Adjust width */}
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi-lock"></i> {/* Bootstrap Icons */}
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Re-type Password Input */}
          <div className="col-4 col-md-3"> {/* Adjust width */}
            <label className="form-label">Re-type Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi-lock-fill"></i> {/* Bootstrap Icons */}
              </span>
              <input
                type="password"
                name="passwordRetype"
                className="form-control"
                placeholder="Re-type Password"
                value={passwordRetype}
                onChange={(e) => setPasswordRetype(e.target.value)}
              />
            </div>
          </div>
          {/* Save Button */}
          <div className="col-12 col-md-3 mt-4"> {/* Adjust button width */}
            <button
              className="btn btn-primary w-100" /* Full-width button */
              type="submit"
              style={{ padding: '10px 20px' }}
            >
              <i className="bi-save"></i> Save
            </button>
          </div>
        </div>
      </form>
 {/* Users Table */}
 <div className="mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.length === 0 ? (
  <tr>
    <td colSpan="4">No users found.</td>
  </tr>
) : (
  users.map((user, index) => (
    <tr key={user._id}>
      <th scope="row">{index + 1}</th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        <button className="btn btn-warning btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm ml-2">Delete</button>
      </td>
    </tr>
  ))
)}

          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Users;
