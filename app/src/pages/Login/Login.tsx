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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(user.email);
    e.preventDefault();
  };

  return (
    <main className={styles.Login}>
      <p>This Page is Login</p>
      <form
        name="Login-Form"
        onSubmit={handleSubmit}
        className={styles.LoginFrom}
      >
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
        <input type="submit" className={styles.Button} value="로그인" />
      </form>
    </main>
  );
};

export default Login;
