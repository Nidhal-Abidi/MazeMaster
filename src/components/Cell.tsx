import { GridNodeContext } from "../App";
import { useContext } from "react";
import { Grid, Node } from "../utils/utilities";

export function Cell({
  nodeSize,
  node,
  isUKeyPressed,
  setIsMousePressed,
  isMousePressed,
}: {
  nodeSize: string;
  node: Node;
  isUKeyPressed: boolean;
  setIsMousePressed: React.Dispatch<React.SetStateAction<boolean>>;
  isMousePressed: boolean;
}) {
  const { arrGrid, setArrGrid, setUserPathArr } = useContext(GridNodeContext);
  const { row, col, isStartNode, isEndNode, isWall, isUserNode } = node;

  let nodeType = isStartNode
    ? "start-node"
    : isEndNode
    ? "end-node"
    : isWall
    ? "wall-node"
    : isUserNode
    ? "user-node"
    : "";

  /* Used to create the walls while dragging the mouse */
  function handleMouseDownWalls(grid: Grid, row: number, col: number) {
    let node = grid[row][col];
    if (!(node.isUserNode || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingWall(grid, row, col);
      setArrGrid(updatedGrid);
      setIsMousePressed(true);
    }
  }
  function handleMouseEnterWalls(grid: Grid, row: number, col: number) {
    if (!isMousePressed || isUKeyPressed) return;
    let node = grid[row][col];
    if (!(node.isUserNode || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingWall(grid, row, col);
      setArrGrid(updatedGrid);
    }
  }
  function getUpdatedGridAfterTogglingWall(
    grid: Grid,
    row: number,
    col: number
  ) {
    // performs a deep copy on arrGrid.
    let arrGridCopy = arrayDeepCopyTwoDim(grid);
    let node = arrGridCopy[row][col];
    node.isWall = !node.isWall;
    arrGridCopy[row][col] = node;
    return arrGridCopy;
  }

  /* Used to create the userPath while dragging the mouse + after clicking the letter 'u' once*/
  function handleMouseDownUserPath(grid: Grid, row: number, col: number) {
    let node = grid[row][col];
    if (!(node.isWall || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingUserNode(grid, row, col);
      setArrGrid(updatedGrid);
      updateUserPathArr(updatedGrid[row][col]);
      setIsMousePressed(true);
      //
    }
  }

  function handleMouseEnterUserPath(grid: Grid, row: number, col: number) {
    if (!(isMousePressed && isUKeyPressed)) return;
    let node = grid[row][col];
    if (!(node.isWall || node.isStartNode || node.isEndNode)) {
      let updatedGrid = getUpdatedGridAfterTogglingUserNode(grid, row, col);
      updateUserPathArr(updatedGrid[row][col]);
      setArrGrid(updatedGrid);
      //
    }
  }

  function getUpdatedGridAfterTogglingUserNode(
    grid: Grid,
    row: number,
    col: number
  ) {
    // performs a deep copy on arrGrid.
    let arrGridCopy = arrayDeepCopyTwoDim(grid);
    let node = arrGridCopy[row][col];
    node.isUserNode = !node.isUserNode;
    arrGridCopy[row][col] = node;
    return arrGridCopy;
  }

  function updateUserPathArr(node: Node) {
    if (node.isUserNode) {
      // Add the node to the array
      setUserPathArr((userPathArr) => [...userPathArr, node]);
    } else {
      // The user decided to remove it from his path i.e. remove it from the array
      setUserPathArr((userPathArr) => {
        return userPathArr.filter((currNode) => {
          if (currNode.row === node.row && currNode.col === node.col) {
            return false;
          } else {
            return true;
          }
        });
      });
    }
  }

  function handleMouseUp() {
    setIsMousePressed(false);
  }

  /* Helper fct */
  function arrayDeepCopyTwoDim(grid: Grid) {
    // We do this since the method since JSON.string(JSON.parse(arr)) has data loss.
    // It sets distance to null (prev value was infinity)
    let arrCopy: Grid = JSON.parse(JSON.stringify(grid));
    arrCopy.forEach((row) => {
      row.forEach((cell) => {
        cell.distance = Infinity;
      });
    });
    return arrCopy;
  }

  return (
    <div
      className={`node ${nodeSize} ${nodeType}`}
      id={`node-${row}-${col}`}
      tabIndex={-1}
      onMouseDown={() => {
        if (isUKeyPressed) {
          handleMouseDownUserPath(arrGrid, row, col);
        } else {
          handleMouseDownWalls(arrGrid, row, col);
        }
      }}
      onMouseEnter={() => {
        if (isUKeyPressed) {
          handleMouseEnterUserPath(arrGrid, row, col);
        } else {
          handleMouseEnterWalls(arrGrid, row, col);
        }
      }}
      onMouseUp={() => handleMouseUp()}
    ></div>
  );
}
