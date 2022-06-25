<template>
  <div />
</template>

<script>
export default {
  name: 'CallButtons',

  props: {
    floorsCount: {
      type: Number,
      default: 5,
    },
  },

  emits: {
    call: null,
  },

  methods: {
    call() {},
  },
};
</script>

<style>

</style>
