'use strict';

const { networkInterfaces } = require('os');

// const nets = networkInterfaces();
// const results = []; // or just '{}', an empty object

// for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//         // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
//         if (net.family === 'IPv4' && !net.internal) {
//             results.push({adapter: name, ip: net.address});
//         }
//     }
// }

// console.log('nets: ', nets);
// console.log('results: ', results);


const adapters = networkInterfaces();
const results = Object.keys(adapters)
    .map(name => adapters[name]
        .map(netInterfaceInfo => ({ name, ...netInterfaceInfo }))
    )
    .filter(adapter => !adapter[0].internal)
    .map(adapter => adapter
        .filter(netInterfaceInfo => netInterfaceInfo.family === 'IPv4')
    )

// console.log('adapters: ', adapters);
console.log('results: ', results);
