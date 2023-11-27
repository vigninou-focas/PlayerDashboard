import React from "react";
import "../listplayer.css";
import BgImage from "../img/pbg1.jpg";

function ListPlayer() {
  let allCountries = [];

  window.onload = function () {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        allCountries = data.sort(
          (a, b) => parseFloat(b.population) - parseFloat(a.population)
        );

        var i;
        for (var i = 0; i < 3; i++) {
          document.querySelector("tbody").innerHTML += `<a href="player/id=${
            allCountries[i].cca3
          }">
                <tr>
                  <td><img src="${allCountries[i].flags.png}"></td>
                  <td>${allCountries[i].name.common}</td>
                  <td>${allCountries[i].population.toLocaleString()}</td>
                  <td>${allCountries[i].area.toLocaleString()}</td>
                  <td>${allCountries[i].region}</td>
                </tr>
              </a>`;
        }

        for (var i = 0; i < 5; i++) {
          document.querySelector("tbody").innerHTML += `<tr>
                <td><div class="playerSkeleton"></div></td>
                <td><div class="textSkeleton"></div></td>
                <td><div class="textSkeleton"></div></td>
              </tr>`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="playerListPage">
      <div class="logo" >
        {/* <img src={BgImage} /> */}
      </div>
      <div class="card subdiv">
        <header>
          <div class="playerCount">Répertoire de joueurs</div>
          <div class="playerSearch">
            <img src="./images/Search.svg" />
            <input type="text" placeholder="Rechercher un joueur" />
          </div>
        </header>

        <main>
          <div class="player-sidebar">
            <section>
              <label for="sort">Sort by</label>
              <select name="sort">
                <option value="population">Player Name</option>
                <option value="name">Jersey Number</option>
                <option value="area">Poste</option>
              </select>
            </section>
            <section>
              <label for="regions">Region</label>
              <div class="regions">
                <div class="region active">Americas</div>
                <div class="region">Antarctic</div>
                <div class="region active">Africa</div>
              </div>
            </section>
            <section>
              <label for="status">Status</label>
              <div class="memberCB">
                <input type="checkbox" name="member" />
                <label for="member">Member of the United Nations</label>
              </div>
              <div class="indCB">
                <input type="checkbox" name="ind" checked />
                <label for="ind">Independent</label>
              </div>
            </section>
          </div>

          <div class="main">
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
              <tbody></tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ListPlayer;
