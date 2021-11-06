import { useQuery, gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import Router from "next/router";

import { currentUserVar, GET_CURRENT_USER } from "../lib/cache";
import { useForm } from "../utils/hooks";

function App() {
  const currentUser = useQuery(GET_CURRENT_USER);
  const user = currentUser.data?.user;

  const { onChange, onSubmit, values } = useForm(logoutUser, {});
  const [logout, logoutResult] = useMutation(LOGOUT_USER);
  //console.log("user", user);

  function logoutUser() {
    logout();
  }

  useEffect(() => {
    if (user === null) Router.push("/login");
    if (logoutResult.data?.logout === true) {
      currentUserVar(null);
      alert("로그아웃 성공");
      Router.push("/login");
    } else if (logoutResult.data?.logout === false) {
      alert("로그아웃에 실패했습니다");
    }
  }, [logoutResult.data]);

  return (
    <div>
      <h1>Hi world!</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.token}</h1>
      {user && (
        <button type="button" onClick={onSubmit}>
          로그아웃
        </button>
      )}
    </div>
  );
}

const LOGOUT_USER = gql`
  mutation {
    logout
  }
`;

export default App;
