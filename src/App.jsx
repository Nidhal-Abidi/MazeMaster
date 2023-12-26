import { useRef, useState } from "react"
import "./App.css"
import { GridNode } from "./components/GridNode"
import { NavBar } from "./components/NavBar"
import { SideBar } from "./components/SideBar"
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra"
import { dfs } from "./algorithms/dfs"

function App() {
  const [arrGrid, setArrGrid] = useState([])
  const startNode = useRef({ row: -1, col: -1 })
  const endNode = useRef({ row: -1, col: -1 })
  const userScore = useRef(0)
  const [algoScore, setAlgoScore] = useState(0)

  const visualizeDFS = () => {
    let visitedNodesInOrder = dfs(arrGrid, startNode.current)
    console.log("All visited Nodes->", visitedNodesInOrder)
    animateDijkstra(visitedNodesInOrder, visitedNodesInOrder)
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

    animateDijkstra(visitedNodesInOrder, shortestPathNodes)
  }

  const animateDijkstra = (visitedNodesInOrder, shortestPathNodes) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      //Animate the shortest path at the end
      if (i == visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPathNodes)
        }, 50 * i)
      } else {
        // Animate the visited nodes first.
        let node = visitedNodesInOrder[i]
        if (node.isStartNode || node.isEndNode) continue
        setTimeout(() => {
          let cell = document.querySelector(`#node-${node.row}-${node.col}`)
          cell.classList.add("visited-node")
          cell.classList.add("visited-node-animation")
          setTimeout(() => {
            cell.classList.remove("visited-node-animation")
          }, 1000)
        }, 50 * i)
      }
    }
  }

  const animateShortestPath = (shortestPathNodes) => {
    let lastNode = shortestPathNodes[shortestPathNodes.length - 1]
    if (!lastNode.isEndNode) return
    for (let i = 0; i < shortestPathNodes.length; i++) {
      let node = shortestPathNodes[i]

      if (node.isStartNode || node.isEndNode) continue

      setTimeout(() => {
        let cell = document.querySelector(`#node-${node.row}-${node.col}`)
        cell.classList.add("final-path-node")
        cell.classList.add("final-path-animation")
        setTimeout(() => {
          cell.classList.remove("final-path-animation")
        }, 1000)
        setAlgoScore((prevSc) => prevSc + 1)
      }, 100 * i)
    }
  }

  return (
    <>
      <NavBar
        visualizeDijkstra={visualizeDijkstra}
        visualizeDFS={visualizeDFS}
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
