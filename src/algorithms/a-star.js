/*Code extracted then MODIFIED from https://dev.to/codesphere/pathfinding-with-javascript-the-a-algorithm-3jlb*/
export function a_star(grid, startNode, endNode) {
  startNode = grid[startNode.row][startNode.col]

  startNode.distance = 0
  startNode.h = manhattanDistance(startNode, endNode)
  startNode.f = startNode.h + startNode.distance

  let openSet = [startNode] //unvisited nodes (unevaluated)
  let closedSet = [] // visited nodes (completely evaluated)
  let visitedNodesInOrder = []

  while (openSet.length > 0) {
    // Search for the next node to explore (i.e. the one wit the lowest value of 'f')
    let lowestFscoreNodeIdx = getLowestFScoreNodeIdx(openSet)
    let currentNode = openSet[lowestFscoreNodeIdx]

    currentNode.isVisited = true
    visitedNodesInOrder.push(currentNode)
    if (currentNode.isEndNode == true) {
      return visitedNodesInOrder
    }
    //Remove this node from the openSet
    openSet.splice(currentNode, 1)
    //Add the node to the closedSet
    closedSet.push(currentNode)

    let neighbors = getNeighbors(grid, currentNode)

    for (const neighbor of neighbors) {
      if (neighbor.isWall == true) continue

      if (!closedSet.includes(neighbor)) {
        let possibleG = currentNode.distance + 1

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor)
        } else if (possibleG >= neighbor.distance) {
          //Changing the prevNode to a new one is bad since we'll have a higher score for this node
          continue
        }

        neighbor.distance = possibleG
        neighbor.h = manhattanDistance(neighbor, endNode)
        neighbor.f = neighbor.distance + neighbor.h
        neighbor.previousNode = currentNode
      }
    }
  }
  //no solution by default
  return visitedNodesInOrder
}

function getLowestFScoreNodeIdx(openSet) {
  // Returns the node with the lowest f-score in the openSet.
  let lowestFscoreNodeIdx = 0
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[lowestFscoreNodeIdx].f) {
      lowestFscoreNodeIdx = i
    }
  }
  return lowestFscoreNodeIdx
}

function manhattanDistance(nodeA, nodeB) {
  //src: https://www.redblobgames.com/pathfinding/a-star/implementation.html#ties-checkerboard-costs

  let prevCost =
    Math.abs(nodeA.col - nodeB.col) + Math.abs(nodeA.row - nodeB.row)
  let nudge = 0
  if ((nodeA.row + nodeA.col) % 2 == 0 && nodeB.row != nodeA.row) {
    nudge = 1
  }
  if ((nodeA.row + nodeA.col) % 2 == 1 && nodeB.col != nodeA.col) {
    nudge = 1
  }
  return prevCost
}

function getNeighbors(grid, node) {
  const neighbors = []
  const { col, row } = node
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

  return neighbors
}
