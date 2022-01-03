export const store = {
    state: {
        devices: [],
    },
    setDevices(devices) {
        this.state.devices = devices;
    },
    getDevices() {
        return this.state.devices;
    },
    clearDevices() {
        this.state.devices = [];
    }
}