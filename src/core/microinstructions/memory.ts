import type { SimulatorState} from '../types';


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