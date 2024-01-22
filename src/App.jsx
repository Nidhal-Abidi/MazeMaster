import { createContext, useEffect, useRef, useState } from "react"
import "./App.css"
import { GridNode } from "./components/GridNode"
import { NavBar } from "./components/NavBar"
import { SideBar } from "./components/SideBar"
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "./algorithms/pathfinding/dijkstra"
import { dfs } from "./algorithms/pathfinding/dfs"
import { bfs } from "./algorithms/pathfinding/bfs"
import { animateAlgorithm } from "./animations"
import { a_star } from "./algorithms/pathfinding/a-star"
import { random_maze } from "./algorithms/maze_generation/random_maze"

export const GridNodeContext = createContext()

function App() {
  const [arrGrid, setArrGrid] = useState([])
  const [userPathArr, setUserPathArr] = useState([])
  const startNode = useRef({ row: -1, col: -1 })
  const endNode = useRef({ row: -1, col: -1 })
  const [userScore, setUserScore] = useState(0)
  const [algoScore, setAlgoScore] = useState(0)
  const [isFast, setIsFast] = useState(true)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [isUKeyPressed, setIsUKeyPressed] = useState(false)

  useEffect(() => console.log("Nidhal Labidi | Junior Software Engineer"), [])

  const generateMaze = () => {
    clearFinalPath()
    let copiedArr = noWallsArr(arrGrid)
    //Remove the user's path
    setUserScore(0)
    setUserPathArr([])
    copiedArr = noUserPathArr(copiedArr)
    copiedArr = random_maze(copiedArr, startNode.current, endNode.current)
    setArrGrid(copiedArr)
  }

  const clearFinalPath = () => {
    for (let i = 0; i < arrGrid.length; i++) {
      for (let j = 0; j < arrGrid[0].length; j++) {
        let node = arrGrid[i][j]
        let cell = document.querySelector(`#node-${node.row}-${node.col}`)

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
    //console.log("All visited Nodes->", visitedNodesInOrder)
    let shortestPathNodes = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    )
    //console.log("Shortest path->", shortestPathNodes)
    animateAlgorithm(visitedNodesInOrder, shortestPathNodes, isFast, isSoundOn)
    setAlgoScore(shortestPathNodes.length)
  }

  const visualizeBFS = () => {
    let copiedArr = arrayInitialCopy(arrGrid)
    let visitedNodesInOrder = bfs(copiedArr, startNode.current)
    //console.log("All visited Nodes->", visitedNodesInOrder)
    let shortestPathNodes = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    )
    //console.log("Shortest path->", shortestPathNodes)
    animateAlgorithm(visitedNodesInOrder, shortestPathNodes, isFast, isSoundOn)
    setAlgoScore(shortestPathNodes.length)
  }

  const visualizeDFS = () => {
    let copiedArr = arrayInitialCopy(arrGrid)
    let visitedNodesInOrder = dfs(copiedArr, startNode.current)
    //console.log("All visited Nodes->", visitedNodesInOrder)
    animateAlgorithm(
      visitedNodesInOrder,
      visitedNodesInOrder,
      isFast,
      isSoundOn
    )
    setAlgoScore(visitedNodesInOrder.length)
  }

  const visualizeDijkstra = () => {
    let copiedArr = arrayInitialCopy(arrGrid)
    let visitedNodesInOrder = dijkstra(
      copiedArr,
      startNode.current,
      endNode.current
    )
    //console.log("All visited Nodes->", visitedNodesInOrder)
    let shortestPathNodes = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    )
    //console.log("Shortest path->", shortestPathNodes)

    animateAlgorithm(visitedNodesInOrder, shortestPathNodes, isFast, isSoundOn)
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
        generateMaze={generateMaze}
        isFast={isFast}
        setIsFast={setIsFast}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
      />
      <main className="main">
        <GridNodeContext.Provider
          value={{
            arrGrid,
            setArrGrid,
            userPathArr,
            setUserPathArr,
            startNode,
            endNode,
            isUKeyPressed,
            setIsUKeyPressed,
          }}
        >
          <GridNode />
        </GridNodeContext.Provider>
        <SideBar
          algoScore={algoScore}
          userPathArr={userPathArr}
          setUserPathArr={setUserPathArr}
          userScore={userScore}
          setUserScore={setUserScore}
          arrGrid={arrGrid}
          setArrGrid={setArrGrid}
          startNode={startNode.current}
          isUKeyPressed={isUKeyPressed}
        />
      </main>
    </>
  )
}

function arrayInitialCopy(grid) {
  // It returns the original array(when all node were unvisited.)
  let arrCopy = []
  for (let i = 0; i < grid.length; i++) {
    let row = []
    for (let j = 0; j < grid[0].length; j++) {
      let copiedCell = {
        row: grid[i][j].row,
        col: grid[i][j].col,
        distance: Infinity,
        isWall: grid[i][j].isWall,
        isUserNode: grid[i][j].isUserNode,
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

function noWallsArr(grid) {
  let copiedArr = arrayInitialCopy(grid)
  // Now we remove all the walls
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      copiedArr[i][j].isWall = false
    }
  }
  return copiedArr
}

function noUserPathArr(grid) {
  let copiedArr = arrayInitialCopy(grid)
  // Now we remove all the walls
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      copiedArr[i][j].isUserNode = false
    }
  }
  return copiedArr
}

export default App
