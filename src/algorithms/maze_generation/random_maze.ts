import { Grid, Node } from "../../utils/utilities";
import { dijkstra, getNodesInShortestPathOrder } from "../pathfinding/dijkstra";

export function random_maze(grid: Grid, startNode: Node, endNode: Node) {
  // Make sure that there's at least 1 possible path from start to finish (run Dijkstra on grid with no walls)

  let visitedNodesInOrder = dijkstra(grid, startNode, endNode);
  let shortestPathNodes = getNodesInShortestPathOrder(
    visitedNodesInOrder[visitedNodesInOrder.length - 1]
  );

  for (let i = 0; i < grid.length; i++) {
    let wallIdxs = wallsIndices(grid[0].length);

    for (let j = 0; j < grid[0].length; j++) {
      // Skip start and end Nodes
      if (grid[i][j].isStartNode || grid[i][j].isEndNode) continue;

      // Skip the nodes which are part of the final path found above.
      if (is_part_of_final_path(shortestPathNodes, i, j)) continue;

      // Otherwise Add walls
      if (wallIdxs.has(j)) {
        grid[i][j].isWall = true;
      }
    }
  }
  return grid;
}

function wallsIndices(rowLength: number) {
  let walls = new Set();
  let nbrWalls = randInt(4, rowLength - 5);

  while (walls.size < nbrWalls) {
    let wallIdx = randInt(0, rowLength);
    walls.add(wallIdx);
  }
  return walls;
}

function randInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function is_part_of_final_path(
  f_path_nodes: Node[],
  currRow: number,
  currCol: number
) {
  for (let i = 0; i < f_path_nodes.length; i++) {
    if (f_path_nodes[i].row == currRow && f_path_nodes[i].col == currCol) {
      return true;
    }
  }
  return false;
}
