<template>
  <p>gameDeck</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRootStore } from "@/stores/root";

export default defineComponent({
  inheritAttrs: false,
  props: {},
  setup(props) {
    const rootStore = useRootStore();

    return {};
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";

</style>
