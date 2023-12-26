export function Node({ nodeSize, node, arrGrid, setArrGrid }) {
  const { row, col, isStartNode, isEndNode, isWall } = node

  let nodeType = isStartNode
    ? "start-node"
    : isEndNode
    ? "end-node"
    : isWall
    ? "wall-node"
    : ""

  function buildWallNodes(grid, row, col) {
    let updatedGrid = getUpdatedGridAfterTogglingWall(grid, row, col)
    setArrGrid(updatedGrid)
  }

  function getUpdatedGridAfterTogglingWall(grid, row, col) {
    // performs a deep copy on arrGrid.
    let arrGridCopy = arrayDeepCopy(grid)
    let node = arrGridCopy[row][col]
    node.isWall = !node.isWall
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
      onClick={() => {
        buildWallNodes(arrGrid, row, col)
      }}
    ></div>
  )
}
