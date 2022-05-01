<template>
  <suspense>
    <template #default>
      <component :is="dynamicComponent"></component>
    </template>
    <template #fallback>
      <Loading :no-opacity="true"></Loading>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useRootStore } from "@/stores/root";
import { TRootState } from "@/models/store.root";
import Loading from "@/components/base/loading/Loading.vue";

export default defineComponent({
  components: { Loading },
  inheritAttrs: false,
  setup() {
    const rootStore = useRootStore() as unknown as TRootState;
    const locale = rootStore.locale;

    const currentView = ref(rootStore.currentView);

    const dynamicComponent: any = defineAsyncComponent(() => import(`./views/${currentView.value}.vue`));

    document.querySelector("html")!.setAttribute("lang", locale);

    return {
      dynamicComponent,
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
