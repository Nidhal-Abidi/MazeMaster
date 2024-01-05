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
}) {
  const [selectedAlgo, setSelectedAlgo] = useState("dijsktra")

  return (
    <header className="header">
      <select
        className="algos-container"
        value={selectedAlgo}
        onChange={(e) => setSelectedAlgo(e.target.value)}
      >
        <option value="dijsktra">Dijkstra</option>
        <option value="dfs">Depth-First Search</option>
        <option value="bfs">Breadth-First Search</option>
        <option value="a-star">A*</option>
      </select>

      <button
        className="btn btn-accent"
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

      <button className="btn" onClick={generateMaze}>
        Generate Maze
      </button>
      <button className="btn" onClick={clearFinalPath}>
        Clear Final Path
      </button>
      <button className="btn" onClick={clearWalls}>
        Clear Walls
      </button>
    </header>
  )
}
