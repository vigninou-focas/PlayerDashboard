import React, { useState } from "react";
import Modal from "react-modal";
import "../assets/css/listplayer.css";
const PerformanceCalculator = () => {
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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [average, setAverage] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);

  let totalValue = 0;

  const calculateAverage = (e) => {
    setAverage(0);
    e.preventDefault();
    const valuesArray = [value1, value2, value3, value4, value5].filter(
      (value) => value !== null && value != ""
    );

    for (let i = 0; i < valuesArray.length; i++) {
      totalValue += parseFloat(valuesArray[i]);
    }

    const avg = totalValue / valuesArray.length;
    setAverage(avg);
    setValue1(0);
    setValue2(0);
    setValue3(0);
    setValue4(0);
    setValue5(0);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="region active">
        Calcul de Performance
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Edit new player"
      >
        <div className="modalContainer performance_modal">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm title_">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Calcul de Performance
            </h2>
          </div>
          <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
            <div className="container px-5 py-5 mx-auto form_container">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 ">
                  <form>
                    <label>
                      Value 1:
                      <input
                        type="number"
                        name="value1"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      Value 2:
                      <input
                        type="number"
                        name="value2"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      Value 3:
                      <input
                        type="number"
                        name="value3"
                        value={value3}
                        onChange={(e) => setValue3(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      Value 4:
                      <input
                        type="number"
                        name="value4"
                        value={value4}
                        onChange={(e) => setValue4(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      Value 5:
                      <input
                        type="number"
                        name="value5"
                        value={value5}
                        onChange={(e) => setValue5(e.target.value)}
                      />
                    </label>
                    <br />
                    <br />
                    <div className="result_average ">
                      <button
                        className="Average-button"
                        onClick={(e) => calculateAverage(e)}
                      >
                        Average :
                      </button>
                      {average !== null && (
                        <button className="average">
                          <span> {average}</span>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Modal>
    </div>
  );
};

export default PerformanceCalculator;
