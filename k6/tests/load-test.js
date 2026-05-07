import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "20s",

  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}