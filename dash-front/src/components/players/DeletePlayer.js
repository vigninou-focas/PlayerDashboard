import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DeleteBtn from "../../assets/img/icons/delete.png";

function DeletePlayer(prop) {
  const navigate = useNavigate();
  const deleteCurrentPlayer = async () => {
    console.log(prop);
    const response = await fetch(
      `http://localhost:5000/player/${prop.playerID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );

    if (response.ok) {
      console.log(response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Suppression réussit",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Erreur de suppression",
        showConfirmButton: false,
        timer: 1500,
      });
      const errorData = await response.json();
      console.log(errorData);
    }
  };
  return (
    <div onClick={deleteCurrentPlayer} className="region active">
      <div className="playerIconBtn">
        <img src={DeleteBtn} />
      </div>{" "}
    </div>
  );
}

export default DeletePlayer;
