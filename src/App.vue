<template>
  <gameNavigation></gameNavigation>
  <suspense>
    <template #default>
      <GameDeck :component-data="componentData"></GameDeck>
    </template>
    <template #fallback>
      <Loading :no-opacity="true"></Loading>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import GameDeck from "@/views/gameDeck.vue";
import gameNavigation from "@/components/base/navigation/gameNavigation.vue";
import { useRootStore } from "@/stores/root";
import Loading from "@/components/base/loading/Loading.vue";
const rootStore = useRootStore();
const locale = rootStore.locale;
const componentData: string = "This is a sample prop";

document.querySelector("html")!.setAttribute("lang", locale);
</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";

html * {
  font-family: "Montserrat-Light", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
