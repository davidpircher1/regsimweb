import type { SimulatorState, Instruction } from '../types';
import { decode } from '../decoder'


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

// ir address decode and save operand to mbr 
export function irAddToMbr(state: SimulatorState) : SimulatorState {
  return {
    ...state,
    mbr: decode(state.ir).operand
  }
}