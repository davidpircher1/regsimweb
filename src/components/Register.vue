<template>
    <div class="box">
        <p>{{ name }}</p>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        name: String
    })

</script>

<style lang="scss" scoped>
    .box {
        padding: 20px;
        background: #bada55;
        color: black;
        font-size: 18px;
        font-weight: bold;
        margin: 20px;
        width: 30%;
    }
</style>