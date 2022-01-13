import React,{useEffect,useState} from 'react'
import './ResultsPage.css';
import RideTile from '../../components/RideTile/RideTile';
import Button from '../../components/Button/Button';
import axios from 'axios' 
const ResultsPage = (props) => {

    const {lat,lng}=props
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)
    useState()
     async function getResults (radius,lat,lng)
     {
         try{
             setLoading(true)
        const data= await axios.get(`https://ride2gether-api.herokuapp.com/api/v1/api/v1/rides/rides-within/${radius}/center/${lat},${lng}/unit/km`)
         }
         catch(e){
             console.log(e)
         }
         finally{
             setLoading(false)
         }
        }
    
    
    useEffect(() => {
     const initialResults=  getResults(1,lat,lng)
     setResults(initialResults)
        
    }, [])

    return (
      <>
        <div id="resultsPage">
          <div id="resultsList">
              {loading && "Loading"}
            {results && results.map((ride) => {
              return (
                <RideTile
                  key={ride.userID}
                  name={ride.userID}
                />
              );
            })}
          </div>
          
        </div>
        <div className="cancel-container">
          <Button isGrow={true} text="Cancel" />
        </div>
      </>
    );
}

export default ResultsPage