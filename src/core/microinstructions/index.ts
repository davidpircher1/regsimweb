import type { SimulatorState } from "../types";

import { accToMbr, mbrToAcc, pcToMar, mbrToIr, irAddToMbr, mbrAddToMar} from './dataMovement';
import { readInstructionMem, readDataMem, writeDataMem } from './memory';
import { incrementPc, halt} from './control';
import { decrementAcc, incrementAcc, mAdd, mDiv, mMul, mSub } from "./arithmetic";
import { compare, testAcc, testCF, testnAcc, testnCF } from "./flags";
import { leftShiftAcc, mAnd, mOr, mXor, notAcc, rightShiftAcc } from "./logic";

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
    'WRITE MEM': writeDataMem,
    // controls
    'INCREMENT PC': incrementPc,
    'HALT': halt,
    // arithmetic
    'mADD': mAdd,
    'mSUB': mSub,
    'mDIV': mDiv,
    'mMUL': mMul,
    'incrementACC': incrementAcc,
    'decrementACC': decrementAcc,
    // flags 
    'testACC': testAcc,
    'testnACC': testnAcc,
    'compare': compare,
    'testCF': testCF,
    'testnCF': testnCF,
    // logic 
    'notACC': notAcc,
    'leftShiftACC': leftShiftAcc,
    'rightShiftACC': rightShiftAcc,
    'mAnd': mAnd,
    'mOr': mOr,
    'mXor': mXor,
};