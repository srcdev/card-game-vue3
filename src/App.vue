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
import pascalize from "@/helpers/pascalize";
import Loading from "@/components/base/loading/Loading.vue";

export default defineComponent({
  components: { Loading },
  inheritAttrs: false,
  props: {},
  setup(props) {
    const rootStore = useRootStore();
    const locale = rootStore.locale as string;

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
}

// html {
//   &.overlay-open {
//     overflow: hidden;
//   }
// }
</style>
