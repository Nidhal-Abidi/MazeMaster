import { useEffect, useRef, useState, useContext } from "react";
import { Cell } from "./Cell";
import { GridSizeSwitch } from "./GridSizeSwitch";
import { GridNodeContext } from "../App";

export function GridNode() {
  const {
    arrGrid,
    setArrGrid,
    startNode,
    endNode,
    isUKeyPressed,
    setIsUKeyPressed,
  } = useContext(GridNodeContext);

  const [cellSide, setCellSide] = useState(60);
  const [gridDim, setGridDim] = useState([500, 500]);
  const cellsContainerRef = useRef<HTMLDivElement>();

  const [isMousePressed, setIsMousePressed] = useState(false);

  useEffect(() => {
    const createGrid = (rows: number, columns: number) => {
      let startNodeTopLeft = {
        row: 0, //getRandomInt(0, rows),
        col: 0, //getRandomInt(0, Math.floor(columns / 2)),
      };
      let endNodeBottomRight = {
        row: rows - 1, //getRandomInt(0, rows),
        col: columns - 1, //getRandomInt(Math.floor(columns / 2), columns),
      };
      startNode.current = startNodeTopLeft;
      endNode.current = endNodeBottomRight;
      let arr = [];
      for (let i = 0; i < rows; i++) {
        let currentRow = [];
        for (let j = 0; j < columns; j++) {
          let node = createNode(i, j, startNodeTopLeft, endNodeBottomRight);
          currentRow.push(node);
        }
        arr.push(currentRow);
      }
      return arr;
    };

    let gridGap = 2;
    /* Approximate calculation of the nbr of rows/columns that fit the width/height of any screen */
    let rows = Math.floor((gridDim[0] + gridGap) / (cellSide + gridGap)) - 2;
    let cols = Math.floor((gridDim[1] + gridGap) / (cellSide + gridGap)) - 1;
    if (cellSide == 90) {
      rows += 1;
      cols += 1;
    }

    setArrGrid(createGrid(rows, cols));
  }, [cellSide, gridDim, setArrGrid, endNode, startNode]);

  useEffect(() => {
    const height = cellsContainerRef.current.offsetHeight;
    const width = cellsContainerRef.current.offsetWidth;
    //console.log("Setting the height & width:(", height, ",", width, ")")
    setGridDim([height, width]);
  }, []);

  function createNode(
    row: number,
    col: number,
    randStartNode: { row: number; col: number },
    randEndNode: { row: number; col: number }
  ) {
    return {
      row: row,
      col: col,
      isStartNode: row == randStartNode.row && col == randStartNode.col,
      isEndNode: row == randEndNode.row && col == randEndNode.col,
      isWall: false,
      isUserNode: false,
      distance:
        row == randStartNode.row && col == randStartNode.col ? 0 : Infinity,
      isVisited: false,
      previousNode: null,
    };
  }

  /* function getRandomInt(min, max) {
    //Should return an integer between [0,max-1]
    return Math.floor(Math.random() * (max - min) + min)
  } */

  function handleKeyUp(event: Event) {
    if (event.code == "KeyU") {
      setIsUKeyPressed((isUKeyPressed) => !isUKeyPressed);
    }
  }

  return (
    <div
      className="grid-node"
      tabIndex={-1}
      onKeyUp={(e) => {
        handleKeyUp(e);
      }}
    >
      <p style={{ color: "white" }}>Grid Size</p>
      <GridSizeSwitch cellSide={cellSide} setCellSide={setCellSide} />
      <div
        className={`cells-container ${
          cellSide == 90
            ? "cells-container-large-nodes"
            : "cells-container-small-nodes"
        }`}
        ref={cellsContainerRef}
      >
        {arrGrid.map((row) => {
          return row.map((cell, colIdx) => {
            let nodeSize = cellSide == 90 ? "node-large" : "node-small";
            return (
              <Cell
                key={colIdx}
                nodeSize={nodeSize}
                node={cell}
                isUKeyPressed={isUKeyPressed}
                setIsMousePressed={setIsMousePressed}
                isMousePressed={isMousePressed}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
