import type { SimulatorState } from "../types";

export function mAdd(state: SimulatorState): SimulatorState {
  return { ...state, acc: state.acc + state.mbr };
}