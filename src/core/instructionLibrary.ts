import type { InstructionDefinition } from "./types";

export const instructionLibrary: Record<number, InstructionDefinition> = {
    // ADD instruction
    1: {id: 1, name: 'ADD', steps: [
        {type: 'micro', op: 'mADD'},
    ], allowedAddressingMode: [0,1,2]},
};

