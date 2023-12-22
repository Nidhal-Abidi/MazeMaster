import { useState } from "react"

export function NavBar() {
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

      <button className="btn">Visualize {selectedAlgo}!</button>
      <button className="btn">Generate Maze</button>
      <button className="btn btn-accent">My Path{"'"}s Score</button>
    </header>
  )
}
