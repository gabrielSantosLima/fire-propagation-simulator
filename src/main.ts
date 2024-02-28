import { Fire } from './fire';

const app = document.querySelector<HTMLDivElement>('#app');

const GRID_SIZE = [50, 50];
const FPS = 15;
const fire = new Fire({
    size: GRID_SIZE[0],
    propagation: 10,
});

function main() {
    createStructure();
    setInterval(loop, 1000 / FPS);
}

function createStructure() {
    const [width, height] = GRID_SIZE;
    for (let row = 0; row < height; row++) {
        const inlineDiv = document.createElement('div');
        inlineDiv.className = 'inline';
        for (let column = 0; column < width; column++) {
            const newDiv = document.createElement('div');
            newDiv.className = `fire`;
            newDiv.id = `r${row}c${column}`;
            newDiv.addEventListener('click', () => {
                fire.propagate(column, row);
            });
            inlineDiv.appendChild(newDiv);
        }
        app?.appendChild(inlineDiv);
    }
}

function loop() {
    const [width, height] = GRID_SIZE;
    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            const currentLevel = fire.data[row][column];
            const element = document.querySelector(`.fire#r${row}c${column}`);
            if (element) element.classList.value = `fire l${currentLevel}`;
        }
    }
    fire.putOut();
}

main();
