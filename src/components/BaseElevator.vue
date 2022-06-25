<template>
  <div class="elevator-shaft">
    <div
      v-for="floor in floorsCount"
      :key="floor"
      class="elevator-shaft__floor"
    />

    <div
      class="elevator-shaft__cab"
      :class="{ 'elevator-shaft__cab--flashing': isWaiting }"
      :style="{
        height: cabHeight + 'vh',
        transform: 'translateY(-' + cabPosition + '%)',
      }"
    >
      <div
        v-if="isMoving"
        class="elevator-shaft__cab-indicator"
        :class="{
          'elevator-shaft__cab-indicator--up': elevatorState.targetFloor > currentFloor,
          'elevator-shaft__cab-indicator--down': elevatorState.targetFloor < currentFloor,
        }"
      >
        {{ elevatorState.targetFloor }}
      </div>
    </div>
  </div>
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
        id: null,
        targetFloor: null,
        isBusy: false,
      }),
    },
  },

  data: () => ({
    movingTime: 1000,
    waitingTime: 3000,
    isMoving: false,
    isWaiting: false,
    currentFloor: 1,
  }),

  computed: {
    cabHeight() {
      return (100 - 2) / this.floorsCount;
    },

    cabPosition() {
      return (this.currentFloor - 1) * 100;
    },
  },

  watch: {
    elevatorState: {
      handler() {
        if (this.currentFloor < this.elevatorState.targetFloor) {
          this.move('up');
        } else if (this.currentFloor > this.elevatorState.targetFloor) {
          this.move('down');
        }
      },
      deep: true,
    },
  },

  methods: {
    move(direction) {
      if (this.currentFloor === this.elevatorState.targetFloor) {
        this.isMoving = false;
        this.isWaiting = true;

        setTimeout(() => {
          this.isWaiting = false;
        }, this.waitingTime);

        return;
      }

      this.isMoving = true;

      if (direction === 'up') {
        this.currentFloor += 1;
      } else if (direction === 'down') {
        this.currentFloor -= 1;
      }

      setTimeout(() => {
        this.move(direction);
      }, this.movingTime);
    },
  },
};
</script>

<style lang="scss">
.elevator-shaft {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  width: 10vh;
  margin-right: 1vh;
  border: 1px solid black;

  &:last-child {
    border-bottom: none;
  }

  &__floor {
    position: relative;
    flex-grow: 1;
    border-bottom: 1px solid black;
    z-index: 1;
  }

  &__cab {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: salmon;
    z-index: 0;
    transition: 1s linear;

    &--flashing {
      animation: flash 1s linear infinite;
    }
  }

  &__cab-indicator {
    position: absolute;
    top: 5%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 30px;
    border: 1px solid black;
    border-radius: 10px;
    background: no-repeat center left 12px;
    font-size: 20px;
    transform: translateX(-50%);

    &--up {
      background-image: url(@/assets/svg/arrow-up.svg);
    }

    &--down {
      background-image: url(@/assets/svg/arrow-down.svg);
    }
  }
}

@keyframes flash {
  50% {
    opacity: 0.7;
  }
}
</style>
