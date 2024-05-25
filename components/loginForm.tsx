"use client";
import React, { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../helpers";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const router = useRouter();

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
      const loginRes = await loginUser({ email, password });

      if (loginRes && !loginRes.ok) {
        setError(loginRes.error);
      } else {
        setError("OK");
        router.push("/profile");
      }
    } catch (error) {
      if (error) {
        const errorMsg = error;
        console.log(errorMsg);
      }
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
          <label htmlFor="email">E-mail:&#32; </label>
          <input
            type="email"
            name="useremail"
            id="useremail"
            value={email}
            onChange={handleEmails}
            required
          />
        </li>
        <li className="contact-form-item">
          <label htmlFor="message">Password:&#32;</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            name="password"
            id="password"
            required
          />
        </li>
        <li className="contact-form-item">
          <label htmlFor="submit"></label>
          <input type="submit" value="Send" id="submit" name="submit" />
        </li>
      </ul>
      <p style={{ display: "block", lineHeight: "50px" }}>
        Not Registered?.
        <Link
          href={`/register`}
          title=""
          style={{ display: "inline", marginLeft: "0.5em" }}
        >
          Click here to register
        </Link>
      </p>
    </form>
  );
}
