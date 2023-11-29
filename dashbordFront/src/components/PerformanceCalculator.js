import React, { useState } from "react";

const PerformanceCalculator = () => {
  const [values, setValues] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
  });

  const [average, setAverage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateAverage = () => {
    const { value1, value2, value3, value4, value5 } = values;
    const valuesArray = [value1, value2, value3, value4, value5];
    const avg =
      valuesArray.reduce((acc, val) => acc + val, 0) / valuesArray.length;
    setAverage(avg);
  };

  return (
    <div>
      <form>
        <label>
          Value 1:
          <input
            type="number"
            name="value1"
            value={values.value1}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Value 2:
          <input
            type="number"
            name="value2"
            value={values.value2}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Value 3:
          <input
            type="number"
            name="value3"
            value={values.value3}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Value 4:
          <input
            type="number"
            name="value4"
            value={values.value4}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Value 5:
          <input
            type="number"
            name="value5"
            value={values.value5}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={calculateAverage}>
          Calculate Average
        </button>
      </form>
      {average !== null && (
        <div>
          <h2>Average Performance: {average}</h2>
        </div>
      )}
    </div>
  );
};

export default PerformanceCalculator;
