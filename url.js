const {url} = require('url');
const u= new URL('https://www.example.conm:8080/products/list?category=books&sort=asc#section2');
console.log('Protocol:', u.protocol);
console.log('Host:', u.hostname);
console.log('port:', u.port);
console.log('Pathname:', u.pathname);
console.log('Hash:', u.hash);
u.searchParams.forEach((v, k) => {
  console.log( k,'=', v);
});


