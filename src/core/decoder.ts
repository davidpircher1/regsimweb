import {pcToMar, mbrToIr} from './microinstructions/dataMovement';
import type { SimulatorState, Instruction, InstructionStep, InstructionDefinition } from './types';
import { incrementPc } from './microinstructions/control';
import { readInstructionMem } from './microinstructions/memory';
import { microOps } from './microinstructions';
import { instructionLibrary } from './instructionLibrary';
import { addressingModeLibrary } from './addressingLibrary';

const operandBits = 24;
const addressingBits = 2;
const opcodeBits = 6;

export function decode(instruction: number): Instruction {
    const opcode = instruction & ((1 << opcodeBits) - 1); // get number through mask
    const addressing = (instruction >> opcodeBits) & ((1 << addressingBits) - 1); // same thing here, but we need shift opcode bits away

    let operand = instruction >>> (opcodeBits + addressingBits); // logic shift to prevent copying highest bit by neg. number, interprets wrong neg. numbers with >>

    const signBit = 1 << (operandBits - 1);   // comparison of highest bit, if the number is positive or negative

    if (operand & signBit) {
        // if it is true - the number is negative 
        operand = operand - (1 << operandBits); // we sub 1 left-bit bigger number and our result will be negative (0 bits) 
    }

    return { opcode, addressing, operand };
}

export function encode(instruction: Instruction): number {
    const maskedOperand = instruction.operand & ((1 << operandBits) - 1); // mask is 1 moved to end, it gives us 1 000, then minus 1 => 0 111 

    // glute everything together
    return (maskedOperand << (opcodeBits + addressingBits))
         | (instruction.addressing << opcodeBits)
         | instruction.opcode;
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

// run 1 microinstruction
export function runStep(step: InstructionStep, state: SimulatorState) : SimulatorState {
    if(step.type === "micro") {
        // microinstruction
        return microOps[step.op](state); // call function from microOps table with 1 argument (state)
    } else {
        // own instruction - recursive run 
        return executeInstruction(step.instructionId, state); // recursive run for microinstructions of our self-created instrunction
    }
}

// helping function to run through micro instructions
function runSteps(steps: InstructionStep[], state: SimulatorState) : SimulatorState {
    let current = state;

    for(let step of steps) {
        current = runStep(step, current);
    }

    return current; // return state 
}

// run instruction 
export function executeInstruction(opcode: number, state: SimulatorState) : SimulatorState {
    let instruction = instructionLibrary[opcode]; // selecting instruction from lib
    let newState = state;

    // executing micro instructions 
    newState = runSteps(instruction.steps, newState);

    return newState;
}


export function runInstructions(state: SimulatorState) : SimulatorState {
    const { state: afterFetch, instruction } = fetchCycle(state); // Fetch

    const instructionFull = instructionLibrary[instruction.opcode]; // Get instruction from library

    let current = afterFetch; 

    // check if there is addressing mode for instruction
    if (instructionFull.allowedAddressingMode.length > 0) {
        if (!instructionFull.allowedAddressingMode.includes(instruction.addressing)) {
            // if it is wrong number throw an error
            throw new Error("This instruction does not allow this addressing mode!");
        }

        // if everything correct, run microinstructions from addressing modes
        current = runSteps(addressingModeLibrary[instruction.addressing], current)
    }

    // execute instruction and return state :)
    return executeInstruction(instruction.opcode, current);
}