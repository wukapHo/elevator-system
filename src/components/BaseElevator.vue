<template>
  <div />
</template>

<script>
export default {
  name: 'BaseElevator',

  props: {
    floorsCount: {
      type: Number,
      default: 5,
    },

    elevatorState: {
      type: Object,
      default: () => ({
        targetFloor: null,
        isBusy: false,
      }),
    },
  },

  data: () => ({
    movingTime: 1000,
    waitingTime: 3000,
  }),

  methods: {
    move() {},
  },
};
</script>

<style>

</style>
