import React, { ChangeEvent, useState } from "react";
import styles from "./Login.module.scss";

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleUserInform = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = () => console.log(user.email);

  return (
    <main className={styles.Login}>
      <form name="Login-Form">
        <p>This Page is Login</p>
        <input
          placeholder="Email"
          type="email"
          id="email"
          value={user.email}
          onChange={handleUserInform}
        />
        <input
          placeholder="Password"
          type="password"
          id="password"
          value={user.password}
          onChange={handleUserInform}
          autoComplete="off"
        />
        <button onSubmit={handleSubmit}>제출</button>
      </form>
    </main>
  );
};

export default Login;
