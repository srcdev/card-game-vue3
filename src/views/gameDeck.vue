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
  <gameJoin></gameJoin>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useGameStore } from "@/stores/game";
import gameJoin from "@/views/gameJoin.vue";

const props = defineProps({
  componentData: {
    type: String,
    default: null,
  },
});

const gameStore = useGameStore();
const questions = computed(() => gameStore.questions);
const questionsCount = computed(() => gameStore.questionsCount);
const questionsLoaded = computed(() => gameStore.questionsLoaded);

const componentData = props.componentData;
console.log(`componentData --> ${componentData}`);

const getQuestions = () => {
  gameStore.getQuestions();
};

onMounted(() => {
  if (!questionsLoaded.value) {
    getQuestions();
  }
});
</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";
</style>
