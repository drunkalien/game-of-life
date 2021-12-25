const getNbs = (grid, row, cell) => {
  let aliveNbs = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue;
      if (
        grid[row + i] &&
        grid[row + i][cell + j] &&
        grid[row + i][cell + j].isAlive
      ) {
        aliveNbs++;
      }
    }
  }

  return aliveNbs;
};

export default getNbs;
