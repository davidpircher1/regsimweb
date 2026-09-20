import type { InstructionDefinition } from "./types";

export const instructionLibrary: Record<number, InstructionDefinition> = {
    // ADD instruction
    1: {id: 1, name: 'ADD', steps: [
        {type: 'micro', op: 'IRadd.=>MBR'},
        {type: 'micro', op: 'mADD'},
    ],},
};

