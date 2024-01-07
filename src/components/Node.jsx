export function Node({
  nodeSize,
  node,
  arrGrid,
  setArrGrid,
  isUKeyPressed,
  userPathArr,
  setUserPathArr,
}) {
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

  function buildWallNodes(grid, row, col) {
    let node = grid[row][col]
    if (!node.isUserNode) {
      let updatedGrid = getUpdatedGridAfterTogglingWall(grid, row, col)
      setArrGrid(updatedGrid)
    }
  }

  function getUpdatedGridAfterTogglingWall(grid, row, col) {
    // performs a deep copy on arrGrid.
    let arrGridCopy = arrayDeepCopy(grid)
    let node = arrGridCopy[row][col]
    node.isWall = !node.isWall
    arrGridCopy[row][col] = node
    return arrGridCopy
  }

  function buildUserPathNodes(grid, row, col) {
    let node = grid[row][col]
    if (!(node.isWall || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingUserNode(grid, row, col)
      setArrGrid(updatedGrid)
      updateUserPathArr(updatedGrid[row][col])
      //
    }
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

  function getUpdatedGridAfterTogglingUserNode(grid, row, col) {
    // performs a deep copy on arrGrid.
    let arrGridCopy = arrayDeepCopy(grid)
    let node = arrGridCopy[row][col]
    node.isUserNode = !node.isUserNode
    arrGridCopy[row][col] = node
    return arrGridCopy
  }

  function arrayDeepCopy(grid) {
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
      onClick={() => {
        if (isUKeyPressed) {
          buildUserPathNodes(arrGrid, row, col)
        } else {
          buildWallNodes(arrGrid, row, col)
        }
      }}
    ></div>
  )
}
