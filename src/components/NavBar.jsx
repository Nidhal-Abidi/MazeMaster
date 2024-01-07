import { useState } from "react"

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
}) {
  const [selectedAlgo, setSelectedAlgo] = useState("dijsktra")

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
          setAlgoScore(0)
          // setArrGrid(arrWithoutUserPathNodes)
          if (selectedAlgo == "dijsktra") {
            visualizeDijkstra()
          } else if (selectedAlgo == "dfs") {
            visualizeDFS()
          } else if (selectedAlgo == "bfs") {
            visualizeBFS()
          } else if (selectedAlgo == "a-star") {
            visualizeA_star()
          } else {
            console.log("Algorithm is still in progress")
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
          setIsFast((prevVal) => !prevVal)
        }}
      >
        <option value={true}>Fast &#128007;</option>
        <option value={false}>Slow &#128034;</option>
      </select>

      <select
        className="select-container"
        value={isSoundOn}
        onChange={() => {
          setIsSoundOn((prevVal) => !prevVal)
        }}
      >
        <option value={true}>Sound On &#128266;</option>
        <option value={false}>Sound Off &#128263;</option>
      </select>
    </header>
  )
}
