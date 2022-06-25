<template>
  <div class="call-buttons">
    <div
      v-for="floor in floorsCount"
      :key="floor"
      class="call-buttons__item-wrapper"
    >
      {{ floor }}
      <button
        class="call-buttons__item"
        :class="{ 'call-buttons__item--called': modelValue.includes(floor) }"
        @click="call(floor)"
      >
        &ocir;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallButtons',

  props: {
    modelValue: {
      type: Array,
      default: () => ([]),
    },

    floorsCount: {
      type: Number,
      default: 5,
    },
  },

  emits: {
    'update:modelValue': null,
  },

  methods: {
    call(floor) {
      this.$emit('update:modelValue', [...this.modelValue, floor]);
    },
  },
};
</script>

<style lang="scss">
.call-buttons {
  position: absolute;
  top: 1vh;
  bottom: 1vh;
  display: flex;
  flex-direction: column-reverse;
  width: 5vh;

  &__item-wrapper {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    font-size: 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: lightblue;
    }

    &:active {
      transform: scale(1.05);
    }

    &--called {
      background-color: salmon;
      pointer-events: none;
    }
  }
}
</style>
