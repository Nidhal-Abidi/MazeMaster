export function SideBar({ algoScore }) {
  return (
    <div className="side-bar">
      <h1 className="header">Instructions:</h1>
      <ul>
        <li className="instruction-item">Place Start/End node. </li>
        <li className="instruction-item">Generate Maze (optional). </li>
        <li className="instruction-item">Place Walls (optional). </li>
        <li className="instruction-item">Visualize an algorithm. </li>
        <li className="instruction-item">
          Compare the score of your path to the score found by an algorithm.{" "}
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
    </div>
  )
}
