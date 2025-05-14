import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '30s',
};

const ids = [0, 1]; // Example IDs

export default function () {
  const res = http.get('http://192.168.1.9:30002/getData');
  const res1 = http.post('http://192.168.1.9:30002/insertData');
  const id = ids[Math.floor(Math.random() * ids.length)];
  const res2 = http.put(`http://192.168.1.9:30002/updateData/${id}`);

  check(res, { 'GET /getData - status 200': (r) => r.status === 200 });
  check(res1, { 'POST /insertData - status 200': (r) => r.status === 200 });
  // check(res2, { `PUT /updateData/${id} - status 200`: (r) => r.status === 200 });
  const putCheckKey = `PUT /updateData/${id} - status 200`;
  check(res2, { [putCheckKey]: (r) => r.status === 200 });


  sleep(1);
}

