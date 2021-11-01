import React, { useState } from "react";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {};

  return (
    <div>
      <div>
        <input
          type="text"
          id="inputId"
          onChange={(v) => setId(v.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          id="inputPassword"
          onChange={(v) => setPassword(v.target.value)}
        />
      </div>
      <div>
        <button type="submit" value="로그인" onClick={onSubmit}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
