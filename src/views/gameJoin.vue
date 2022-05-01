<template>
  <h2 v-text="t('joinGameTitle')"></h2>
  <p v-text="t('joinGameExplainer')"></p>
  <form @submit.prevent="submitForm()" novalidate class="mt-12">
    <div>
      <div>
        <label v-text="t('joinGameFormNameLabel')" for="name"></label>
      </div>
      <div>
        <input type="text" id="name" v-model="formDataJoinGame.name" :placeholder="t('joinGameFormNamePlaceholder')" />
      </div>
    </div>
    <div>
      <button class="btn btn-primary" @keyup.enter="submitForm()" @click.prevent="submitForm()" v-text="t('joinGameFormSubmit')"></button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { IFormDataJoinGame } from "@/models/store.game";

const { t } = useI18n();

const formDataJoinGame = {} as IFormDataJoinGame;

const submitForm = () => {
  console.log(`Join Game --> submitForm`);
  console.log(formDataJoinGame);
};

</script>

<style lang="scss">
@import "@/assets/styles/imports.scss";
</style>
