export function Node({ nodeSize, node }) {
  const { row, col, isStartNode, isEndNode, isWall } = node

  let nodeType = isStartNode ? "start-node" : isEndNode ? "end-node" : ""

  return <div className={`node ${nodeSize} ${nodeType}`}></div>
}
