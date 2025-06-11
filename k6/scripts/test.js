import http from "k6/http";
import { sleep } from "k6";
const FRONTEND_URL = "http://mycobot-frontend-1";
const BACKEND_URL = "http://mycobot-backend-1:5000";

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(99)<1000'], // 99% of requests should be below 1s
  },
  scenarios: {
    average_load: {
      executor: 'ramping-vus',
      stages: [
        // ramp up to average load of 20 virtual users
        { duration: '10s', target: 20 },
        // maintain load
        { duration: '50s', target: 20 },
        // ramp down to zero
        { duration: '5s', target: 0 },
      ],
    },
  },
};

let mushroom = {
  "cap_shape": "b",
  "cap_surface": "f",
  "cap_color": "n",
  "bruises": "t",
  "odor": "a",
  "gill_attachment": "a",
  "gill_spacing": "c",
  "gill_size": "b",
  "gill_color": "k",
  "stalk_shape": "e",
  "stalk_root": "b",
  "stalk_surface_above_ring": "f",
  "stalk_surface_below_ring": "f",
  "stalk_color_above_ring": "n",
  "stalk_color_below_ring": "n",
  "veil_color": "w",
  "ring_number": "o",
  "ring_type": "c",
  "spore_print_color": "k",
  "population": "a",
  "habitat": "g"
};

function submitMushroom(FORM_DATA) {
  let res = http.post(
    `${BACKEND_URL}/mushroom/analyze`,
    FORM_DATA
  );
};


export default function () {
  submitMushroom(mushroom);

  sleep(.1)
}
