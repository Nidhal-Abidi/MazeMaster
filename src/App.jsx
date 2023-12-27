import { useRef, useState } from "react"
import "./App.css"
import { GridNode } from "./components/GridNode"
import { NavBar } from "./components/NavBar"
import { SideBar } from "./components/SideBar"
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra"
import { dfs } from "./algorithms/dfs"
import { bfs } from "./algorithms/bfs"
import { animateAlgorithm } from "./algorithms/animations"

function App() {
  const [arrGrid, setArrGrid] = useState([])
  const startNode = useRef({ row: -1, col: -1 })
  const endNode = useRef({ row: -1, col: -1 })
  const userScore = useRef(0)
  const [algoScore, setAlgoScore] = useState(0)

  const visualizeBFS = () => {
    let visitedNodesInOrder = bfs(arrGrid, startNode.current)
    console.log("All visited Nodes->", visitedNodesInOrder)
    let shortestPathNodes = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    )
    console.log("Shortest path->", shortestPathNodes)
    animateAlgorithm(visitedNodesInOrder, shortestPathNodes)
    setAlgoScore(shortestPathNodes.length)
  }

  const visualizeDFS = () => {
    let visitedNodesInOrder = dfs(arrGrid, startNode.current)
    console.log("All visited Nodes->", visitedNodesInOrder)
    animateAlgorithm(visitedNodesInOrder, visitedNodesInOrder)
    setAlgoScore(visitedNodesInOrder.length)
  }

  const visualizeDijkstra = () => {
    let visitedNodesInOrder = dijkstra(
      arrGrid,
      startNode.current,
      endNode.current
    )
    console.log("All visited Nodes->", visitedNodesInOrder)
    let shortestPathNodes = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    )
    console.log("Shortest path->", shortestPathNodes)

    animateAlgorithm(visitedNodesInOrder, shortestPathNodes)
    setAlgoScore(shortestPathNodes.length)
  }

  return (
    <>
      <NavBar
        visualizeDijkstra={visualizeDijkstra}
        visualizeDFS={visualizeDFS}
        visualizeBFS={visualizeBFS}
        setAlgoScore={setAlgoScore}
      />
      <main className="main">
        <GridNode
          arrGrid={arrGrid}
          setArrGrid={setArrGrid}
          startNode={startNode}
          endNode={endNode}
        />
        <SideBar algoScore={algoScore} />
      </main>
    </>
  )
}

export default App
