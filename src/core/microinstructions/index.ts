import type { SimulatorState } from "../types";

import { accToMbr, mbrToAcc, pcToMar, mbrToIr, irAddToMbr, mbrAddToMar} from './dataMovement';
import { readInstructionMem, readDataMem } from './memory';
import { incrementPc } from './control';
import { mAdd } from "./arithmetic";

export const microOps: Record<string, (state: SimulatorState) => SimulatorState> = {
    // data movement
    'PC=>MAR': pcToMar,
    'ACC=>MBR': accToMbr,
    'MBR=>ACC': mbrToAcc,
    'MBR=>IR': mbrToIr,
    'IRadd.=>MBR': irAddToMbr,
    'MBRadd.=>MAR': mbrAddToMar,
    // memory 
    'READ MEM': readInstructionMem,
    'READ DATA': readDataMem,
    // controls
    'INCREMENT PC': incrementPc,
    // arithmetic
    'mADD': mAdd,
};