// Definition of the roads array, representing edges between nodes in a graph
var roads = [
	"Alice's House-Bob's House", "Alice's House-Cabin",
	"Alice's House-Post Office", "Bob's House-Town Hall",
	"Daria's House-Ernie's House", "Daria's House-Town Hall",
	"Ernie's House-Grete's House", "Grete's House-Farm",
	"Grete's House-Shop", "Marketplace-Farm",
	"Marketplace-Post Office", "Marketplace-Shop",
	"Marketplace-Town Hall", "Shop-Town Hall"
];

// createGraph function to convert an array of edges into a graph object, where each node maps to a list of its neighbors
function createGraph(edges) {
	let graph = Object.create(null);
	// helper function to link two nodes together in the graph
	function linkNodes(fromNode, toNode) {
		if (!graph[fromNode]) {
			graph[fromNode] = [toNode];
		} else {
			graph[fromNode].push(toNode);
		}
	}
	// loop through the array of edges, splitting each into origin and destination nodes and linking them
	for (let [originNode, destinationNode] of edges.map(edge => edge.split("-"))) {
		linkNodes(originNode, destinationNode);
		linkNodes(destinationNode, originNode);
	}
	return graph;
}

// creating the roadGraph by calling createGraph on the roads array
var roadGraph = createGraph(roads);

// Definition of the ParcelWorldState class, representing the state of a world with parcels
var ParcelWorldState = class ParcelWorldState {
	constructor(place, parcels) {
		this.place = place;
		this.parcels = parcels;
	}
	// move method to return a new ParcelWorldState object that reflects the robot moving to a destination node
	move(destination) {
		if (!roadGraph[this.place].includes(destination)) {
			return this;
		} else {
			let newParcels = [];
			this.parcels.forEach(parcel => {
				if (parcel.place === this.place) {
					newParcels.push({ place: destination, address: parcel.address });
				} else {
					newParcels.push(parcel);
				}
			});
			let parcels = newParcels.filter(p => p.place !== p.address);

			return new ParcelWorldState(destination, parcels);
		}
	}
}
//Main function to run the robot's delivery task, logging its moves and ending when all parcels are delivered.

// Function `runRobot` is used to simulate a robot's movements in a given state until all parcels have been delivered.
function runRobot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		// If there are no more parcels to deliver, the loop is broken and the number of turns taken is logged.
		if (state.parcels.length == 0) {
			console.log(`Done in ${turn} turns`);
			break;
		}
		// The robot function is called with the current state and memory to determine the next action.
		let action = robot(state, memory);
		// The state is updated based on the action taken by the robot.
		state = state.move(action.direction);
		// The memory is updated based on the action taken by the robot.
		memory = action.memory;
		// The direction of the robot's movement is logged.
		console.log(`Moved to ${action.direction}`);
	}
}

// Function `pickRandom` is used to pick a random element from an array.
function pickRandom(arr) {
	let randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

// Function `randomBot` returns an object with the direction property set to a random element of the `roadGraph` array.
let randomBot = function (state) {
	return { direction: pickRandom(roadGraph[state.place]) };
};

// Function `ParcelWorldState.random` creates a random world state with a specified number of parcels.
ParcelWorldState.random = function (parcelCount = 5) {
	let parcels = [];
	for (let i = 0; i < parcelCount; i++) {
		let address = pickRandom(Object.keys(roadGraph));
		let place;
		do {
			place = pickRandom(Object.keys(roadGraph));
		} while (place == address);
		parcels.push({ place, address });
	}
	return new ParcelWorldState("Post Office", parcels);
};

// Array `mailRoute` is a predefined route for a robot.
var mailRoute = [
	"Alice's House", "Cabin", "Alice's House", "Bob's House",
	"Town Hall", "Daria's House", "Ernie's House",
	"Grete's House", "Shop", "Grete's House", "Farm",
	"Marketplace", "Post Office"
];

// Function `routeRobot` returns the next direction and updated memory for a robot based on a predefined route stored in memory.
function routeRobot(state, memory) {
	if (memory.length == 0) {
		memory = mailRoute;
	}
	return { direction: memory[0], memory: memory.slice(1) };
}
// Function to find the shortest path between a source and destination node in a graph using breadth-first search (BFS) algorithm.

function findPath(graph, source, destination) {
	// initialize a queue with the starting node and its path
	let queue = [{ current: source, path: [source] }];
	
	// continue until queue is empty
	while (queue.length > 0) {
		// dequeue the node at the front of the queue
		let { current, path } = queue.shift();
		
		// for each neighbor of the current node
		for (let neighbor of graph[current]) {
			// if the neighbor is the destination, return the path to it
			if (neighbor === destination) return path.concat(destination);
			
			// if the neighbor has not been visited yet
			else if (!path.includes(neighbor)) {
				// enqueue the neighbor with its updated path
				queue.push({ current: neighbor, path: path.concat(neighbor) });
			}
		}
	}
	
	// if no path is found, return null
	return null;
}

// Returns next direction and updated memory for a goal-oriented robot based on current place and parcels, and a given route.

function goalOrientedRobot({ place, parcels }, route) {
	// if the robot doesn't have a route, find one for it
	if (route.length == 0) {
		let parcel = parcels[0];
		// if the robot is not at the place of the first parcel, find a route to it
		if (parcel.place != place) {
			route = findPath(roadGraph, place, parcel.place);
		} 
		// if the robot is at the place of the first parcel, find a route to its address
		else {
			route = findPath(roadGraph, place, parcel.address);
		}
	}
	
	// return the first direction in the route and the updated route (excluding the first step) as memory
	return { direction: route[0], memory: route.slice(1) };
}
