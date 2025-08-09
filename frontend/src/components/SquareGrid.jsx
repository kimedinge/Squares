import React from "react";

/// SquareGrid handles the rendering of the grid.
/// in the for-loop we iterate through the columns and rows
/// in order to add squares from top-right to bottom-right and then to bottom-left
export default function SquareGrid({ squares }) {
  if (!squares || squares.length === 0) return null;

  const ordered = [...squares].sort((a, b) => a.index - b.index);
  const N = ordered.length;
  const dim = Math.ceil(Math.sqrt(N));
  const grid = Array.from({ length: dim }, () => Array(dim).fill(null));

  let idx = 0;
  for (let k = 1; k <= dim && idx < N; k++) {
    // First square is always alone
    if (k === 1) {
      grid[0][0] = ordered[idx++];
      continue;
    }
    // The next squares are firstly added in the new column to the farthest right going down to bottom-right
    const col = k - 1;
    for (let r = 0; r < k && idx < N; r++) {
      grid[r][col] = ordered[idx++];
    }

    // Then we add squares for the new row bottom-right to bottom-left
    const bottomRow = k - 1;
    for (let c = col - 1; c >= 0 && idx < N; c--) {
      if (grid[bottomRow][c] == null) {
        grid[bottomRow][c] = ordered[idx++];
      }
    }
  }

  const size = 40;
  const gap = 4;

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px", // space between button and grid
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${dim}, ${size}px)`,
    gridAutoRows: `${size}px`,
    gap: `${gap}px`,
  };

  return (
    <div style={wrapperStyle}>
      <div style={gridStyle}>
        {grid.map((rowArr, r) =>
          rowArr.map((cell, c) => {
            if (!cell) {
              return (
                <div
                  key={`empty-${r}-${c}`}
                  style={{ width: size, height: size, background: "transparent" }}
                />
              );
            }
            return (
              <div
                key={`sq-${cell.id ?? cell.index}-${cell.index}`}
                title={`#${cell.index} ${cell.color}`}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: cell.color || "#cccccc",
                  borderRadius: 6,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
