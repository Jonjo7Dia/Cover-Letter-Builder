"use client";
import { useAuth } from "contexts/authContext";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface SignupType {
  email: string;
  password: string;
  password_confirm: string;
}

const SignupPage = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswords, setConfirmPassword] = useState("");

  const submitHandler = async () => {
    await signUp(email, password);
  };
  return (
    <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">
        Sign Up
      </h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitHandler();
        }}
      >
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">password</label>

        <input
          id="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="confirmPassword">password</label>

        <input
          id="confirmPassword"
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button type="submit">submit </button>
      </form>
    </div>
  );
};

export default SignupPage;
