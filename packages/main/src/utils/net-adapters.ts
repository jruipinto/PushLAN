'use strict';

import { networkInterfaces } from 'os';

export interface AdapterIPv4Info {
    name: string;
    address: string;
    netmask: string;
    family: 'IPv4' | 'IPv6';
    mac: string;
    internal: boolean;
    cidr: string | null;
}
function orderAdapter(acc: AdapterIPv4Info[], currentAdapter: AdapterIPv4Info): AdapterIPv4Info[] {
    if (/^ethernet|^wi\-fi/i.test(currentAdapter.name)) {
        return ([currentAdapter, ...acc]);
    } else {
        return ([...acc, currentAdapter])
    }
}
export function netAdapters(): AdapterIPv4Info[] {
    const adapters = networkInterfaces();
    return (
        // convert networkInterfaces() object to an array of adapters (wifi, ethernet, etc..)
        Object.keys(adapters)
            .map(name => adapters[name]
                .map(netInterfaceInfo => ({ name, ...netInterfaceInfo }))
            )
            // exclude all 'internal' adapters
            .filter(adapter => !adapter[0].internal)
            // filter NetworkInterfaceInfos that aren't of 'IPv4' family
            .map(adapter => adapter
                .filter(({ family }) => family === 'IPv4')
            )
            // as there is there is only one 'IPv4' per adapter, then we map to the first object
            .map(adapter => adapter[0])
            .reduce(orderAdapter, [])
    )
}
