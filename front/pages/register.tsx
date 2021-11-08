import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

import { useForm } from "../utils/hooks";

function Register(props: any) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading, data, error }] = useMutation(REGISTER_USER);

  console.log(data);
  function registerUser() {
    addUser({ variables: { email: values.email, password: values.password } });
  }

  if (loading) return "Loading...";
  if (error) console.log(JSON.stringify(error, null, 2));

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <input
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <input
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <input
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <input
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
    }
  }
`;

export default Register;
