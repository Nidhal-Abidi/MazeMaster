export type Node = {
  row: number;
  col: number;
  distance: number;
  h?: number;
  f?: number;
  isWall: boolean;
  isUserNode?: boolean;
  isVisited: boolean;
  isStartNode: boolean;
  isEndNode: boolean;
  previousNode: null | Node;
};

export type Grid = Array<Array<Node>>;
