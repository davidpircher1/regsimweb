import type { Instruction } from './types';


export function decode(instruction: number) : Instruction {
    const opcode     = instruction & 0b111111;      // lower 6 bits 
    const addressing = (instruction >> 6) & 0b11;   // move opCode with shift, use only 2 bits
    const operand    = instruction >>> 8;           // shift 8 bits, get only operand 

    return { opcode, addressing, operand };
}

export function selectInstruction(opCode: number) {
    switch(opCode) {
        case 0: 
            console.log("Halt")
            break;
        case 1: 
            console.log("ADD")
            break;
        default:
            console.log("Zly opcode")
    }
}
