var Panel = /** @class */ (function () {
    function Panel(rows, columns, mineNumbers) {
        this.rows = rows;
        this.columns = columns;
        this.mineNumbers = mineNumbers;
    }
    Panel.prototype.init = function () {
        var _this = this;
        this.panel = new Array(this.rows).fill(0).map(function () {
            return new Array(_this.columns).fill(0).map(function () { return new Mine(0); });
        });
        // 根据行和列，生成mineNumbers个不重复的随机数
        this.minesPosition = new Set();
        this.getRandom();
    };
    Panel.prototype.getRandom = function () {
        if (this.minesPosition.size >= this.mineNumbers) {
            return;
        }
        var row = Math.floor(Math.random() * this.rows);
        var col = Math.floor(Math.random() * this.columns);
        var position = row + '-' + col;
        if (this.minesPosition.has(position)) {
            this.getRandom();
        }
        else {
            this.minesPosition.add(position);
            this.panel[row][col].value = 1;
            this.getRandom();
        }
    };
    Panel.prototype.getMineValue = function (rowIndex, colIndex) {
        var _this = this;
        var getValue = function (rowIndex, colIndex) {
            if (rowIndex >= 0 && colIndex >= 0 && rowIndex < _this.rows && colIndex < _this.columns) {
                return _this.panel[rowIndex][colIndex].value;
            }
            else {
                return 0;
            }
        };
        var num = (getValue(rowIndex - 1, colIndex - 1) + getValue(rowIndex - 1, colIndex) + getValue(rowIndex - 1, colIndex + 1) +
            getValue(rowIndex, colIndex - 1) + getValue(rowIndex, colIndex + 1) +
            getValue(rowIndex + 1, colIndex - 1) + getValue(rowIndex + 1, colIndex) + getValue(rowIndex + 1, colIndex + 1));
        return num;
    };
    return Panel;
}());
var Mine = /** @class */ (function () {
    function Mine(value) {
        this.value = value;
        this.show = false;
        this.near = this.value;
    }
    Object.defineProperty(Mine.prototype, "isMine", {
        get: function () {
            return this.value === 1;
        },
        enumerable: false,
        configurable: true
    });
    Mine.prototype.click = function () {
        this.show = true;
    };
    return Mine;
}());
