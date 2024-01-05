export function bfs(grid, start) {
  let startNode = grid[start.row][start.col]
  const queue = [startNode]
  const visitedNodesInOrder = []

  while (queue.length !== 0) {
    const vertex = queue.shift()

    if (vertex.isWall) continue

    if (vertex.isVisited == false) {
      vertex.isVisited = true
      visitedNodesInOrder.push(vertex)

      if (vertex.isEndNode) return visitedNodesInOrder

      let neighbors = getNeighbors(vertex, grid)

      for (const neighbor of neighbors) {
        if (neighbor.isVisited) continue
        // To avoid circular JSON. We need a deep copy of previousNode
        neighbor.previousNode = {
          row: vertex.row,
          col: vertex.col,
          distance: vertex.distance,
          isEndNode: vertex.isEndNode,
          isStartNode: vertex.isStartNode,
          isVisited: vertex.isVisited,
          isWall: vertex.isWall,
          previousNode: vertex.previousNode,
        }
        queue.push(neighbor)
      }
    }
  }
  visitedNodesInOrder[0].previousNode = null
  return visitedNodesInOrder
}

function getNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  //Trick src: https://www.redblobgames.com/pathfinding/a-star/implementation.html#ties-checkerboard-neighbors
  if ((row + col) % 2 == 1) {
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  } else {
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  }

  return neighbors
}

function updateNeighbors(node, grid) {
  const unvisitedNeighbors = getNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.previousNode = node
  }
}

export function shortestPathNodes(finishNode) {
  const nodesInShortestPathOrder = []
  let currentNode = finishNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  return nodesInShortestPathOrder
}
