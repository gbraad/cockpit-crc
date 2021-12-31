import rest from './rest.js';

const CRC_ADDRESS = "/home/gbraad/.crc/crc-http.sock";

export function getAddress() {
    return CRC_ADDRESS;
}

function crcCall(name, method, body, args) {
    const options = {
        method: method,
        path: name,
        body: body || "",
        params: args,
    };

    return rest.call(getAddress(), options);
}

export function getStatus() {
    return new Promise((resolve, reject) => {
        crcCall("/api/status", "GET")
                .then(reply => resolve(JSON.parse(reply)))
                .catch(reject);
    });
}

export function getLogs() {
    return new Promise((resolve, reject) => {
        crcCall("/api/logs", "GET")
                .then(reply => resolve(JSON.parse(reply)))
                .catch(reject);
    });
}

export function startInstance() {
    return new Promise((resolve, reject) => {
        crcCall("/api/start", "POST")
                .then(resolve)
                .catch(reject);
    });
}

export function stopInstance() {
    return new Promise((resolve, reject) => {
        crcCall("/api/stop", "POST")
                .then(resolve)
                .catch(reject);
    });
}

export function deleteInstance() {
    return new Promise((resolve, reject) => {
        crcCall("/api/delete", "GET")
                .then(resolve)
                .catch(reject);
    });
}

export function getConfig() {
    return new Promise((resolve, reject) => {
        crcCall("/api/config", "GET")
                .then(reply => resolve(JSON.parse(reply)))
                .catch(reject);
    });
}

export function setConfig(data) {
    return new Promise((resolve, reject) => {
        crcCall("/api/config", "POST", JSON.stringify(data))
                .then(reply => resolve(JSON.parse(reply)))
                .catch(reject);
    });
}
