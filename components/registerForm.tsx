"use client";

import React, { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [username, setUserName] = useState<string>("");
  const [useremail, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleUserName = (e: { target: { value: SetStateAction<string> } }) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handleEmails = (e: { target: { value: SetStateAction<string> } }) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) => {
    const { value } = e.target;
    setPassword(value);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email: useremail, password }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/thankyou");
      }
    } catch (err) {
      console.error("not working : " + err);
    }
  };

  return (
    <form id="contact-form" onSubmit={submit}>
      <span
        id="form-error"
        className={error === "" ? "hide-error" : "show-error"}
      >
        {error}
      </span>
      <ul id="contact-form-fields">
        <li className="contact-form-item">
          <label htmlFor="username">
            Name:&#32;
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleUserName}
              required
              pattern="^[a-zA-Z\s]+$"
              aria-describedby="form-error"
            />
          </label>
        </li>
        <li className="contact-form-item">
          <label htmlFor="email">
            E-mail:&#32;
            <input
              type="email"
              name="useremail"
              id="useremail"
              value={useremail}
              onChange={handleEmails}
              required
              aria-describedby="form-error"
            />
          </label>
        </li>
        <li className="contact-form-item">
          <label htmlFor="password">
            Password:&#32;
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              name="password"
              id="password"
              required
              aria-describedby="form-error"
            />
          </label>
        </li>
        <li className="contact-form-item">
          <label htmlFor="submit">
            <input type="submit" value="Send" id="submit" name="submit" />
          </label>
        </li>
      </ul>
    </form>
  );
}
