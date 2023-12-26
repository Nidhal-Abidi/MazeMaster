/* Code extracted then MODIFIED from https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial/blob/master/src/algorithms/dijkstra.js */

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = []
  // getAllNodes transforms the array into 1 dimension + sets the distance(start node)=0
  const unvisitedNodes = getAllNodes(grid, startNode.row, startNode.col)

  while (unvisitedNodes.length !== 0) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder
    }
    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)
    // If we reach the end node, we stop.
    if (closestNode.isEndNode === true) return visitedNodesInOrder
    updateUnvisitedNeighbors(closestNode, grid)
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  // Neighbours are located at: top, right, bottom, left.
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  // Remove all the visited nodes.
  return neighbors.filter((neighbor) => !neighbor.isVisited)
}

function getAllNodes(grid, row, col) {
  const nodes = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i == row && j == col) {
        let startNodeUpdatedDistance = grid[i][j]
        startNodeUpdatedDistance.distance = 0
        nodes.push(startNodeUpdatedDistance)
      } else {
        nodes.push(grid[i][j])
      }
    }
  }
  /* for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  } */
  return nodes
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = []
  let currentNode = finishNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  return nodesInShortestPathOrder
}
