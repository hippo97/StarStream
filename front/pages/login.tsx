import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Router from "next/router";

import { currentUserVar, GET_CURRENT_USER } from "../lib/cache";
import { useForm } from "../utils/hooks";

const LoginPage = () => {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [login, loginResult] = useMutation(LOGIN_USER);
  const currentUserResult = useQuery(GET_CURRENT_USER);

  const loginData = loginResult.data?.login;
  const currentUser = currentUserResult.data?.user;
  function loginUserCallback() {
    login({ variables: { email: values.email, password: values.password } });
  }

  console.log(loginData);

  useEffect(() => {
    if (loginData) {
      currentUserVar(loginData);
      alert("로그인 성공");
      Router.push("/");
    } else if (loginData === null)
      alert("아이디 또는 비밀번호를 잘못 입력했습니다.");

    return () => {
      if (loginData) {
        alert("끝");
      }
    };
  }, [loginData]);

  if (currentUser) Router.push("/");
  if (loginResult.loading) return "loading...";
  if (loginResult.error)
    console.log(JSON.stringify(loginResult.error, null, 2));

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit" value="로그인">
            로그인
          </button>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
    }
  }
`;

export default LoginPage;
