import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import Router from "next/router";

import { GET_CURRENT_USER } from "../lib/cache";

function App() {
  const currentUser = useQuery(GET_CURRENT_USER);
  const user = currentUser.data?.user;

  console.log("user", user);

  useEffect(() => {
    if (user === null) Router.push("/login");
  });

  return (
    <div>
      <h1>Hi world!</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.token}</h1>
    </div>
  );
}

export default App;
