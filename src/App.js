import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import TableRow from "./TableRow";

function App() {
  const [allData, setAllData] = useState([]);
  const [changeLayout, setChangeLayout] = useState(false);
  

  const getData = async () => {
    const response = await axios.get(
      "https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=e479e4cbb462e7b3b5a5f41a29d9ec71&regions=uk"
    );
    console.log(response.data);
    setAllData(response.data); 
  };

  const findBestOdds = (obj) => {
    
      let homeTeamBestOdd = 0;
      let awayTeamBestOdd = 0;
      let drawOdd = 0;
      let homeTeamName = obj.home_team;
      let awayTeamName = obj.away_team;
      let id = obj.id;
      for (let x in obj.bookmakers) {
        /* console.log(x) */
        if (
          obj.bookmakers[x].markets[0].outcomes[2].price > drawOdd
        ) {
          drawOdd = obj.bookmakers[x].markets[0].outcomes[2].price;
        }
        if (
          obj.bookmakers[x].markets[0].outcomes[1].price >
          awayTeamBestOdd
        ) {
          awayTeamBestOdd =
            obj.bookmakers[x].markets[0].outcomes[1].price;
        }
        if (
          obj.bookmakers[x].markets[0].outcomes[0].price >
          homeTeamBestOdd
        ) {
          homeTeamBestOdd =
            obj.bookmakers[x].markets[0].outcomes[0].price;
        }
      }
      console.log(`${homeTeamBestOdd} and ${awayTeamBestOdd} and ${drawOdd} ${homeTeamName} ${awayTeamName}`);
      let objectWithOdds = {
        homeTeamBestOdd,
        awayTeamBestOdd,
        drawOdd,
        homeTeamName,
        awayTeamName,
        id,
      };
      console.log(objectWithOdds)
     return(
      objectWithOdds
     )
    
  };
 

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Technical Assignment</h1>
      <table className="table table-striped" >
        <thead>
          <tr>
            {changeLayout && <td></td>}
            <th>1</th>
            <th>Home</th>
            <th>x</th>
            <th>Visitor</th>
            <th>2</th>
          </tr>
        </thead>
        <tbody onClick={() => setChangeLayout((prev) => !prev)}>
          {allData.map((match) => {
           let matchInfo = findBestOdds(match)
           console.log(matchInfo)
            return (
              <>
             <TableRow matchInfo={matchInfo} match={match} />
              </>

            );
          })}
        </tbody>
      </table>
     
    </div>
  );
}

export default App;
