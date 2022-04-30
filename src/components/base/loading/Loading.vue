<template>
  <div class="loader-wrapper" :class="[{ 'no-opacity': noOpacity }]">
    <div class="is-loading loader fa" :class="spinnerType"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    loadingType: {
      type: String,
      default: "asyncPost",
    },
    noOpacity: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const spinnerTypes: any = {
      asyncLoad: "fa-spinner",
      asyncPost: "fa-spinner-third",
      asyncAwait: "fa-circle-notch",
    };
    const spinnerType = computed(() => spinnerTypes[props.loadingType]);

    return {
      spinnerType,
    };
  },
});
</script>
