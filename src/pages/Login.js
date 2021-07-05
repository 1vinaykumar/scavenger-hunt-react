import React, { useState } from "react";
import useAPI from "../utils/useAPI";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const { login } = useAPI();

  return (
    <div className="container">
      <form
        className="my-5 row justify-content-center"
        onSubmit={(event) => {
          event.preventDefault();
          login({ userName, password, role });
        }}
      >
        <div className="col-10 col-md-5">
          <div className="form-group my-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>

          <div className="form-group my-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="form-group my-3">
            <label className="form-label">Login As</label>
            <select
              className="form-select"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="USER">Branch</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="form-group my-5">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
