import type { SimulatorState } from "../types";

import { accToMbr, mbrToAcc, pcToMar, mbrToIr } from './dataMovement';
import { readInstructionMem, readDataMem } from './memory';
import { incrementPc } from './control';

export const microOps: Record<string, (state: SimulatorState) => SimulatorState> = {
    // data movement
    'PC=>MAR': pcToMar,
    'ACC=>MBR': accToMbr,
    'MBR=>ACC': mbrToAcc,
    'MBR=>IR': mbrToIr,
    // memory 
    'READ MEM': readInstructionMem,
    'READ DATA': readDataMem,
    // controls
    'INCREMENT PC': incrementPc,
};