
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5000,              // Number of virtual users
  duration: '300s',      // Duration of the test
};

export default function () {
  const res = http.get('http://192.168.49.2:30001/getData');

  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  sleep(1); // Wait for 1 second before next iteration
}

