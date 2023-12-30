import { useState } from "react"

export function NavBar({
  visualizeDijkstra,
  visualizeDFS,
  visualizeBFS,
  visualizeA_star,
  setAlgoScore,
  clearFinalPath,
  clearWalls,
}) {
  const [selectedAlgo, setSelectedAlgo] = useState("dfs")

  return (
    <header className="header">
      <select
        className="algos-container"
        value={selectedAlgo}
        onChange={(e) => setSelectedAlgo(e.target.value)}
      >
        <option value="dfs">Depth-First Search</option>
        <option value="bfs">Breadth-First Search</option>
        <option value="dijsktra">Dijkstra</option>
        <option value="a-star">A*</option>
      </select>

      <button
        className="btn"
        onClick={() => {
          setAlgoScore(0)
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

      <button className="btn">Generate Maze</button>
      <button className="btn" onClick={clearFinalPath}>
        Clear Final Path
      </button>
      <button className="btn" onClick={clearWalls}>
        Clear Walls
      </button>
      <button className="btn btn-accent">My Path{"'"}s Score</button>
    </header>
  )
}
