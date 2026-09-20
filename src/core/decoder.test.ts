// core/decoder.test.ts
import { describe, it, expect } from 'vitest';
import { fetchCycle } from './decoder';
import { createTestState } from './testHelpers';
import { runInstructions, encode } from './decoder';

describe('fetchCycle', () => {
    it('load instruction and increment pc by 1', () => {
        const state = createTestState();
        state.pc = 2;
        state.instructionMemory[2] = { value: 67, breakpoint: false };

        const { state: newState, instruction } = fetchCycle(state);

        expect(newState.mar).toBe(2);
        expect(newState.mbr).toBe(67);
        expect(newState.ir).toBe(67);
        expect(newState.pc).toBe(3);

        expect(instruction.opcode).toBe(3);
        expect(instruction.addressing).toBe(1);
        expect(instruction.operand).toBe(0);
    });
});


describe('runInstructions', () => {
    it('ADD with address mode 0', () => {
        const state = createTestState();
        state.pc = 2;
        state.acc = 5;
        // opcode=1, addressing=0, operand=10
        state.instructionMemory[2] = { value: encode({ opcode: 1, addressing: 0, operand: 10 }), breakpoint: false };

        const result = runInstructions(state);

        expect(result.acc).toBe(15);  // it should add value from operand
        expect(result.pc).toBe(3);
    });

    it('ADD with address mode 1', () => {
        const state = createTestState();
        state.pc = 2;
        state.acc = 5;
        state.instructionMemory[2] = { value: encode({ opcode: 1, addressing: 1, operand: 7 }), breakpoint: false };
        state.dataMemory[7] = { value: 100, breakpoint: false };   // it should add this value from address 7

        const result = runInstructions(state);

        expect(result.acc).toBe(105);
    });

    it('not allowed address mode', () => {
        const state = createTestState();
        state.pc = 2;
        state.instructionMemory[2] = { value: encode({ opcode: 10, addressing: 2, operand: 0 }), breakpoint: false };

        expect(() => runInstructions(state)).toThrow();
    });
});
