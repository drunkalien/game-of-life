const createGrid = (size) => {
  const grid = [];
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      const cell = {
        x: r,
        y: c,
        isAlive: false,
      };
      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
};

export default createGrid;
