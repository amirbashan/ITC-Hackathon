import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ResultsPage.css";
import RideTile from "../../components/RideTile/RideTile";
import Button from "../../components/Button/Button";
import axios from "axios";
const ResultsPage = () => {
  const queryString = useLocation().search;
  const params = queryString.split("&").map((param) => param.split("="));

  // const {lat}=useParams();
  console.log(params);

  const lat = params[0][1];
  const lng = params[1][1];
  const latEnd = params[2][1];
  const lngEnd = params[3][1];
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  useState();
  async function getResults() {
    const radius = 1;
    try {
      setLoading(true);
      const data = await axios.get(
        `https://ride2gether-api.herokuapp.com/api/v1/rides/rides-within/${radius}/center/${lat},${lng}/end/${latEnd},${lngEnd}/unit/km`
      );
      setResults(data.data.data.data);
      console.log(data.data.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <div id="resultsPage">
        <div id="resultsList">
          {loading && "Loading"}
          {results &&
            results.length > 0 &&
            results.map((ride) => {
              return <RideTile 
              key={ride._id} 
              name={ride.createdBy}
              price={"129"}
              duration={"1h20m"}
               />;
            })}
        </div>
      </div>
      <div className="cancel-container">
        <Button isGrow={true} text="Cancel" />
      </div>
    </>
  );
};

export default ResultsPage;
