import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";
import IconView from "../../assets/img/icons/view.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function ShowPlayer(prop) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [player, setPlayer] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);

  function openModal() {
    setIsOpen(true);
    getCurrentPlayer();
  }

  function closeModal() {
    setIsOpen(false);
    setShowPerformance(false);
  }

  const showPerformanceHandler = () => {
    setShowPerformance(!showPerformance);
  };

  const getCurrentPlayer = async () => {
    console.log(prop);
    const response = await fetch(
      `http://localhost:5000/player/${prop.playerID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );

    if (response.ok) {
      console.log(response);
      const playerData = await response.json();
      setPlayer(playerData);
      return playerData;
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Valeur incorrecte",
        showConfirmButton: false,
        timer: 1500,
      });
      const errorData = await response.json();
      console.log(errorData);
    }
  };
  return (
    <div>
      <div onClick={openModal} className="region active">
        <div className="playerIconBtn">
          <img src={IconView} />
        </div>{" "}
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit new player"
      >
        <div className="modalContainer">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Profile
            </h2>
          </div>
          {player && (
            <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
              <div key={player._id}>
                <div class="container px-5 py-24 mx-auto">
                  <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                      <h2 class="text-sm title-font text-gray-500 tracking-widest">
                        Information :
                      </h2>
                      <h1 class="text-white text-3xl title-font font-medium mb-4">
                        <h3>{player["playerName"]}</h3>
                      </h1>
                      <div class="flex mb-4">
                        <a class="flex-grow text-indigo-400 border-b-2 border-indigo-500 py-2 text-lg px-1">
                          Description
                        </a>
                      </div>
                      <p class="leading-relaxed mb-4">
                        Joueur de football passionné, il se distingue par ses
                        capacités athlétiques exceptionnelles. Sur le terrain,
                        sa rapidité et son agilité sont des atouts indéniables,
                        lui permettant de dribbler habilement ses adversaires.
                        Sa puissance physique associée à une technique fine en
                        font un joueur redoutable lors des duels.
                      </p>
                      <div class="flex border-t border-gray-800 py-2">
                        <span class="text-gray-500">Position : </span>
                        <span class="ml-auto text-white">
                          {player["position"]}
                        </span>
                      </div>
                      <div class="flex border-t border-gray-800 py-2">
                        <span class="text-gray-500">Numéro : </span>
                        <span class="ml-auto text-white">
                          {player["jerseyNumber"]}
                        </span>
                      </div>
                      <div class="flex mt-4">
                        <span class="title-font font-medium text-2xl text-white">
                          capacité : 80%
                        </span>
                        <button
                          onClick={showPerformanceHandler}
                          class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                        >
                          Calculer sa performance ?
                        </button>
                      </div>
                      {showPerformance && (
                        <div className="performance mt-4">
                          <li>
                            Précision des Tirs: <input type="number" />
                          </li>
                          <li>
                            Distance Parcourue: <input type="number" />
                          </li>
                          <li>
                            Nombre de Duels Gagnés: <input type="number" />
                          </li>
                          <li>
                            Précision des Passes: <input type="number" />
                          </li>
                          <li>
                            Temps de Jeu: <input type="number" />
                          </li>
                        </div>
                      )}
                    </div>
                    <img
                      alt={player["playerName"]}
                      class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                      src={
                        player["playerImage"]
                          ? player["playerImage"]
                          : `https://www.radiofrance.fr/s3/cruiser-production/2023/08/a66db781-d0e3-4ea1-b851-bf940b85088c/400x400_sc_jordan.jpg`
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
        {/* <button onClick={closeModal}>close</button> */}
      </Modal>
    </div>
  );
}

export default ShowPlayer;
