import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

async function MailVerification() {
  const token = useParams();
  const navigate = useNavigate();

  console.log("début function");
  console.log(token.id);

  useEffect(() => {
    fetchDataWithToken();
  }, [token, navigate]);
  const fetchDataWithToken = async () => {
    console.log("début function");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "token",
      showConfirmButton: false,
      timer: 1500,
    });
    try {
      const response = await fetch(
        `http://localhost:5000/mail_verification/${token.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bravo, compte confirmé",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("jwtToken", token.id);
        navigate("/");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Erreur de confirmation",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Erreur de requête:");
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error.message);
    }
  };

  if (token) {
    fetchDataWithToken(token);
  }

  return <div>Veuillez patienter....</div>;
}

export default MailVerification;
