<template>
  <nav>
    <ul class="list horizontal">
      <li class="list-item">
        <button class="btn" @click.prevent="setCurrentView('gameDeck')" @keyup.enter="setCurrentView('gameDeck')">Home</button>
      </li>
      <li class="list-item">
        <button class="btn" @click.prevent="setCurrentView('gameJoin')" @keyup.enter="setCurrentView('gameJoin')">Join game</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { useRootStore } from "@/stores/root";

export default defineComponent({
  setup() {
    const rootStore = useRootStore();

    const setCurrentView = (view: string) => {
      rootStore.setCurrentView(view);
    };

    return {
      setCurrentView,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";
</style>
