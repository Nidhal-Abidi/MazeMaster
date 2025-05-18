import { useState } from "react";

export function NavBar({
  visualizeDijkstra,
  visualizeDFS,
  visualizeBFS,
  visualizeA_star,
  setAlgoScore,
  clearFinalPath,
  clearWalls,
  generateMaze,
  isFast,
  setIsFast,
  isSoundOn,
  setIsSoundOn,
}: {
  visualizeDijkstra: () => void;
  visualizeDFS: () => void;
  visualizeBFS: () => void;
  visualizeA_star: () => void;
  setAlgoScore: React.Dispatch<React.SetStateAction<number>>;
  clearFinalPath: () => void;
  clearWalls: () => void;
  generateMaze: () => void;
  isFast: 0 | 1;
  setIsFast: React.Dispatch<React.SetStateAction<0 | 1>>;
  isSoundOn: 0 | 1;
  setIsSoundOn: React.Dispatch<React.SetStateAction<0 | 1>>;
}) {
  const [selectedAlgo, setSelectedAlgo] = useState("dijsktra");

  return (
    <header className="header">
      <select
        className="select-container"
        value={selectedAlgo}
        onChange={(e) => setSelectedAlgo(e.target.value)}
      >
        <option value="dijsktra">Dijkstra</option>
        <option value="a-star">A*</option>
        <option value="bfs">Breadth-First Search</option>
        <option value="dfs">Depth-First Search</option>
      </select>

      <button
        className="btn btn-accent"
        onClick={() => {
          setAlgoScore(0);
          // setArrGrid(arrWithoutUserPathNodes)
          if (selectedAlgo == "dijsktra") {
            visualizeDijkstra();
          } else if (selectedAlgo == "dfs") {
            visualizeDFS();
          } else if (selectedAlgo == "bfs") {
            visualizeBFS();
          } else if (selectedAlgo == "a-star") {
            visualizeA_star();
          } else {
            console.log("Algorithm is still in progress");
          }
        }}
      >
        Visualize {selectedAlgo}!
      </button>

      <button className="btn" onClick={generateMaze}>
        Generate Maze
      </button>
      <button className="btn" onClick={clearFinalPath}>
        Clear Final Path
      </button>
      <button className="btn" onClick={clearWalls}>
        Clear Walls
      </button>

      <select
        className="select-container"
        value={isFast}
        onChange={() => {
          setIsFast((prevVal) => {
            if (prevVal === 0) return 1;
            else return 0;
          });
        }}
      >
        <option value={1}>Fast &#128007;</option>
        <option value={0}>Slow &#128034;</option>
      </select>

      <select
        className="select-container"
        value={isSoundOn}
        onChange={() => {
          setIsSoundOn((prevVal) => {
            if (prevVal === 0) return 1;
            else return 0;
          });
        }}
      >
        <option value={1}>Sound On &#128266;</option>
        <option value={0}>Sound Off &#128263;</option>
      </select>
    </header>
  );
}
