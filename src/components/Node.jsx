import { GridNodeContext } from "../App"
import { useContext } from "react"

export function Node({
  nodeSize,
  node,
  isUKeyPressed,
  setIsMousePressed,
  isMousePressed,
}) {
  const { arrGrid, setArrGrid, setUserPathArr } = useContext(GridNodeContext)
  const { row, col, isStartNode, isEndNode, isWall, isUserNode } = node

  let nodeType = isStartNode
    ? "start-node"
    : isEndNode
    ? "end-node"
    : isWall
    ? "wall-node"
    : isUserNode
    ? "user-node"
    : ""

  /* Used to create the walls while dragging the mouse */
  function handleMouseDownWalls(grid, row, col) {
    let node = grid[row][col]
    if (!(node.isUserNode || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingWall(grid, row, col)
      setArrGrid(updatedGrid)
      setIsMousePressed(true)
    }
  }
  function handleMouseEnterWalls(grid, row, col) {
    if (!isMousePressed || isUKeyPressed) return
    let node = grid[row][col]
    if (!(node.isUserNode || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingWall(grid, row, col)
      setArrGrid(updatedGrid)
    }
  }
  function getUpdatedGridAfterTogglingWall(grid, row, col) {
    // performs a deep copy on arrGrid.
    let arrGridCopy = arrayDeepCopyTwoDim(grid)
    let node = arrGridCopy[row][col]
    node.isWall = !node.isWall
    arrGridCopy[row][col] = node
    return arrGridCopy
  }

  /* Used to create the userPath while dragging the mouse + after clicking the letter 'u' once*/
  function handleMouseDownUserPath(grid, row, col) {
    let node = grid[row][col]
    if (!(node.isWall || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingUserNode(grid, row, col)
      setArrGrid(updatedGrid)
      updateUserPathArr(updatedGrid[row][col])
      setIsMousePressed(true)
      //
    }
  }
  function handleMouseEnterUserPath(grid, row, col) {
    if (!(isMousePressed && isUKeyPressed)) return
    let node = grid[row][col]
    if (!(node.isWall || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingUserNode(grid, row, col)
      updateUserPathArr(updatedGrid[row][col])
      setArrGrid(updatedGrid)
      //
    }
  }
  function getUpdatedGridAfterTogglingUserNode(grid, row, col) {
    // performs a deep copy on arrGrid.
    let arrGridCopy = arrayDeepCopyTwoDim(grid)
    let node = arrGridCopy[row][col]
    node.isUserNode = !node.isUserNode
    arrGridCopy[row][col] = node
    return arrGridCopy
  }
  function updateUserPathArr(node) {
    if (node.isUserNode) {
      // Add the node to the array
      setUserPathArr((userPathArr) => [...userPathArr, node])
    } else {
      // The user decided to remove it from his path i.e. remove it from the array
      setUserPathArr((userPathArr) => {
        return userPathArr.filter((currNode) => {
          if (currNode.row === node.row && currNode.col === node.col) {
            return false
          } else {
            return true
          }
        })
      })
    }
  }

  function handleMouseUp() {
    setIsMousePressed(false)
  }

  /* Helper fct */
  function arrayDeepCopyTwoDim(grid) {
    // We do this since the method since JSON.string(JSON.parse(arr)) has data loss.
    // It sets distance to null (prev value was infinity)
    let arrCopy = JSON.parse(JSON.stringify(grid))
    arrCopy.forEach((row) => {
      row.forEach((cell) => {
        cell.distance = Infinity
      })
    })
    return arrCopy
  }

  return (
    <div
      className={`node ${nodeSize} ${nodeType}`}
      id={`node-${row}-${col}`}
      tabIndex={-1}
      onMouseDown={() => {
        if (isUKeyPressed) {
          handleMouseDownUserPath(arrGrid, row, col)
        } else {
          handleMouseDownWalls(arrGrid, row, col)
        }
      }}
      onMouseEnter={() => {
        if (isUKeyPressed) {
          handleMouseEnterUserPath(arrGrid, row, col)
        } else {
          handleMouseEnterWalls(arrGrid, row, col)
        }
      }}
      onMouseUp={() => handleMouseUp()}
    ></div>
  )
}
