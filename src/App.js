import Board from "react-trello";
import MyCard from "./MyCard";
import React from "react";

function App() {
  const data = {
    lanes: [],
  };

  const components = {
    Card: MyCard,
  };

  return (
    <div className="App">
      <Board
        data={data}
        editable
        canAddLanes
        editLaneTitle
        components={components}
        draggable
      />
    </div>
  );
}

export default App;
