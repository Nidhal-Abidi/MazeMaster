export function arrayDeepCopy(grid) {
  // We do this since the method since JSON.string(JSON.parse(arr)) has data loss.
  // It sets distance to null (prev value was infinity)
  let arrCopy = JSON.parse(JSON.stringify(grid))
  arrCopy.forEach((node) => {
    node.distance = Infinity
  })
  return arrCopy
}

export function checkPathValidity(userPathArr, arrGrid, startNode) {
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

function isSameNode(nodeA, nodeB) {
  return nodeA.row == nodeB.row && nodeA.col == nodeB.col
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
