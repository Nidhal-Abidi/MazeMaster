import { Node } from "./utils/utilities";

let audioCtx: AudioContext | null = null;

export const animateAlgorithm = (
  visitedNodesInOrder: Node[],
  shortestPathNodes: Node[],
  isFast: 0 | 1,
  isSoundOn: 0 | 1
) => {
  let speed = isFast ? 50 : 300;
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    //Animate the shortest path at the end
    if (i == visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(shortestPathNodes, isSoundOn);
      }, speed * i);
    } else {
      // Animate the visited nodes first.
      let node = visitedNodesInOrder[i];
      if (node.isStartNode || node.isEndNode) continue;
      setTimeout(() => {
        let cell = document.querySelector<HTMLDivElement>(
          `#node-${node.row}-${node.col}`
        )!;
        cell.classList.add("visited-node");
        cell.classList.add("visited-node-animation");
        if (isSoundOn) {
          // play the sound
          playNotes(200 + (node.row + node.col) * 50, "square");
        }

        setTimeout(() => {
          cell.classList.remove("visited-node-animation");
        }, 1000);
      }, speed * i);
    }
  }
};

const animateShortestPath = (shortestPathNodes: Node[], isSoundOn: 0 | 1) => {
  let lastNode = shortestPathNodes[shortestPathNodes.length - 1];
  if (!lastNode.isEndNode) return;
  for (let i = 0; i < shortestPathNodes.length; i++) {
    let node = shortestPathNodes[i];

    if (node.isStartNode || node.isEndNode) continue;

    setTimeout(() => {
      let cell = document.querySelector<HTMLDivElement>(
        `#node-${node.row}-${node.col}`
      )!;
      cell.classList.add("final-path-node");
      cell.classList.add("final-path-animation");
      if (isSoundOn) {
        // play the sound
        playNotes(200 + (node.row + node.col) * 50, "sine");
      }

      setTimeout(() => {
        cell.classList.remove("final-path-animation");
      }, 1000);
      //setAlgoScore((prevSc) => prevSc + 1)
    }, 100 * i);
  }
};

function playNotes(freq: number, type: OscillatorType) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext || window.webkitAudioContext)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.type = type;
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.2;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}
