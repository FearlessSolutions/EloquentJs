function fastestRobot(state, robot, memory) {
  // Store the closest parcel information
  let closestParcel = {
    distance: Number.MAX_SAFE_INTEGER,
    pickUp: true
  };

  // Loop through all parcels to find the closest one
  for (let parcel of state.parcels) {
    // Calculate the distance to the current parcel
    let distance = robot.getDistance(state.place, parcel.place);

    // Check if the current parcel is closer than the closest one found so far
    if (distance < closestParcel.distance) {
      closestParcel = {
        distance: distance,
        pickUp: parcel.place !== state.place
      };
    }
  }

  // Choose the best action based on the closest parcel
  if (closestParcel.pickUp) {
    // Pick up the closest parcel if it's not already picked up
    return { direction: robot.getDirection(state.place, closestParcel.place), memory: memory };
  } else {
    // Deliver the closest parcel if it's already picked up
    let directions = robot.getDirections(state.place, closestParcel.place);
    return { direction: directions[0], memory: [directions[1], ...memory] };
  }
}