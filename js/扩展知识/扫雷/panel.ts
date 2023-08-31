
class Panel {
  public panel;
  public minesPosition: Set<string>;
  constructor(public rows: number, public columns: number, public mineNumbers: number) {}
  init() {
    this.panel = new Array(this.rows).fill(0).map(() => {
      return new Array(this.columns).fill(0).map(() => new Mine(0))
    })
    // 根据行和列，生成mineNumbers个不重复的随机数
    this.minesPosition = new Set();
    this.getRandom();
  }
  getRandom() {
    if (this.minesPosition.size >= this.mineNumbers) {
      return
    }
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.columns);
    let position = row + '-' + col;
    if (this.minesPosition.has(position)) {
      this.getRandom();
    } else {
      this.minesPosition.add(position);
      this.panel[row][col].value = 1;
      this.getRandom();
    }
  }
  getMineValue(rowIndex: number, colIndex: number): number {
    const getValue = (rowIndex: number, colIndex: number) => {
      if (rowIndex >= 0 && colIndex >= 0 && rowIndex < this.rows && colIndex < this.columns) {
        return this.panel[rowIndex][colIndex].value;
      } else {
        return 0;
      }
    }
    let num = (
      getValue(rowIndex - 1, colIndex - 1) + getValue(rowIndex - 1, colIndex) + getValue(rowIndex - 1, colIndex + 1) +
      getValue(rowIndex, colIndex - 1) + getValue(rowIndex, colIndex + 1) + 
      getValue(rowIndex + 1, colIndex - 1) + getValue(rowIndex + 1, colIndex) + getValue(rowIndex + 1, colIndex + 1)
    );
    
    return num;
  }
}

class Mine {
  public show: boolean = false;
  public near: number;
  constructor(public value: number) {
    this.near = this.value;
  }
  get isMine() {
    return this.value === 1;
  }
  click() {
    this.show = true;
  }
}