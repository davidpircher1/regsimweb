<template>
    <div class="box">
        <p>{{ name }}</p>
        <p>Opcode: {{ result.opcode }}</p>
        <p>Režim: {{ result.addressing }}</p>
        <p>Operand: {{ result.operand }}</p>
    </div>
</template>

<script setup lang="ts">
    import { decode, selectInstruction } from '@/core/decode'

    defineProps({
        name: String
    })

    const result = decode(0b00000000_00000000_00000011_00_000001)
    selectInstruction(result.opcode)

</script>

<style lang="scss" scoped>
    .box {
        padding: 20px;
        background: #bada55;
        color: black;
        font-size: 18px;
        font-weight: bold;
        margin: 20px;
    }
</style>