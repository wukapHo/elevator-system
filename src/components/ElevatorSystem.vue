<template>
  <div class="elevator-system">
    <call-buttons
      :floors-count="systemConfig.floorsCount"
      :buttons-state="buttonsState"
      v-model="calledButtons"
      @update:modelValue="updateCallQueue($event)"
    />

    <div class="elevator-list">
      <base-elevator
        v-for="elevator in systemConfig.elevatorsCount"
        :key="elevator"
        :floors-count="systemConfig.floorsCount"
        :elevator-state="systemState.find(({id}) => id === elevator)"
        @done="updateState(elevator, $event)"
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
    calledButtons: [],
    systemState: [],
    buttonsState: [],
  }),

  watch: {
    calledButtons() {
      this.call();
    },
  },

  created() {
    for (let i = 1; i <= this.systemConfig.elevatorsCount; i += 1) {
      this.systemState.push({
        id: i,
        currentFloor: 1,
        targetFloor: null,
        isBusy: false,
      });
    }

    for (let i = 1; i <= this.systemConfig.floorsCount; i += 1) {
      this.buttonsState.push({
        id: i,
        isShine: false,
      });
    }
  },

  methods: {
    call() {
      if (this.calledButtons.length === 0) return;

      for (let i = 0; i < this.systemState.length; i += 1) {
        if (!this.systemState[i].isBusy) {
          const currentCall = this.calledButtons.shift();
          this.systemState[i].targetFloor = currentCall;
          this.systemState[i].isBusy = true;

          return;
        }
      }
    },

    updateState(id, newValue) {
      for (let i = 0; i < this.systemState.length; i += 1) {
        if (this.systemState[i].id === id) {
          this.systemState[i].currentFloor = this.systemState[i].targetFloor;
          this.systemState[i].isBusy = newValue;
        }
        this.buttonsState[this.systemState[i].currentFloor - 1].isShine = false;
      }
    },

    updateCallQueue(newValue) {
      for (let i = 0; i < this.systemState.length; i += 1) {
        const currentFloors = this.systemState.map((item) => item.currentFloor);
        const floorForAdd = newValue[newValue.length - 1];

        if (currentFloors.includes(floorForAdd)) return;

        this.buttonsState[floorForAdd - 1].isShine = true;
        this.calledButtons = newValue;
      }
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
