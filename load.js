
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10000,
  duration: '120s',
};

export default function () {
  const res = http.get('http://192.168.49.2:30001/getData');

  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  sleep(1);
}

