import { useState, useEffect } from "react";

import createGrid from "../utils/createGrid";
import getNbs from "../utils/getNbs";
import { useInterval } from "../hooks/useInterval";

import classes from "./grid.module.css";

const Grid = () => {
  const [SPEED, setSpeed] = useState(300);
  const [SIZE, setSize] = useState(30);
  const [grid, setGrid] = useState([]);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    setGrid(createGrid(SIZE));
  }, [SIZE]);

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
    <>
      <div className={classes["animation-control"]}>
        <div className={classes.control}>
          <span className={classes["control-label"]}>Speed (ms)</span>
          <input
            type="range"
            min="50"
            max="1000"
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
          <span>{SPEED}</span>
        </div>
        <div className={classes.control}>
          <span className={classes["control-label"]}>Grid Size</span>
          <input
            type="range"
            min="10"
            max="80"
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
          <span>{SIZE}</span>
          <button
            className={`${classes.btn} ${isGameRunning ? classes.danger : ""}`}
            onClick={() => setIsGameRunning(!isGameRunning)}
          >
            {isGameRunning ? "Stop" : "Start"}
          </button>
        </div>
      </div>
      <div className={classes.container}>
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
                  onMouseOver={(e) => {
                    if (mouseDown) {
                      cell.isAlive = !cell.isAlive;
                      if (cell.isAlive) {
                        e.target.style.backgroundColor = "black";
                      } else {
                        e.target.style.backgroundColor = "white";
                      }
                    }
                  }}
                  onMouseDown={() => setMouseDown(true)}
                  onMouseUp={() => setMouseDown(false)}
                  key={idx}
                  className={classes.cell}
                  style={{ backgroundColor: cell.isAlive ? "black" : "white" }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grid;
