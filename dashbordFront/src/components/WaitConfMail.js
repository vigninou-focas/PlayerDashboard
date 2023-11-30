import React from "react";
import { Link } from "react-router-dom";
function WaitConfMail() {
  return (
    <div className="modalContainer">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Attente de confirmation du mail
        </h2>
      </div>
      <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div>
          <div class="container px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
              <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 class="text-sm title-font text-gray-500 tracking-widest">
                  Veuillez consulter vos mails pour valider la connexion
                </h2>
                <Link to={"/login"}>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default WaitConfMail;
