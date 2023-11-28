import React, { useState, useEffect } from "react";
import "../assets/css/listplayer.css";
import BgImage from "../assets/img/img1.png";
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

    fetch(apiUrl)
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
          icon: { error },
          title: "La requête a échoué",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const addPlayer = async () => {
    // Swal.fire({
    //   title: "Ajouter un nouveau joueur",
    //   text: {},
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "Save",
    //   denyButtonText: `Don't save`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     Swal.fire("Saved!", "", "success");
    //   } else if (result.isDenied) {
    //     Swal.fire("Changes are not saved", "", "info");
    //   }
    // });
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
                $
                <AddPlayer className="region active" />
                <div className="region active">Add player</div>
                <div className="region">list </div>
                <div className="region active">Africa</div>
              </div>
            </section>
            <section>
              <label htmlFor="status">Status</label>
              <div className="memberCB">
                <input type="checkbox" name="member" />
                <label htmlFor="member">Member of the United Nations</label>
              </div>
              <div className="indCB">
                <input type="checkbox" name="ind" checked />
                <label htmlFor="ind">Independent</label>
              </div>
            </section>
          </div>

          <div className="main">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Player Name</th>
                  <th>Jersey Number</th>
                  <th>Position</th>
                  <th>Performance</th>
                </tr>
              </thead>
              {allPlayers && allPlayers.length > 0 && (
                <tbody>
                  {allPlayers.map((player) => (
                    <tr key={player.id}>
                      <td>
                        <a href={`/player/${player.id}`}>
                          <img
                            src={player.playerImage}
                            alt={player.playerName}
                          />
                        </a>
                      </td>
                      <td>{player.playerName}</td>
                      <td>{player.jerseyNumber}</td>
                      <td>{player.position}</td>
                      <td>{player.region}</td>
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
