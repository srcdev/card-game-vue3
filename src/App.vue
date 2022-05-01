<template>
  <gameNavigation></gameNavigation>
  <suspense>
    <template #default>
      <component :is="currentView"></component>
    </template>
    <template #fallback>
      <Loading :no-opacity="true"></Loading>
    </template>
  </suspense>
</template>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent, ref, watch } from "vue";
import gameDeck from "@/views/gameDeck.vue";
import gameJoin from "@/views/gameJoin.vue";
import gameNavigation from "@/components/base/navigation/gameNavigation.vue";
import { useRootStore } from "@/stores/root";
import Loading from "@/components/base/loading/Loading.vue";

export default defineComponent({
  components: { gameDeck, gameJoin, gameNavigation, Loading },
  setup() {
    const rootStore = useRootStore();
    const locale = rootStore.locale;

    let currentView = computed(() => rootStore.currentView);

    document.querySelector("html")!.setAttribute("lang", locale);

    return {
      currentView,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";

html * {
  font-family: "Montserrat-Light", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// html {
//   &.overlay-open {
//     overflow: hidden;
//   }
// }
</style>
