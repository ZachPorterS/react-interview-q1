import { useCallback, useEffect, useState } from "react";
import { getLocations, isNameValid } from "../../mock-api/apis";
import "./form.css";
import Table from "../Table/Table";

const Form = () => {
  const [formData, setFormData] = useState({});
  const [locations, setLocations] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isValidName, setIsValidName] = useState(true);

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClear = () => {
    setFormData({ ...formData, name: "" });
    setIsValidName(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTableData((prevTableData) => [
      ...prevTableData,
      { name: formData.name, location: formData.location },
    ]);

    handleClear();
  };

  const checkValidName = useCallback(async () => {
    try {
      const isValid = await isNameValid(formData.name);
      setIsValidName(isValid);
    } catch (error) {
      console.log("Error validating name: ", error);
    }
  }, [formData.name]);

  /* Check if name is valid on change */
  useEffect(() => {
    if (formData.name) checkValidName();
  }, [formData.name, checkValidName]);

  const fetchLocations = async () => {
    try {
      const locationData = await getLocations();
      setLocations(locationData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  /* Handle data fetch on load */
  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <div className="form-container">
          <div className="form-input-container">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              className={`input ${isValidName ? "" : "invalid"}`}
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
            {!isValidName && (
              <span className="danger-text">Please a enter valid name.</span>
            )}
          </div>
          <div className="form-input-container">
            <label className="label" htmlFor="locations">
              Location
            </label>
            <select
              id="locations"
              className="input"
              name="location"
              onChange={handleChange}
              value={formData.location || ""}>
              {locations.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="btn-container">
            <button
              className="btn"
              type="button"
              name="clear"
              onClick={handleClear}>
              Clear
            </button>
            <button className="btn" type="submit" name="submit" value="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <Table data={tableData} />
    </>
  );
};

export default Form;
