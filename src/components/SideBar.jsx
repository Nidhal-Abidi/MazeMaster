import { useState } from "react"
import { arrayDeepCopyOneDim, checkPathValidity } from "../utils/userPathUtils"

export function SideBar({
  algoScore,
  userPathArr,
  userScore,
  setUserScore,
  arrGrid,
  setArrGrid,
  setUserPathArr,
  startNode,
  isUKeyPressed,
}) {
  const [isValidPath, setIsValidPath] = useState(false)
  const [msg, setMsg] = useState("")

  let customMsg = null
  if (msg !== "") {
    if (isValidPath) {
      customMsg = (
        <div className="user-path-success hover" onClick={toggleCustomMsg}>
          {msg}
        </div>
      )
    } else {
      customMsg = (
        <div className="user-path-error hover" onClick={toggleCustomMsg}>
          {msg}
        </div>
      )
    }
  }

  function toggleCustomMsg() {
    setMsg("")
  }

  function handleUserPathScore(userPathArr, arrGrid, startNode) {
    let copiedArr = arrayDeepCopyOneDim(userPathArr)
    let [isValidPath, msg] = checkPathValidity(copiedArr, arrGrid, startNode)

    setIsValidPath(isValidPath)
    setMsg(msg)

    if (isValidPath) {
      // 2 is added because we count the start & end node as part of the final path
      setUserScore(userPathArr.length + 2)
    }
  }

  function clearUserPath(setUserPathArr, setUserScore, setArrGrid) {
    setUserPathArr([])
    setUserScore(0)
    setArrGrid((prevGrid) => {
      for (let i = 0; i < prevGrid.length; i++) {
        for (let j = 0; j < prevGrid[0].length; j++) {
          prevGrid[i][j].isUserNode = false
        }
      }
      return prevGrid
    })
  }

  return (
    <div className="side-bar">
      <h1 className="header">Instructions:</h1>
      <ul>
        <li className="instruction-item">
          [optional]: Generate Maze. By default it has at least one path from
          start to finish.
        </li>
        <li className="instruction-item">[optional]: Add/ Remove Walls. </li>
        <li className="instruction-item">Pick an algorithm to visualize. </li>
        <li className="instruction-item">
          Clear Final Path after the animation is done.
        </li>
        <li className="instruction-item">
          Compare the score of your path to the one found by an algorithm.{" "}
        </li>
      </ul>
      <br />
      <h1 className="header">User VS Algo:</h1>
      <div className="user-path-info">
        Click ONCE on {"`U`"} and drag the mouse to build your path. <br />{" "}
        <br />
        <span>
          {"`U`"} is {isUKeyPressed ? "pressed" : "not pressed"}
        </span>
      </div>

      <div className="path-score">
        <h3>User{"'"}s score</h3>
        <input type="text" disabled={true} value={userScore} />
      </div>
      <div className="path-score">
        <h3>Algorithm{"'"}s score</h3>
        <input type="text" disabled={true} value={algoScore} />
      </div>

      {customMsg != null ? customMsg : ""}

      <div className="user-path-btns-container">
        <button
          className="btn btn-small"
          onClick={() => handleUserPathScore(userPathArr, arrGrid, startNode)}
        >
          My Path{"'"}s Score
        </button>

        <button
          className="btn btn-small"
          onClick={() => {
            clearUserPath(setUserPathArr, setUserScore, setArrGrid)
          }}
        >
          Clear user path
        </button>
      </div>
    </div>
  )
}
