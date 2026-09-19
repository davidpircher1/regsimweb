import type { SimulatorState } from './types';


//========MICROINSTRUCTION FETCHING CYCLE=================
function readInstructionMem(state: SimulatorState) : SimulatorState {
    return {
        ...state, 
        mbr: state.instructionMemory[state.mar].value,
    }
}

function readDataMem(state: SimulatorState) : SimulatorState {
    return{
        ...state, 
        mbr: state.dataMemory[state.mar].value,
    }
}

function accToMbr(state: SimulatorState) : SimulatorState {
    return {
    ...state,
    mbr: state.acc,   // ACC register value moved to MBR
  };
}

function mbrToAcc(state: SimulatorState) : SimulatorState {
    return {
    ...state,
    acc: state.mbr,
  };
}

function pcToMar(state: SimulatorState) : SimulatorState {
    return {
    ...state,
    mar: state.pc,
  };
}

function mbrToIr(state: SimulatorState) : SimulatorState {
    return {
    ...state,
    ir: state.mbr,
  };
}

