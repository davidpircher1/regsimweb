import type { SimulatorState } from "../types"

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

export function compare(state: SimulatorState): SimulatorState {
    return { ...state, sr:{...state.sr, c: state.acc === state.mbr} }
}

export function testCF(state: SimulatorState) : SimulatorState {
    return {...state, sr: {...state.sr, z: state.sr["c"] === false} }
}

export function testnCF(state: SimulatorState) : SimulatorState {
    return {...state, sr: {...state.sr, z: state.sr["c"] === true} }
}