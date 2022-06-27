import { createStore } from 'vuex';

export default createStore({
  state: {
    elevatorSystem: [],
    callButtons: [],
    callQueue: [],
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

    stop(state, { idx, currentFloor }) {
      state.elevatorSystem[idx].currentFloor = currentFloor;
      state.elevatorSystem[idx].isMoving = false;
      state.callButtons[currentFloor - 1].isCalled = false;

      setTimeout(() => {
        state.elevatorSystem[idx].isBusy = false;
      }, 3000);
    },
  },
});
