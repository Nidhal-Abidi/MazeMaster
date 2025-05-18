export function GridSizeSwitch({
  cellSide,
  setCellSide,
}: {
  cellSide: number;
  setCellSide: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={cellSide == 60}
        onChange={() => {
          if (cellSide == 60) {
            setCellSide(90);
          } else {
            setCellSide(60);
          }
        }}
      />
      <span className="slider round"></span>
    </label>
  );
}
