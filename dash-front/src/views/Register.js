"use client";

import React, { useState, useEffect, Link } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";

// import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // document
    //   .querySelector(".signup-form")
    //   .classList.add("animate__animated", "animate__fadeIn");
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Si les champs sont pas vides
    if (!username || !email || !password || !passwordConfirm) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    const usernamePattern = /^[a-zA-Z\s]*$/;
    if (!usernamePattern.test(username)) {
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
        username,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Inscription réussit",
        showConfirmButton: false,
        timer: 1500,
      });
      setError("");
      navigate("/");
    } else {
      const errorData = await response.json();
      setError(errorData.error || response.statusText);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorData.error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="loginContainer">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 wrapper-l1">
        <div className="formWrapper">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Se connecter au dashboard
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Entrer un nom d'utilisateur
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Entrer votre mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Entrer votre mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      password oublié?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      password oublié?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Se connecter
                </button>
              </div>
            </form>

            <div className="mt-10 text-center text-sm text-gray-500">
              Vous avez un compte ?{" "}
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <form
    //     className="signup-form flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    //     onSubmit={submitHandler}
    //   >
    //     <div className="p-4">
    //       <h3 className="text-xl font-semibold text-gray-800">Inscription</h3>
    //     </div>
    //     <div className="p-4">
    //       <input
    //         type="text"
    //         placeholder="Nom d'utilisateur"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500"
    //       />
    //     </div>
    //     <div className="p-4">
    //       <input
    //         type="text"
    //         placeholder="Adresse e-mail"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500"
    //       />
    //     </div>
    //     <div className="p-4">
    //       <input
    //         type="password"
    //         placeholder="Mot de passe"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500"
    //       />
    //     </div>
    //     <div className="p-4">
    //       <input
    //         type="password"
    //         placeholder="Confirmer le mot de passe"
    //         value={passwordConfirm}
    //         onChange={(e) => setPasswordConfirm(e.target.value)}
    //         className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500"
    //       />
    //     </div>
    //     {error && <div className="p-4 text-red-500">{error}</div>}
    //     <div className="p-4">
    //       <button
    //         type="submit"
    //         className="bg-blue-500 text-white px-4 py-2 rounded-full"
    //       >
    //         S'inscrire
    //       </button>
    //     </div>
    //   </form>
    // </>
  );
};

export default Register;
