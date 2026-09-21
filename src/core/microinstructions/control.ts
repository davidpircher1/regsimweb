import type { SimulatorState} from '../types';

export function incrementPc(state: SimulatorState) : SimulatorState {
  return {
    ...state, 
    pc: state.pc + 1,
  }
}

export function halt(state: SimulatorState) : SimulatorState {
  return {
    ...state,
    halted: true,
  }
}

export function testAcc(state: SimulatorState) : SimulatorState {
  return {
    ...state,
    sr: {...state.sr, z: state.acc === 0}
  }
}

export function testnAcc(state: SimulatorState) : SimulatorState {
  return {
    ...state, 
    sr: {...state.sr, z: state.acc !== 0}
  }
}

export function notAcc(state: SimulatorState) : SimulatorState {
  return {
    ...state,
    acc: ~state.acc,
  }
}

