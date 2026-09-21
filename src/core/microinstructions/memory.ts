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


export function writeDataMem(state: SimulatorState) : SimulatorState {
    const newDataMemory = state.dataMemory;

    newDataMemory[state.mar] = {value: state.mbr, breakpoint: false};

    return {
        ...state, 
        dataMemory: newDataMemory, // we cannot asign only the one array field, we must use the whole array, because of keys
    }
}