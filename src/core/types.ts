// memorycell interface 
interface MemoryCell {
    value: number,
    breakpoint: boolean
}

// instruction 
export interface Instruction {
    operand: number, 
    addressing: number,
    opcode: number
}

// simulator state
export interface SimulatorState {
    pc: number,
    mar: number,
    mbr: number,
    ir: number,
    acc: number,
    sr: {c: boolean, v: boolean, n: boolean, z: boolean} // flags
    instructionMemory: MemoryCell[], // instructions will be here
    dataMemory: MemoryCell[], // data will be here
    halted: boolean
}

// micro instruction
interface MicroInstruction {
  type: 'micro',
  op: string // micro instruction has no code, only own name
}

// reference for custom instruction
interface RefStep {
  type: 'ref',
  instructionId: number // not using name, because it has own OP CODE
}

export type InstructionStep = MicroInstruction | RefStep; // choosing right type for instruction

// custom instruction 
export interface InstructionDefinition {
    id: number, // opcode of new instruction
    name: string,
    steps: InstructionStep[], // array of custom instruction, it can be microinstruction mixed with custom
    allowedAddressingMode: number[]
}