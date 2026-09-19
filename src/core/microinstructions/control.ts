import type { SimulatorState, Instruction} from '../types';

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
