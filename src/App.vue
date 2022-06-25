<template>
  <call-buttons
    v-model="calledButtons"
    @update:modalValue="calledButtons = $event"
  />

  <div class="elevator-list">
    <base-elevator />
  </div>
</template>

<script>
import CallButtons from '@/components/CallButtons.vue';
import BaseElevator from '@/components/BaseElevator.vue';

export default {
  name: 'App',
  components: {
    CallButtons,
    BaseElevator,
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

.elevator-list {
  position: absolute;
  top: 1vh;
  bottom: 1vh;
  left: 7vh;
  display: flex;
  align-items: center;
}
</style>
