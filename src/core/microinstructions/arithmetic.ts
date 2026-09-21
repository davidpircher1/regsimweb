import type { SimulatorState } from "../types";

export function mAdd(state: SimulatorState): SimulatorState {
  return { ...state, acc: state.acc + state.mbr };
}

export function mSub(state: SimulatorState): SimulatorState {
  return { ...state, acc: state.acc - state.mbr };
}

export function mMul(state: SimulatorState): SimulatorState {
  return { ...state, acc: state.acc * state.mbr };
}

export function mDiv(state: SimulatorState): SimulatorState {
  return { ...state, acc: state.acc / state.mbr };
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

export function incrementAcc(state: SimulatorState) : SimulatorState {
  return { ...state, acc: state.acc + 1 };
}

export function decrementAcc(state: SimulatorState) : SimulatorState {
  return {...state, acc: state.acc - 1 };
}