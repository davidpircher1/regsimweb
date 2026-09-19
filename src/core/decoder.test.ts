// core/decoder.test.ts
import { describe, it, expect } from 'vitest';
import { fetchCycle } from './decoder';
import { createTestState } from './testhelpers';

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