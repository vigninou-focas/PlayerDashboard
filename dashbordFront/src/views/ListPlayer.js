import React, { useState, useEffect } from "react";
import "../assets/css/listplayer.css";
import ShowPlayer from "../components/players/ShowPlayer";
import Swal from "sweetalert2";
import AddPlayer from "../components/players/AddPlayer";
import DeletePlayer from "../components/players/DeletePlayer";
import EditPlayer from "../components/players/EditPlayer";
import PerformanceCalculator from "../components/PerformanceCalculator";

function ListPlayer() {
  const [allPlayers, setAllPlayers] = useState("");
  // const [loading, setLoading] = useState(false);

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
      <div className="voile"></div>
      <div className="card subdiv">
        <header className="listplayer">
          <div className="playerCount">Répertoire de joueurs</div>
          <div className="playerSearch">
            <img
              src="http://jeffschaefer.net/challenges/devchallenges/countryrank/images/Search.svg"
              alt="icon"
            />
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
              </div>
              <div className="regions">
                <PerformanceCalculator />
              </div>
            </section>
            <section></section>
          </div>

          <div className="main">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Jersey</th>
                  <th>Position</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              {allPlayers && allPlayers.length > 0 && (
                <tbody>
                  {allPlayers.map((player) => (
                    <tr key={player.id}>
                      <td>
                        <a href={`/player/${player.id}`}>
                          <img
                            src={
                              player["playerImage"]
                                ? player["playerImage"]
                                : `https://www.radiofrance.fr/s3/cruiser-production/2023/08/a66db781-d0e3-4ea1-b851-bf940b85088c/400x400_sc_jordan.jpg`
                            }
                            alt={player.playerName}
                          />
                        </a>
                      </td>
                      <td>{player.playerName}</td>
                      <td>{player.jerseyNumber}</td>
                      <td>{player.position}</td>
                      <td className="ActionsBtn">
                        <div className="playerIconBtn">
                          <ShowPlayer playerID={player._id} />
                        </div>{" "}
                        <div className="playerIconBtn">
                          {/* <EditPlayer playerID={player._id} /> */}
                        </div>{" "}
                        <div className="playerIconBtn">
                          <EditPlayer playerID={player._id} />
                        </div>{" "}
                        <div className="playerIconBtn">
                          <DeletePlayer playerID={player._id} />
                        </div>{" "}
                      </td>
                      <td></td>
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
