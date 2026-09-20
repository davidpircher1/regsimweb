import {pcToMar, mbrToIr} from './microinstructions/dataMovement';
import type { SimulatorState, Instruction } from './types';
import { incrementPc } from './microinstructions/control';
import { readInstructionMem } from './microinstructions/memory';


export function decode(instruction: number) : Instruction {
    const opcode     = instruction & 0b111111;      // lower 6 bits 
    const addressing = (instruction >> 6) & 0b11;   // move opCode with shift, use only 2 bits
    const operand    = instruction >>> 8;           // shift 8 bits, get only operand 

    return { opcode, addressing, operand };
}

export function fetchCycle(state: SimulatorState) : {state: SimulatorState, instruction: Instruction} {
    let currentState = state;

    // Load Program counter to memory address reg.
    currentState = pcToMar(currentState);

    // Read memory value from Mar and load it in to memory bus reg.
    currentState = readInstructionMem(currentState);

    // Load Mem. bus. reg. into Instruction reg.
    currentState = mbrToIr(currentState);

    // Increment Program counter for next run
    currentState = incrementPc(currentState)

    // Decode instruction - return opcode, address mode, operand
    let decodedInstruction = decode(currentState.ir)

    // Return state and instruction 
    return { 
        state: currentState,
        instruction: decodedInstruction
    }
        
}