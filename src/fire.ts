interface Config {
    size: number;
    propagation: number;
}

type CallbackPropagation = (x: number, y: number, propagation: number) => void;

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

    private addPropagation(
        row: number,
        column: number,
        propagation: number,
        onPropagate?: CallbackPropagation
    ) {
        const { size } = this.config;
        if (column >= 0 && column < size && row >= 0 && row < size) {
            this.data[row][column] +=
                this.data[row][column] + propagation >= 0 ? propagation : 0;
            onPropagate?.(column, row, propagation);
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
        const { size } = this.config;
        for (let row = 0; row < size; row++)
            for (let column = 0; column < size; column++)
                this.addPropagation(row, column, -1);
    }

    reset() {
        this.data = [];
        this.initData();
    }

    propagate(x: number, y: number, onPropagate?: CallbackPropagation) {
        const { propagation, size } = this.config;
        let currentPropagation = propagation;

        if (x < 0 || x >= size || y < 0 || y >= size || this.isEmpty()) return;
        while (currentPropagation > 0) {
            const level = propagation - currentPropagation;

            for (let column = x - level; column <= x + level; column++) {
                let row = y - level;
                this.addPropagation(
                    row,
                    column,
                    currentPropagation,
                    onPropagate
                );

                if (level !== 0) {
                    row = y + level;
                    this.addPropagation(
                        row,
                        column,
                        currentPropagation,
                        onPropagate
                    );
                }
            }
            for (let row = y - level + 1; row < y + level; row++) {
                let column = x - level;
                this.addPropagation(
                    row,
                    column,
                    currentPropagation,
                    onPropagate
                );
                if (level !== 0) {
                    column = x + level;
                    this.addPropagation(
                        row,
                        column,
                        currentPropagation,
                        onPropagate
                    );
                }
            }
            currentPropagation--;
        }
    }
}

export { Fire };
