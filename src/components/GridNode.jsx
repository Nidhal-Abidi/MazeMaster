import { useEffect, useRef, useState } from "react"
import { Node } from "./Node"

export function GridNode() {
  const [arrGrid, setArrGrid] = useState([])
  const [cellSide, setCellSide] = useState(90)
  const [gridDim, setGridDim] = useState([500, 500])

  const cellsContainerRef = useRef()

  useEffect(() => {
    let gridGap = 2

    /* Approximate calculation of the nbr of rows/columns that fit the width/height of any screen */
    let rows = Math.floor((gridDim[0] + gridGap) / (cellSide + gridGap) - 1)
    let cols = Math.floor((gridDim[1] + gridGap) / (cellSide + gridGap) - 1)
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
    let arr = []
    for (let i = 0; i < rows; i++) {
      let currentRow = []
      for (let j = 0; j < columns; j++) {
        currentRow.push([])
      }
      arr.push(currentRow)
    }
    return arr
  }

  return (
    <div className="grid-node">
      <p style={{ color: "white" }}>Grid Size</p>
      <label className="switch">
        <input
          type="checkbox"
          checked={cellSide == 90}
          onChange={() => {
            if (cellSide == 60) {
              setCellSide(90)
            } else {
              setCellSide(60)
            }
          }}
        />
        <span className="slider round"></span>
      </label>
      <div
        className={`cells-container ${
          cellSide == 90
            ? "cells-container-large-nodes"
            : "cells-container-small-nodes"
        }`}
        ref={cellsContainerRef}
      >
        {arrGrid.map((row, idx) => {
          return row.map((cell, cellIdx) => {
            let nodeType = cellSide == 90 ? "node-large" : "node-small"
            return <Node key={cellIdx} nodeType={nodeType} />
          })
        })}
      </div>
    </div>
  )
}
