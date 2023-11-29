import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Si les champs sont pas vides
    if (!email || !password) {
      return;
    }

    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const savedToken = await response.text();
      localStorage.setItem("jwtToken", savedToken);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Connexion réussit",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Erreur de connexion",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(response);
      // navigate("/register");
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
            <form className="space-y-6" action="#" onSubmit={submitHandler}>
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
                    placeholder="Nom d'utilisateur"
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
                    <a className="font-semibold text-indigo-600 hover:text-indigo-500">
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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Se connecter
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Pas encore de compte ?{" "}
              <Link
                to={"/register"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                S'inscrire ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
