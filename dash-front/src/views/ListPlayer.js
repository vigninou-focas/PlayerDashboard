import React, { useState, useEffect } from "react";
import "../assets/css/listplayer.css";

import BgImage from "../assets/img/img1.png";
import IconView from "../assets/img/icons/view.png";
import Delete from "../assets/img/icons/delete.png";
import EditBtn from "../assets/img/icons/edit.png";
import ShowPlayer from "../components/players/ShowPlayer";
import Swal from "sweetalert2";
import AddPlayer from "../components/players/AddPlayer";

function ListPlayer() {
  const [allPlayers, setAllPlayers] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllplayers();
  }, []);
  const getAllplayers = async () => {
    const apiUrl = `http://localhost:5000/player`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "La requête a échoué",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllPlayers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "La requête a échoué",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="playerListPage">
      <div>
        <img src={BgImage} className="logo" />
      </div>
      <div className="card subdiv">
        <header className="listplayer">
          <div className="playerCount">Répertoire de joueurs</div>
          <div className="playerSearch">
            <img src="http://jeffschaefer.net/challenges/devchallenges/countryrank/images/Search.svg" />
            <input type="text" placeholder="Rechercher un joueur" />
          </div>
        </header>

        <main>
          <div className="player-sidebar">
            <section>
              <label htmlFor="sortBy">Trié par :</label>
              <select name="sortBy">
                <option value="name">Nom de joueur</option>
                <option value="number">Numéro de maillot</option>
                <option value="poste">Poste</option>
              </select>
            </section>
            <section>
              <label htmlFor="regions">Actions</label>
              <div className="regions">
                <AddPlayer />
                {/* <AddPlayer className="region active" /> */}
              </div>
            </section>
            <section></section>
          </div>

          <div className="main">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Player Name</th>
                  <th>Jersey</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {allPlayers && allPlayers.length > 0 && (
                <tbody>
                  {allPlayers.map((player) => (
                    <tr key={player.id}>
                      <td>
                        <a href={`/player/${player.id}`}>
                          <img
                            src="https://www.radiofrance.fr/s3/cruiser-production/2023/08/a66db781-d0e3-4ea1-b851-bf940b85088c/400x400_sc_jordan.jpg"
                            // src={player.playerImage}
                            alt={player.playerName}
                          />
                        </a>
                      </td>
                      <td>{player.playerName}</td>
                      <td>{player.jerseyNumber}</td>
                      <td>{player.position}</td>
                      <td className="ActionsBtn">
                        {" "}
                        <div className="playerIconBtn">
                          <img src={IconView} />
                        </div>{" "}
                        <div className="playerIconBtn">
                          <ShowPlayer playerID={player._id} />
                        </div>{" "}
                        <div className="playerIconBtn">
                          <img src={Delete} />
                        </div>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ListPlayer;
