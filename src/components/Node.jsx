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
    /* console.log("updated Grid", updatedGrid)
    console.log("original Grid", grid)
    console.log(
      "isSameArrs(updatedGrid, originalGrid):",
      isSameArrs(updatedGrid, grid, row, col)
    ) */
    setArrGrid(updatedGrid)
  }

  function isSameNodes(nodeA, nodeB) {
    if (
      nodeA.row !== nodeB.row ||
      nodeA.col !== nodeB.col ||
      nodeA.isStartNode !== nodeB.isStartNode ||
      nodeA.isEndNode !== nodeB.isEndNode ||
      nodeA.isWall !== nodeB.isWall
    )
      return false
    else {
      return true
    }
  }
  function isSameArrs(arr1, arr2, row, col) {
    if (arr1.length !== arr2.length) return false

    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1[0].length; j++) {
        //console.log("(", i, ",", j, ")")
        /* console.log('arr1[i,j]', arr1[i][j]);
        console.log('arr2[i,j]', arr2[i][j]); */
        if (i === row && j === col) continue
        let comp = isSameNodes(arr1[i][j], arr2[i][j])
        // console.log("comp=",comp)
        if (!comp) {
          return false
        }
      }
    }
    return true
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
