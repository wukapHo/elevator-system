<template>
  <elevator-system :system-config="systemConfig" />
</template>

<script>
import ElevatorSystem from '@/components/ElevatorSystem.vue';

export default {
  name: 'App',

  components: {
    ElevatorSystem,
  },

  data: () => ({
    systemConfig: {
      floorsCount: 7,
      elevatorsCount: 3,
    },
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
