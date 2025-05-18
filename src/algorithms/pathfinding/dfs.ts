import { Grid, Node } from "../../utils/utilities";

export function dfs(grid: Grid, startNode: Node) {
  let startNodeDetails = grid[startNode.row][startNode.col];
  const stack = [startNodeDetails];
  const visitedNodesInOrder = [];
  while (stack.length !== 0) {
    const vertex = stack.pop() as Node;
    // If we encounter a wall, we skip it.
    if (vertex.isWall) continue;

    if (vertex.isVisited == false) {
      visitedNodesInOrder.push(vertex);
      vertex.isVisited = true;
      if (vertex.isEndNode) return visitedNodesInOrder;

      let neighbours = getNeighbors(vertex, grid);

      for (const neighbor of neighbours) {
        stack.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}

function getNeighbors(node: Node, grid: Grid) {
  const neighbors = [];
  const { col, row } = node;
  // Neighbours are located at: top, right, bottom, left.
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors;
}
