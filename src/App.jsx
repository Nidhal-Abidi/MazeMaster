import { useRef, useState } from "react"
import "./App.css"
import { GridNode } from "./components/GridNode"
import { NavBar } from "./components/NavBar"
import { SideBar } from "./components/SideBar"
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra"

function App() {
  const [arrGrid, setArrGrid] = useState([])
  const startNode = useRef({})
  const endNode = useRef({})

  const visualizeDijkstra = () => {
    let visitedNodesInOrder = dijkstra(
      arrGrid,
      startNode.current,
      endNode.current
    )
    let shortestPathNodes = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    )
    console.log("All visited Nodes->", visitedNodesInOrder)
    console.log("Shortest path->", shortestPathNodes)

    animateDijkstra(visitedNodesInOrder, shortestPathNodes)
  }

  const animateDijkstra = (visitedNodesInOrder, shortestPathNodes) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      //Animate the shortest path at the end
      if (i == visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPathNodes)
        }, 100 * i)
      } else {
        // Animate the visited nodes first.
        let node = visitedNodesInOrder[i]
        if (node.isStartNode || node.isEndNode) continue
        setTimeout(() => {
          document
            .querySelector(`#node-${node.row}-${node.col}`)
            .classList.add("visited-node")
        }, 100 * i)
      }
    }
  }

  const animateShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      let node = shortestPathNodes[i]
      if (node.isStartNode || node.isEndNode) continue
      setTimeout(() => {
        document
          .querySelector(`#node-${node.row}-${node.col}`)
          .classList.add("final-path-node")
      }, 200 * i)
    }
  }

  return (
    <>
      <NavBar visualizeDijkstra={visualizeDijkstra} />
      <main className="main">
        <GridNode
          arrGrid={arrGrid}
          setArrGrid={setArrGrid}
          startNode={startNode}
          endNode={endNode}
        />
        <SideBar />
      </main>
    </>
  )
}

export default App
