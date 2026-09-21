import type { SimulatorState } from "../types"

export function notAcc(state: SimulatorState) : SimulatorState {
  return {
    ...state,
    acc: ~state.acc,
  }
}

export function leftShiftAcc(state: SimulatorState) : SimulatorState {
    return {
        ...state,
        acc: state.acc << 1,
    }
}

export function rightShiftAcc(state: SimulatorState) : SimulatorState {
    return {
        ...state,
        acc: state.acc >> 1,
    }
}

export function mAnd(state: SimulatorState): SimulatorState {
  return { ...state, acc: state.acc & state.mbr };
}

export function mOr(state: SimulatorState): SimulatorState {
  return { ...state, acc: state.acc | state.mbr };
}

export function mXor(state: SimulatorState): SimulatorState {
  return { ...state, acc: state.acc ^ state.mbr };
}

export function compare(state: SimulatorState): SimulatorState {
    return { ...state, sr:{...state.sr, c: state.acc === state.mbr} }
}