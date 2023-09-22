import React from "react";
import { useState } from "react";
const TableRow = ({ matchInfo, match }) => {
  const [viewAllBrookers, setviewAllBrookers] = useState(false);
  const oddStyleGreen ={color:"green"}
  return (
    <>
      <tr
        key={matchInfo.id}
        onClick={() => setviewAllBrookers((prev) => !prev)}
      >{viewAllBrookers && <td></td>}
        <td>{matchInfo.homeTeamBestOdd}</td>
        <td>{matchInfo.homeTeamName}</td>
        <td>{matchInfo.drawOdd}</td>
        <td>{matchInfo.awayTeamName}</td>
        <td>{matchInfo.awayTeamBestOdd}</td>
      </tr>
      {viewAllBrookers &&
        match.bookmakers.map((bookmaker) => {
          return (
            <tr >
              <td>{bookmaker.title}</td>
              <td>{bookmaker.markets[0].outcomes[0].price} </td>
              <td></td>
              <td>{bookmaker.markets[0].outcomes[2].price} </td>
              <td></td>
              <td>{bookmaker.markets[0].outcomes[1].price} </td>
            </tr>
          );
        })}
    </>
  );
};

export default TableRow;
