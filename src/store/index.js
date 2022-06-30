import { createStore } from 'vuex';

export default createStore({
  state: {
    elevatorSystem: [],
    callButtons: [],
    callQueue: [],
  },

  getters: {
    closestElevatorIdx(state) {
      const freeElevators = state.elevatorSystem.filter(({ isBusy }) => isBusy === false);
      const currentFloors = freeElevators.map((item) => item.currentFloor);
      const currenCall = state.callQueue[0];
      const closestElevatorFloor = currentFloors.sort(
        (a, b) => Math.abs(currenCall - a) - Math.abs(currenCall - b),
      )[0];
      const closestElevator = state.elevatorSystem.find(
        ({ currentFloor }) => currentFloor === closestElevatorFloor,
      );

      return state.elevatorSystem.indexOf(closestElevator);
    },
  },

  mutations: {
    call(state, floor) {
      if (state.elevatorSystem.some(({ currentFloor }) => currentFloor === floor)
        || state.callQueue.includes(floor)) {
        return;
      }

      state.callQueue.push(floor);
      state.callButtons[floor - 1].isCalled = true;
    },

    move(state, { idx, targetFloor }) {
      state.elevatorSystem[idx].targetFloor = targetFloor;
      state.elevatorSystem[idx].isMoving = true;
      state.elevatorSystem[idx].isBusy = true;
    },

    update(state, { idx, currentFloor }) {
      state.elevatorSystem[idx].currentFloor = currentFloor;
    },

    stop(state, { idx, currentFloor }) {
      state.elevatorSystem[idx].isMoving = false;
      state.callButtons[currentFloor - 1].isCalled = false;

      setTimeout(() => {
        state.elevatorSystem[idx].isBusy = false;
      }, 3000);
    },
  },
});
