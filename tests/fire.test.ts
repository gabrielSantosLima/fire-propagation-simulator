import { describe, expect, it } from 'vitest';
import { Fire } from '../src/fire';

describe('fire', () => {
    it('should be initialized with zero', () => {
        const fire = new Fire({
            size: 10,
            propagation: 0,
        });
        const result = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        expect(JSON.stringify(fire.data)).toBe(JSON.stringify(result));
    });

    it('the fire should be propagated', () => {
        const fire = new Fire({
            size: 10,
            propagation: 4,
        });
        fire.propagate(0, 0);
        const result = [
            [4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
            [3, 3, 2, 1, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        expect(JSON.stringify(fire.data)).toBe(JSON.stringify(result));
    });

    it('the fire should be put out', () => {
        const fire = new Fire({
            size: 10,
            propagation: 4,
        });
        fire.propagate(0, 0);
        fire.putOut();
        const result = [
            [3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        expect(JSON.stringify(fire.data)).toBe(JSON.stringify(result));
    });

    it('the fire should be totally put out', () => {
        const fire = new Fire({
            size: 10,
            propagation: 4,
        });
        fire.propagate(0, 0);
        fire.reset();
        const result = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        expect(JSON.stringify(fire.data)).toBe(JSON.stringify(result));
    });

    it('the callback should called on propagate', () => {
        const fire = new Fire({
            size: 10,
            propagation: 4,
        });
        let weight = 0;

        function sumPropagation(x: number, y: number, propagation: number) {
            weight += propagation;
        }

        fire.propagate(0, 0, sumPropagation);
        expect(weight).toBe(30);
    });
});
