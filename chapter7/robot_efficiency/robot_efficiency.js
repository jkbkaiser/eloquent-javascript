import {
  routeRobot,
  findRoute,
  goalOrientedRobot,
  roadGraph,
} from "../code.js";
import { compareRobots } from "../measuring_a_robot/measuring_a_robot.js";

// Delivery vs pickup
function getShortestRoute(place, parcels, graph) {
  let shortestRoute = [];
  let smallestDistance = 1000;

  for (let parcel of parcels) {
    if (parcel.place != place) {
      let route = findRoute(graph, place, parcel.place);

      if (route.length < smallestDistance) {
        shortestRoute = route;
      }
    } else {
      let route = findRoute(graph, place, parcel.address);

      if (route.length < smallestDistance) {
        shortestRoute = route;
      }
    }
  }

  return shortestRoute;
}

export function improvedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    route = getShortestRoute(place, parcels, roadGraph);
  }
  return { direction: route[0], memory: route.slice(1) };
}

function lazyRobot({ place, parcels }, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map((parcel) => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true,
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
        };
      }
    });

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }

  return { direction: route[0], memory: route.slice(1) };
}

compareRobots(improvedRobot, [], lazyRobot, []);
