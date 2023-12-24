import { useEffect, useRef, useState } from "react"
import { Node } from "./Node"
import { GridSizeSwitch } from "./GridSizeSwitch"

export function GridNode({ arrGrid, setArrGrid, startNode, endNode }) {
  const [cellSide, setCellSide] = useState(60)
  const [gridDim, setGridDim] = useState([500, 500])

  const cellsContainerRef = useRef()

  useEffect(() => {
    let gridGap = 2
    /* Approximate calculation of the nbr of rows/columns that fit the width/height of any screen */
    let rows = Math.floor((gridDim[0] + gridGap) / (cellSide + gridGap)) - 2
    let cols = Math.floor((gridDim[1] + gridGap) / (cellSide + gridGap)) - 1
    if (cellSide == 90) {
      rows += 1
      cols += 1
    }

    setArrGrid(createGrid(rows, cols))
  }, [cellSide, gridDim])

  useEffect(() => {
    const height = cellsContainerRef.current.offsetHeight
    const width = cellsContainerRef.current.offsetWidth
    //console.log("Setting the height & width:(", height, ",", width, ")")
    setGridDim([height, width])
  }, [])

  function createGrid(rows, columns) {
    let randStartNode = {
      row: getRandomInt(0, rows),
      col: getRandomInt(0, Math.floor(columns / 2)),
    }
    let randEndNode = {
      row: getRandomInt(0, rows),
      col: getRandomInt(Math.floor(columns / 2), columns),
    }
    startNode.current = randStartNode
    endNode.current = randEndNode
    let arr = []
    for (let i = 0; i < rows; i++) {
      let currentRow = []
      for (let j = 0; j < columns; j++) {
        let node = createNode(i, j, randStartNode, randEndNode)
        currentRow.push(node)
      }
      arr.push(currentRow)
    }
    return arr
  }

  function createNode(row, col, randStartNode, randEndNode) {
    return {
      row: row,
      col: col,
      isStartNode: row == randStartNode.row && col == randStartNode.col,
      isEndNode: row == randEndNode.row && col == randEndNode.col,
      isWall: false,
      distance:
        row == randStartNode.row && col == randStartNode.col ? 0 : Infinity,
      isVisited: false,
      previousNode: null,
    }
  }

  function getRandomInt(min, max) {
    //Should return an integer between [0,max-1]
    return Math.floor(Math.random() * (max - min) + min)
  }

  return (
    <div className="grid-node">
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
        {arrGrid.map((row, rowIdx) => {
          return row.map((cell, colIdx) => {
            let nodeSize = cellSide == 90 ? "node-large" : "node-small"
            return <Node key={colIdx} nodeSize={nodeSize} node={cell} />
          })
        })}
      </div>
    </div>
  )
}
