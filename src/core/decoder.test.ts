// core/decoder.test.ts
import { describe, it, expect } from 'vitest';
import { fetchCycle } from './decoder';
import { createTestState } from './testHelpers';
import { runInstructions, encode, decode } from './decoder';
import { writeDataMem } from './microinstructions/memory';

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

    it('writeMem test', () => {
        const state = createTestState();
        state.mar = 5;
        state.mbr = 42;
        state.dataMemory[5] = { value: 0, breakpoint: false };   

        const result = writeDataMem(state);

        expect(result.dataMemory[5].value).toBe(42);
        expect(result.dataMemory[4]).toEqual(state.dataMemory[4]);   // other memory cells unchanged
    });

    it('encode/decode round-trip pre záporné operandy pri rôznych addressing módoch', () => {
    for (const addressing of [0, 1, 2]) {
        for (const operand of [-8, -3, -100, 0, 7, 100]) {
            const raw = encode({ opcode: 1, addressing, operand });
            const result = decode(raw);
            expect(result.operand).toBe(operand);
            expect(result.addressing).toBe(addressing);
            expect(result.opcode).toBe(1);
        }
    }
    });
});
