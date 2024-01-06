export const animateAlgorithm = (
  visitedNodesInOrder,
  shortestPathNodes,
  isFast
) => {
  let speed = isFast ? 50 : 300
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    //Animate the shortest path at the end
    if (i == visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(shortestPathNodes)
      }, speed * i)
    } else {
      // Animate the visited nodes first.
      let node = visitedNodesInOrder[i]
      if (node.isStartNode || node.isEndNode) continue
      setTimeout(() => {
        let cell = document.querySelector(`#node-${node.row}-${node.col}`)
        cell.classList.add("visited-node")
        cell.classList.add("visited-node-animation")
        setTimeout(() => {
          cell.classList.remove("visited-node-animation")
        }, 1000)
      }, speed * i)
    }
  }
}

const animateShortestPath = (shortestPathNodes) => {
  let lastNode = shortestPathNodes[shortestPathNodes.length - 1]
  if (!lastNode.isEndNode) return
  for (let i = 0; i < shortestPathNodes.length; i++) {
    let node = shortestPathNodes[i]

    if (node.isStartNode || node.isEndNode) continue

    setTimeout(() => {
      let cell = document.querySelector(`#node-${node.row}-${node.col}`)
      cell.classList.add("final-path-node")
      cell.classList.add("final-path-animation")
      setTimeout(() => {
        cell.classList.remove("final-path-animation")
      }, 1000)
      //setAlgoScore((prevSc) => prevSc + 1)
    }, 100 * i)
  }
}
