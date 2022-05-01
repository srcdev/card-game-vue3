<template>
  <p>gameDeck: questionsCount({{ questionsCount }}) --> questionsLoaded({{ questionsLoaded }})</p>
  <p>Questions:</p>
  <div v-if="questionsLoaded">
    <p>Questions loaded</p>
    <ul>
      <li v-for="(item, index) in questions" v-bind:key="index">
        <span>{{ item.question.id }}</span>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Questions NOT loaded</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { useGameStore } from "@/stores/game";

export default defineComponent({
  props: {},
  setup(props) {
    const gameStore = useGameStore();
    const questions = computed(() => gameStore.questions);
    const questionsCount = computed(() => gameStore.questionsCount);
    const questionsLoaded = computed(() => gameStore.questionsLoaded);

    const getQuestions = () => {
      gameStore.getQuestions();
    };

    onMounted(() => {
      if (!questionsLoaded.value) {
        getQuestions();
      }
    });

    return {
      questions,
      questionsCount,
      questionsLoaded,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";
</style>
