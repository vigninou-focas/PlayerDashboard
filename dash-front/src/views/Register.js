"use client";

import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Register = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document
      .querySelector(".signup-form")
      .classList.add("animate__animated", "animate__fadeIn");
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Si les champs sont pas vides
    if (!name || !email || !password || !passwordConfirm) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    const namePattern = /^[a-zA-Z\s]*$/;
    if (!namePattern.test(name)) {
      setError("Le nom ne doit contenir que des lettres et des espaces");
      return;
    }

    // Si les mots de pass concordent
    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Vous êtes inscrit !");
      setError("");
    } else {
      const errorData = await response.json();
      setError(errorData.error || response.statusText);
    }
  };

  return (
    <form
      className="signup-form flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      onSubmit={submitHandler}
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">Inscription</h3>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500"
        />
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500"
        />
      </div>
      <div className="p-4">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500"
        />
      </div>
      <div className="p-4">
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500"
        />
      </div>
      {error && <div className="p-4 text-red-500">{error}</div>}
      <div className="p-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          S'inscrire
        </button>
      </div>
    </form>
  );
};

export default Register;
