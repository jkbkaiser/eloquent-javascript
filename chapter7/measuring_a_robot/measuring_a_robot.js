import {
  routeRobot,
  goalOrientedRobot,
  VillageState,
  runRobot,
} from "../code.js";

const NUM_ITERATIONS = 1000;

export function compareRobots(robot1, memory1, robot2, memory2) {
  let robot1Steps = [];
  let robot2Steps = [];

  for (let i = 0; i < NUM_ITERATIONS; i++) {
    let problem = VillageState.random();
    robot1Steps.push(runRobot(problem, robot1, memory1));
    robot2Steps.push(runRobot(problem, robot2, memory2));
  }

  console.log("Average steps");
  console.log(
    `robot1: ${robot1Steps.reduce((a, b) => a + b) / NUM_ITERATIONS}`,
  );
  console.log(
    `robot2: ${robot2Steps.reduce((a, b) => a + b) / NUM_ITERATIONS}`,
  );
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
