(function () {
    "use strict"

    let active = null;

    // Define locations as an object with keys as location names and values as x and y coordinates 
    const locations = {
        "Alice's Residence": { x: 289, y: 90 },
        "Bob's Abode": { x: 305, y: 193 },
        "Cabin Retreat": { x: 382, y: 77 },
        "Daria's Domicile": { x: 193, y: 295 },
        "Ernie's Estate": { x: 60, y: 293 },
        "Farmstead": { x: 46, y: 128 },
        "Grete's Habitat": { x: 45, y: 197 },
        "Market": { x: 172, y: 120 },
        "Postal Outlet": { x: 215, y: 67 },
        "Store": { x: 147, y: 222 },
        "Municipal Building": { x: 212, y: 223 }
    };
    // Get an array of location keys
    const placeKeys = Object.keys(locations);
    // Speed of animation
    const speed = 2;

    // Animation class for updating the robot's position and parcels
    class Animation {
        // Constructor that initializes the world state, robot, and robot state
        constructor(worldState, robot, robotState) {
            this.worldState = worldState;
            this.robot = robot;
            this.robotState = robotState;
            this.turn = 0;

            // Create a div element for holding the animation
            let outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument;
            this.node = outer.appendChild(doc.createElement("div"));
            this.node.style.cssText = "position: relative; line-height: 0.1; margin-left: 10px";

            // Add an image of the map
            this.map = this.node.appendChild(doc.createElement("img"));
            this.map.src = "img/village2x.png";
            this.map.style.cssText = "vertical-align: -8px";

            // Add a div element for the robot
            this.robotElt = this.node.appendChild(doc.createElement("div"));
            this.robotElt.style.cssText = `position: absolute; transition: left ${0.8 / speed}s, top ${0.8 / speed}s;`;
            let robotPic = this.robotElt.appendChild(doc.createElement("img"));
            robotPic.src = "img/robot_moving2x.gif";
            this.parcels = [];

            // Add a span element for displaying the turn number
            this.text = this.node.appendChild(doc.createElement("span"));
            // Add a button element for stopping the animation
            this.button = this.node.appendChild(doc.createElement("button"));
            this.button.style.cssText = "color: white; background: #28b; border: none; border-radius: 2px; padding: 2px 5px; line-height: 1.1; font-family
            this.button.textContent = "Stop";
            this.button.addEventListener("click", () => this.clicked());
            this.schedule();
            this.updateView();
            this.updateParcels();

            this.robotElt.addEventListener("transitionend", () => this.updateParcels());

        }


        // Updates the robot's position and turn number on the interface
        updateView() {
            let pos = locations[this.worldState.place];
            this.robotElt.style.top = `${pos.y - 38} px`;
            this.robotElt.style.left = `${pos.x - 16} px`;
            this.text.textContent = `Turn ${this.turn}`;
        }

        // Function to refresh the displayed packages
        refreshPackages() {
            // Remove any existing packages from the display
            while (this.parcels.length) {
                this.parcels.pop().remove();
            }
            // Keep track of the height of the stack of packages for each location
            let heights = {};
            for (let { place, address } of this.worldState.parcels) {
                let height = heights[place] || (heights[place] = 0);
                heights[place] += 14;
                // Create a new node for each package
                let node = document.createElement("div");
                let offset = placeKeys.indexOf(address) * 16;
                node.style.cssText = `position: absolute; height: 16px; width: 16px; background-image: url(img/parcel2x.png); background-position: 0 -${offset}px`;
                if (place === this.worldState.place) {
                    // If the package is in the same location as the robot, display it as carried
                    node.style.left = "25px";
                    node.style.bottom = `${20 + height}px`;
                    this.robotElt.appendChild(node);
                } else {
                    // Otherwise, display the package at its location
                    let pos = locations[place];
                    node.style.left = `${pos.x - 5}px`;
                    node.style.top = `${pos.y - 10 - height}px`;
                    this.node.appendChild(node);
                }
                this.parcels.push(node);
            }
        }

        // Function to run the simulation of the robot
        tick() {
            // Get the next world state and robot state
            let newWorldState = this.robot(this.worldState, this.robotState)
            let { direction, memory } = newWorldState
            this.worldState = this.worldState.move(direction)
            this.robotState = memory
            this.turn++
            this.updateView()

            if (this.worldState.parcels.length === 0) {
                // If all parcels have been delivered, stop the simulation and update the display
                clearTimeout(this.timeout)
                this.button.remove()
                this.text.textContent = `Completed after ${this.turn} turns`
                this.robotElt.firstChild.src = "img/robot_idle2x.png"
            } else {
                // Otherwise, schedule the next tick of the simulation
                this.schedule()
            }
        }

        // Function to start the simulation at the specified speed
        startSchedule() {
            this.timeout = setTimeout(() => this.tick(), 1000 / speed)
        }

        // Function to stop the simulation
        stopSchedule() {
            clearTimeout(this.timeout)
            this.timeout = null
        }

        // Function to toggle the state of the simulation
        toggle() {
            // Check if the simulation is currently not running
            if (this.timeout === null) {
                // Start the simulation by calling startSchedule()
                this.startSchedule();
                // Change the text content of the button to "Stop"
                this.button.textContent = "Stop";
                // Change the source of the robot image to a moving gif
                this.robotElt.firstChild.src = "img/robot_moving2x.gif";
            } else {
                // Stop the simulation by calling stopSchedule()
                this.stopSchedule();
                // Change the text content of the button to "Start"
                this.button.textContent = "Start";
                // Change the source of the robot image to an idle image
                this.robotElt.firstChild.src = "img/robot_idle2x.png";
            }
        }
    }

    window.runRobotAnimation = function (worldState, robot, robotState) {
        if (active && active.timeout != null) {
            active.stopSchedule()
        }

        active = new Animation(worldState, robot, robotState)
    }

})()
