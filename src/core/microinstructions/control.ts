import type { SimulatorState, Instruction} from '../types';

export function incrementPc(state: SimulatorState) : SimulatorState {
  return {
    ...state, 
    pc: state.pc + 1,
  }
}
