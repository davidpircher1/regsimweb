import type { InstructionStep } from "./types";

export const addressingModeLibrary: Record<number, InstructionStep[]> = {
    0: [
        {type: 'micro', op: 'IRadd.=>MBR'} // loading value from operand
    ],
    1: [
        {type: 'micro', op: 'IRadd.=>MBR'}, // operand stands for data memory address 
        {type: 'micro', op: 'MBRadd.=>MAR'},
        {type: 'micro', op: 'READ DATA'},
    ],
    2: [
        {type: 'micro', op: 'IRadd.=>MBR'}, // operand stands for data mem. address, which holds another data mem. address  
        {type: 'micro', op: 'MBRadd.=>MAR'},
        {type: 'micro', op: 'READ DATA'},
        {type: 'micro', op: 'MBRadd.=>MAR'},
        {type: 'micro', op: 'READ DATA'},
    ]
}