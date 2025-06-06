import { Grid, Node } from "../../utils/utilities";

/*Code extracted then MODIFIED from https://dev.to/codesphere/pathfinding-with-javascript-the-a-algorithm-3jlb*/
export function a_star(grid: Grid, startNode: Node, endNode: Node) {
  startNode = grid[startNode.row][startNode.col];

  startNode.distance = 0;
  startNode.h = manhattanDistance(startNode, endNode);
  startNode.f = startNode.h + startNode.distance;

  let openSet = [startNode]; //unvisited nodes (unevaluated)
  let closedSet = []; // visited nodes (completely evaluated)
  let visitedNodesInOrder = [];

  while (openSet.length > 0) {
    //console.log(openSet)
    // Search for the next node to explore (i.e. the one wit the lowest value of 'f')
    let lowestFscoreNodeIdx = getLowestFScoreNodeIdx(openSet);
    let currentNode = openSet[lowestFscoreNodeIdx];

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode.isEndNode == true) {
      return visitedNodesInOrder;
    }
    //Remove this node from the openSet
    openSet = removeNode(openSet, currentNode);
    //Add the node to the closedSet
    closedSet.push(currentNode);

    let neighbors = getNeighbors(grid, currentNode);

    for (const neighbor of neighbors) {
      if (neighbor.isWall == true) continue;

      if (!closedSet.includes(neighbor)) {
        let possibleG = currentNode.distance + 1;

        neighbor.distance = possibleG;
        neighbor.h = manhattanDistance(neighbor, endNode);
        neighbor.f = neighbor.distance + neighbor.h;
        neighbor.previousNode = currentNode;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (possibleG >= neighbor.distance) {
          //Changing the prevNode to a new one is bad since we'll have a higher score for this node
          continue;
        }

        /* neighbor.distance = possibleG
        neighbor.h = squareDistance(neighbor, endNode)
        neighbor.f = neighbor.distance + neighbor.h
        neighbor.previousNode = currentNode */
      }
    }
  }
  //no solution by default
  return visitedNodesInOrder;
}

function getLowestFScoreNodeIdx(openSet: Array<Node>) {
  // Returns the node with the lowest f-score in the openSet.
  let lowestFscoreNodeIdx = 0;
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[lowestFscoreNodeIdx].f) {
      lowestFscoreNodeIdx = i;
    }
  }
  return lowestFscoreNodeIdx;
}

function manhattanDistance(nodeA: Node, nodeB: Node) {
  //Trick src: https://www.redblobgames.com/pathfinding/a-star/implementation.html#ties-checkerboard-costs

  let prevCost =
    Math.abs(nodeA.col - nodeB.col) + Math.abs(nodeA.row - nodeB.row);
  let nudge = 0;
  if ((nodeA.row + nodeA.col) % 2 == 0 && nodeB.row != nodeA.row) {
    nudge = 1;
  }
  if ((nodeA.row + nodeA.col) % 2 == 1 && nodeB.col != nodeA.col) {
    nudge = 1;
  }
  return prevCost - 1 + nudge * 0.01;
}

function getNeighbors(grid: Grid, node: Node) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors;
}

function removeNode(arr: Array<Node>, node: Node) {
  // node should be inside of the arr.
  return arr.filter((currNode) => {
    if (currNode.row === node.row && currNode.col === node.col) {
      return false;
    } else {
      return true;
    }
  });
}
