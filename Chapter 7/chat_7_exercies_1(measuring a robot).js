// function to compare the efficiency of two robots in delivering parcels
function compareRobots(robot1, memory1, robot2, memory2) {
  // helper function to count steps taken by a robot in delivering parcels
  const countSteps = (robot, memory) => {
    let steps = 0;
    // keep running the loop until all parcels are delivered
    for (let turn = 0;; turn++) {
      if (parcels.length == 0) {
        return steps;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      steps++;
    }
  }

  let totalSteps1 = 0;
  let totalSteps2 = 0;
  // run the loop 100 times to get average steps taken by both robots
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    totalSteps1 += countSteps(robot1, memory1);
    totalSteps2 += countSteps(robot2, memory2);
  }

  console.log(`Robot 1 average steps: ${totalSteps1 / 100}`);
  console.log(`Robot 2 average steps: ${totalSteps2 / 100}`);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
