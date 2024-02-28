interface Config {
    size: number;
    propagation: number;
}

class Fire {
    public data: number[][];
    private config: Config;

    constructor(config: Config) {
        this.config = config;
        this.data = [];
        this.initData();
    }

    private isEmpty() {
        return this.data.length === 0;
    }

    private addPropagation(row: number, column: number, propagation: number) {
        const { size, propagation: maxPropagation } = this.config;
        if (column >= 0 && column < size && row >= 0 && row < size) {
            const newLevel = this.data[row][column] + propagation;
            this.data[row][column] =
                newLevel >= 0
                    ? newLevel <= maxPropagation
                        ? newLevel
                        : maxPropagation
                    : 0;
        }
    }

    private initData() {
        const size = this.config.size;
        for (let row = 0; row < size; row++) {
            this.data.push([]);
            for (let column = 0; column < size; column++)
                this.data[row].push(0);
        }
    }

    putOut() {
        const chance = 0.2;
        const { size } = this.config;
        for (let row = 0; row < size; row++)
            for (let column = 0; column < size; column++) {
                const chanceOfPutOut = Math.random();
                if (chanceOfPutOut < chance)
                    this.addPropagation(row, column, -1);
            }
    }

    reset() {
        this.data = [];
        this.initData();
    }

    propagate(x: number, y: number) {
        const { propagation, size } = this.config;
        let currentPropagation = propagation;

        if (x < 0 || x >= size || y < 0 || y >= size || this.isEmpty()) return;
        while (currentPropagation > 0) {
            const level = propagation - currentPropagation;

            for (let column = x - level; column <= x + level; column++) {
                let row = y - level;
                this.addPropagation(row, column, currentPropagation);

                if (level !== 0) {
                    row = y + level;
                    this.addPropagation(row, column, currentPropagation);
                }
            }
            for (let row = y - level + 1; row < y + level; row++) {
                let column = x - level;
                this.addPropagation(row, column, currentPropagation);
                if (level !== 0) {
                    column = x + level;
                    this.addPropagation(row, column, currentPropagation);
                }
            }
            currentPropagation--;
        }
    }
}

export { Fire };
