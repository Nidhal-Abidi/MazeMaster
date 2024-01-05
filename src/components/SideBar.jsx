export function SideBar({ algoScore }) {
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
          Clear Final Path after the animation is done
        </li>
        <li className="instruction-item">
          Compare the score of your path to the one found by an algorithm.{" "}
        </li>
      </ul>
      <h1 className="header">User VS Algo:</h1>

      <div className="path-score">
        <h3>User{"'"}s score</h3>
        <input type="text" disabled={true} defaultValue={0} />
      </div>
      <div className="path-score">
        <h3>Algorithm{"'"}s score</h3>
        <input type="text" disabled={true} value={algoScore} />
      </div>
      <button className="btn btn-small">My Path{"'"}s Score</button>
    </div>
  )
}
