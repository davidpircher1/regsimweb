import type { SimulatorState } from "./types";

export function createTestState() : SimulatorState{
    return {
        pc: 0,
        mar: 0,
        mbr: 0,
        ir: 0,
        acc: 0,
        sr: {c: false, v: false, n: false, z: false}, // flags
        instructionMemory: Array.from({ length: 16 }, () => ({ value: 0, breakpoint: false })),
        dataMemory: Array.from({ length: 16 }, () => ({ value: 0, breakpoint: false })),
        currentStepIndex: 0,    
    }
}