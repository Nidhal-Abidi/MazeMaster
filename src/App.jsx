import { useRef, useState } from "react"
import "./App.css"
import { GridNode } from "./components/GridNode"
import { NavBar } from "./components/NavBar"
import { SideBar } from "./components/SideBar"
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra"
import { dfs } from "./algorithms/dfs"
import { bfs } from "./algorithms/bfs"
import { animateAlgorithm } from "./animations"
import { a_star } from "./algorithms/a-star"

function App() {
  const [arrGrid, setArrGrid] = useState([])
  const startNode = useRef({ row: -1, col: -1 })
  const endNode = useRef({ row: -1, col: -1 })
  const userScore = useRef(0)
  const [algoScore, setAlgoScore] = useState(0)

  const clearFinalPath = () => {
    for (let i = 0; i < arrGrid.length; i++) {
      for (let j = 0; j < arrGrid[0].length; j++) {
        let node = arrGrid[i][j]
        let cell = document.querySelector(`#node-${node.row}-${node.col}`)
        //console.log(cell.classList.contains("visited-node"))

        if (cell.classList.contains("visited-node")) {
          cell.classList.remove("visited-node")
        }
        if (cell.classList.contains("final-path-node")) {
          cell.classList.remove("final-path-node")
        }
      }
    }
    setAlgoScore(0)
  }

  const clearWalls = () => {
    clearFinalPath()
    setArrGrid((prevArr) => {
      return prevArr.map((row) => {
        return row.map((col) => {
          col.isWall = false
          return col
        })
      })
    })
  }

  const visualizeA_star = () => {
    let copiedArr = arrayInitialCopy(arrGrid)
    let visitedNodesInOrder = a_star(
      copiedArr,
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

  const visualizeBFS = () => {
    let copiedArr = arrayInitialCopy(arrGrid)
    let visitedNodesInOrder = bfs(copiedArr, startNode.current)
    console.log("All visited Nodes->", visitedNodesInOrder)
    let shortestPathNodes = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    )
    console.log("Shortest path->", shortestPathNodes)
    animateAlgorithm(visitedNodesInOrder, shortestPathNodes)
    setAlgoScore(shortestPathNodes.length)
  }

  const visualizeDFS = () => {
    let copiedArr = arrayInitialCopy(arrGrid)
    let visitedNodesInOrder = dfs(copiedArr, startNode.current)
    console.log("All visited Nodes->", visitedNodesInOrder)
    animateAlgorithm(visitedNodesInOrder, visitedNodesInOrder)
    setAlgoScore(visitedNodesInOrder.length)
  }

  const visualizeDijkstra = () => {
    //Fix Dijkstra because it's not working on the copied array
    let copiedArr = arrayInitialCopy(arrGrid)
    let visitedNodesInOrder = dijkstra(
      copiedArr,
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
        visualizeA_star={visualizeA_star}
        setAlgoScore={setAlgoScore}
        clearFinalPath={clearFinalPath}
        clearWalls={clearWalls}
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

function arrayInitialCopy(grid) {
  // It returns the original array(when all node were unvisited.)
  // We do this since the method since JSON.string(JSON.parse(arr)) has data loss.
  // It sets distance to null (prev value was infinity)
  let arrCopy = []
  for (let i = 0; i < grid.length; i++) {
    let row = []
    for (let j = 0; j < grid[0].length; j++) {
      let copiedCell = {
        row: grid[i][j].row,
        col: grid[i][j].col,
        distance: Infinity,
        isWall: grid[i][j].isWall,
        isVisited: false,
        isStartNode: grid[i][j].isStartNode,
        isEndNode: grid[i][j].isEndNode,
        previousNode: null,
      }
      if (grid[i][j].isStartNode) {
        copiedCell.distance = 0
      }
      row.push(copiedCell)
    }
    arrCopy.push(row)
  }
  return arrCopy
}

export default App
