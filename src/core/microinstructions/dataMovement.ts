import type { SimulatorState, Instruction } from '../types';


//========MICROINSTRUCTION FETCHING CYCLE=================
export function readInstructionMem(state: SimulatorState) : SimulatorState {
    return {
        ...state, 
        mbr: state.instructionMemory[state.mar].value,
    }
}

export function readDataMem(state: SimulatorState) : SimulatorState {
    return{
        ...state, 
        mbr: state.dataMemory[state.mar].value,
    }
}

export function accToMbr(state: SimulatorState) : SimulatorState {
    return {
    ...state,
    mbr: state.acc,   // ACC register value moved to MBR
  };
}

export function mbrToAcc(state: SimulatorState) : SimulatorState {
    return {
    ...state,
    acc: state.mbr,
  };
}

export function pcToMar(state: SimulatorState) : SimulatorState {
    return {
    ...state,
    mar: state.pc,
  };
}

export function mbrToIr(state: SimulatorState) : SimulatorState {
    return {
    ...state,
    ir: state.mbr,
  };
}

export function incrementPc(state: SimulatorState) : SimulatorState {
  return {
    ...state, 
    pc: state.pc + 1,
  }
}

export function decode(instruction: number) : Instruction {
    const opcode     = instruction & 0b111111;      // lower 6 bits 
    const addressing = (instruction >> 6) & 0b11;   // move opCode with shift, use only 2 bits
    const operand    = instruction >>> 8;           // shift 8 bits, get only operand 

    return { opcode, addressing, operand };
}

