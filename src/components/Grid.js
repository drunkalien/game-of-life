import { useState, useEffect } from "react";

import createGrid from "../utils/createGrid";
import getNbs from "../utils/getNbs";
import { useInterval } from "../hooks/useInterval";

import classes from "./grid.module.css";

const Grid = () => {
  const SIZE = 30;
  const [SPEED, setSpeed] = useState(300);
  const [grid, setGrid] = useState([]);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    setGrid(createGrid(SIZE));
  }, []);

  useInterval(() => {
    if (isGameRunning) animate();
  }, SPEED);

  function animate() {
    const newGrid = grid.map((row, rowIdx) =>
      row.map((col, colIdx) => {
        const nbs = getNbs(grid, rowIdx, colIdx);
        if (nbs < 2 && col.isAlive === true) {
          return { ...col, isAlive: false };
        } else if (nbs === 2 && col.isAlive === true) {
          return col;
        } else if (nbs === 3 && col.isAlive === false) {
          return { ...col, isAlive: true };
        } else if (nbs > 3 && col.isAlive === true) {
          return { ...col, isAlive: false };
        } else {
          return col;
        }
      })
    );
    setGrid(newGrid);
  }

  return (
    <div className={classes.container}>
      <div className={classes["animation-control"]}>
        <span className={classes["speed-label"]}>Speed (ms)</span>
        <input
          type="range"
          min="0"
          max="1000"
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
        <span>{SPEED}</span>
      </div>
      <div className={classes.grid}>
        {grid.map((row, idx) => (
          <div key={idx} className={classes.row}>
            {row.map((cell, idx) => (
              <div
                onClick={(e) => {
                  cell.isAlive = !cell.isAlive;
                  if (cell.isAlive) {
                    e.target.style.backgroundColor = "black";
                  } else {
                    e.target.style.backgroundColor = "white";
                  }
                }}
                key={idx}
                className={classes.cell}
                style={{ backgroundColor: cell.isAlive ? "black" : "white" }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button
        className={`${classes.btn} ${isGameRunning ? classes.danger : ""}`}
        onClick={() => setIsGameRunning(!isGameRunning)}
      >
        {isGameRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Grid;
