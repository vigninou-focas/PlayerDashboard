import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";

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

function AddPlayer() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [playerName, setPlayerName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [position, setPosition] = useState("");
  const [playerImage, setPlayerImage] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Si les champs sont pas vides
    if (!playerName || !jerseyNumber || !position || !playerImage) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tous les champs sont obligatoires!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const playerNamePattern = /^[a-zA-Z\s]*$/;
    if (!playerNamePattern.test(playerName)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        timer: 1500,
        title: "Le nom ne doit contenir que des lettres et des espaces",
        showConfirmButton: false,
      });
      return;
    }

    const response = await fetch("http://localhost:5000/player", {
      method: "POST",
      body: JSON.stringify({
        playerName,
        jerseyNumber,
        position,
        playerImage,
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
      navigate("/");
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
        Ajouter un joueur
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add new player"
      >
        <div className="modalContainer text-gray-400 bg-gray-900 body-font overflow-hidden">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 wrapper-l1">
            <div className="formWrapper">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Ajouter un joueur
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={submitHandler}>
                  <div>
                    <label
                      htmlFor="playerName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Entrer un nom du joueur
                    </label>
                    <div className="mt-2">
                      <input
                        id="playerName"
                        name="playerName"
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        autoComplete="playerName"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="jerseyNumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Numero de dossart
                    </label>
                    <div className="mt-2">
                      <input
                        id="jerseyNumber"
                        name="jerseyNumber"
                        type="number"
                        placeholder="Entrer le numero du joueur"
                        value={jerseyNumber}
                        onChange={(e) =>
                          setJerseyNumber(parseInt(e.target.value))
                        }
                        autoComplete="jerseyNumber"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="position"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Position
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="position"
                        name="position"
                        type="text"
                        placeholder="Saisissez la position sur le terrain"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        autoComplete="position"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="playerImage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Photo
                      </label>
                    </div>
                    <div className="mt-2">
                      {/* <input
                        id="playerImage"
                        name="playerImage"
                        type="file"
                        placeholder="Mot de passe"
                        value={playerImage}
                        onChange={(e) => setPlayerImage(e.target.value)}
                        autoComplete="playerImage"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      /> */}
                      <select
                        id="playerImage"
                        name="playerImage"
                        value={playerImage}
                        onChange={(e) => setPlayerImage(e.target.value)}
                        className="block w-full mt-1 p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="" disabled>
                          Sélectionnez une image
                        </option>
                        <option value="https://www.radiofrance.fr/s3/cruiser-production/2023/08/a66db781-d0e3-4ea1-b851-bf940b85088c/400x400_sc_jordan.jpg">
                          Michael Jordan
                        </option>
                        <option value="https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/45843.png">
                          Lonel Messi
                        </option>
                        <option value="https://cdn.britannica.com/19/233519-050-F0604A51/LeBron-James-Los-Angeles-Lakers-Staples-Center-2019.jpg">
                          Lebron
                        </option>
                        <option value="https://manunitedcore.com/wp-content/uploads/2021/09/Ronaldo-Profile.png">
                          CR7
                        </option>
                        {/* <option value=""></option>
                        <option value=""></option> */}
                      </select>
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
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddPlayer;
