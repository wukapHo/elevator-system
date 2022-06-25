<template>
  <call-buttons
    v-model="calledButtons"
    @update:modalValue="calledButtons = $event"
  />
</template>

<script>
import CallButtons from '@/components/CallButtons.vue';

export default {
  name: 'App',
  components: {
    CallButtons,
  },

  data: () => ({
    calledButtons: [],
  }),
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  padding: 1vh;
}
</style>
