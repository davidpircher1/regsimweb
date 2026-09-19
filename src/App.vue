<template>
    <div>
        <Register v-for="name in registers" :key="name" :name="name"/>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import Register from './components/Register.vue';

    const registers = ref(['PC', 'MAR', 'IR', 'MBR', 'ACC'])
</script>

<style lang="scss" scoped>
</style>