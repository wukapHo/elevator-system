<template>
  <div class="elevator-system">
    <call-buttons :floors-count="systemConfig.floorsCount" />

    <div class="elevator-list">
      <base-elevator
        v-for="elevator in systemConfig.elevatorsCount"
        :key="elevator"
        :floors-count="systemConfig.floorsCount"
        :elevator-state="$store.state.elevatorSystem.find(({ id }) => id === elevator)"
        :settings="settings"
        @done="done($event)"
      />
    </div>
  </div>
</template>

<script>
import CallButtons from '@/components/CallButtons.vue';
import BaseElevator from '@/components/BaseElevator.vue';

export default {
  name: 'ElevatorSystem',

  components: {
    CallButtons,
    BaseElevator,
  },

  props: {
    systemConfig: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    settings: {
      movingTime: 1000,
      waitingTime: 3000,
    },
  }),

  computed: {
    callQueue() {
      return this.$store.state.callQueue;
    },
  },

  watch: {
    callQueue: {
      handler() {
        this.move();
      },
      deep: true,
    },
  },

  created() {
    for (let i = 1; i <= this.systemConfig.elevatorsCount; i += 1) {
      this.$store.state.elevatorSystem.push({
        id: i,
        currentFloor: 1,
        targetFloor: null,
        isMoving: false,
        isBusy: false,
      });
    }

    for (let i = 1; i <= this.systemConfig.floorsCount; i += 1) {
      this.$store.state.callButtons.push({
        floor: i,
        isCalled: false,
      });
    }
  },

  methods: {
    move() {
      if (this.callQueue.length === 0) {
        return;
      }

      for (let i = 0; i < this.$store.state.elevatorSystem.length; i += 1) {
        if (!this.$store.state.elevatorSystem[i].isBusy) {
          const currentCall = this.$store.state.callQueue.shift();
          this.$store.commit('move', { idx: i, targetFloor: currentCall });

          return;
        }
      }
    },

    done(elevator) {
      this.$store.commit('stop', { idx: elevator.id - 1, currentFloor: elevator.currentFloor });

      setTimeout(() => {
        if (this.callQueue.length) {
          this.move();
        }
      }, this.settings.waitingTime);
    },
  },
};
</script>

<style lang="scss">
.elevator-list {
  position: absolute;
  top: 1vh;
  bottom: 1vh;
  left: 7vh;
  display: flex;
  align-items: center;
}
</style>
