
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10000,
  duration: '120s',
};

const email = [
  'araceli_fritsch57@hotmail.com',
  'douglas.simonis@gmail.com',
  'annabell_nicolas@gmail.com',
  'oren_renner@hotmail.com',
  'maggie.heidenreich@hotmail.com',
  'alexandro0@gmail.com',
  'cordia_fay66@yahoo.com',
  'christa75@yahoo.com',
  'dave.wintheiser58@hotmail.com',
  'colin_beer22@yahoo.com',
  'nels29@hotmail.com',
  'olaf37@gmail.com',
  'naomie99@hotmail.com',
  'rosalinda_gibson@gmail.com',
  'jamie40@yahoo.com',
  'laury_wisozk@yahoo.com',
  'dino_schultz@yahoo.com',
  'sydnie29@hotmail.com',
  'niko_senger@yahoo.com',
  'montana.marquardt1@hotmail.com'
]


export default function () {
  const res = http.get('http://192.168.49.2:30001/getData');

  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  sleep(1);
}

