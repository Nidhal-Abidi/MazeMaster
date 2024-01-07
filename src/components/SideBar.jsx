import { useEffect, useState } from "react"

export function SideBar({
  algoScore,
  userPathArr,
  userScore,
  setUserScore,
  arrGrid,
  setArrGrid,
  setUserPathArr,
  startNode,
}) {
  const [isValidPath, setIsValidPath] = useState(false)
  const [msg, setMsg] = useState("")

  let customMsg = null
  if (msg !== "") {
    if (isValidPath) {
      customMsg = (
        <div className="user-path-success hover" onClick={toggleCustomMsg}>
          {msg}
        </div>
      )
    } else {
      customMsg = (
        <div className="user-path-error hover" onClick={toggleCustomMsg}>
          {msg}
        </div>
      )
    }
  }

  function toggleCustomMsg() {
    setMsg("")
  }

  function checkPathValidity(userPathArr, arrGrid, startNode) {
    let prevNode = startNode
    let currentNode = startNode
    let neighbors = null
    let isStartNode = isSameNode(currentNode, startNode)
    while (isStartNode || userPathArr.length > 1) {
      neighbors = getNeighbors(currentNode, arrGrid)
      if (isNoNeighboringUserNodes(neighbors, prevNode)) {
        return [
          false,
          `Can't find any neighboring user nodes for the node (${currentNode.row},${currentNode.col})`,
        ]
      } else if (isNonDeterministicUserPath(neighbors, prevNode, currentNode)) {
        return [
          false,
          `Starting from node(${currentNode.row},${currentNode.col}), the path is undeterministic(i.e. we have more than one node to choose from)`,
        ]
      }
      //remove the current node from userPathArr
      userPathArr = removeNode(userPathArr, currentNode)
      let temp = prevNode
      prevNode = currentNode
      currentNode = getNextUserPathNode(neighbors, temp)
      isStartNode = isSameNode(currentNode, startNode)
    }
    neighbors = getNeighbors(userPathArr[0], arrGrid)
    if (!containsEndNode(neighbors)) {
      return [
        false,
        `Current Node(${currentNode.row},${currentNode.col}), can't reach the end node`,
      ]
    } else {
      return [
        true,
        "Valid Path! Now run an algorithm to compare your path's score with the one outputted by the algorithm",
      ]
    }
  }

  function isNoNeighboringUserNodes(neighbors, prevNode) {
    for (const neighbor of neighbors) {
      if (neighbor.isUserNode && !isSameNode(neighbor, prevNode)) {
        return false
      }
    }
    return true
  }

  function isNonDeterministicUserPath(neighbors, prevNode, currentNode) {
    let userPathNodesCtr = 0
    if (currentNode.row == 0 && currentNode.col == 0) {
      for (const neighbor of neighbors) {
        if (neighbor.isUserNode) {
          userPathNodesCtr += 1
        }
      }
      return userPathNodesCtr > 1
    } else {
      for (const neighbor of neighbors) {
        if (!isSameNode(neighbor, prevNode) && neighbor.isUserNode) {
          userPathNodesCtr += 1
        }
      }
      return userPathNodesCtr >= 2
    }
  }

  function isSameNode(nodeA, nodeB) {
    return nodeA.row == nodeB.row && nodeA.col == nodeB.col
  }

  function removeNode(arr, node) {
    // node should be inside of the arr.
    return arr.filter((currNode) => {
      if (currNode.row === node.row && currNode.col === node.col) {
        return false
      } else {
        return true
      }
    })
  }

  function getNextUserPathNode(neighbors, prevNode) {
    for (const neighbor of neighbors) {
      if (neighbor.isUserNode && !isSameNode(neighbor, prevNode)) {
        return neighbor
      }
    }
  }

  function containsEndNode(neighbors) {
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].isEndNode) {
        return true
      }
    }
    return false
  }

  function handleUserPathScore(userPathArr, arrGrid, startNode) {
    let copiedArr = arrayDeepCopy(userPathArr)
    let [isValidPath, msg] = checkPathValidity(copiedArr, arrGrid, startNode)

    setIsValidPath(isValidPath)
    setMsg(msg)

    if (isValidPath) {
      setUserScore(userPathArr.length)
    }
  }

  function getNeighbors(node, grid) {
    const neighbors = []
    const { col, row } = node
    // Neighbours are located at: top, bottom, left, right.
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors
  }

  function arrayDeepCopy(grid) {
    // We do this since the method since JSON.string(JSON.parse(arr)) has data loss.
    // It sets distance to null (prev value was infinity)
    let arrCopy = JSON.parse(JSON.stringify(grid))
    arrCopy.forEach((node) => {
      node.distance = Infinity
    })
    return arrCopy
  }

  function clearUserPath(setUserPathArr, setUserScore, setArrGrid) {
    setUserPathArr([])
    setUserScore(0)
    setArrGrid((prevGrid) => {
      for (let i = 0; i < prevGrid.length; i++) {
        for (let j = 0; j < prevGrid[0].length; j++) {
          prevGrid[i][j].isUserNode = false
        }
      }
      return prevGrid
    })
  }

  return (
    <div className="side-bar">
      <h1 className="header">Instructions:</h1>
      <ul>
        <li className="instruction-item">
          [optional]: Generate Maze. By default it has at least one path from
          start to finish.
        </li>
        <li className="instruction-item">[optional]: Add/ Remove Walls. </li>
        <li className="instruction-item">Pick an algorithm to visualize. </li>
        <li className="instruction-item">
          Clear Final Path after the animation is done.
        </li>
        <li className="instruction-item">
          Compare the score of your path to the one found by an algorithm.{" "}
        </li>
      </ul>
      <br />
      <h1 className="header">User VS Algo:</h1>
      <div className="user-path-info">
        Hold key {"`U`"} and click on the cells to build your path
      </div>

      <div className="path-score">
        <h3>User{"'"}s score</h3>
        <input type="text" disabled={true} value={userScore} />
      </div>
      <div className="path-score">
        <h3>Algorithm{"'"}s score</h3>
        <input type="text" disabled={true} value={algoScore} />
      </div>

      {customMsg != null ? customMsg : ""}

      <div className="user-path-btns-container">
        <button
          className="btn btn-small"
          onClick={() => handleUserPathScore(userPathArr, arrGrid, startNode)}
        >
          My Path{"'"}s Score
        </button>

        <button
          className="btn btn-small"
          onClick={() => {
            clearUserPath(setUserPathArr, setUserScore, setArrGrid)
          }}
        >
          Clear user path
        </button>
      </div>
    </div>
  )
}
