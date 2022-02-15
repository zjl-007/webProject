export const store = {
    state: {
        devices: [],
        chartData: {},
    },
    setDevices(devices) {
        this.state.devices = devices;
    },
    getDevices() {
        return this.state.devices;
    },
    clearDevices() {
        this.state.devices = [];
    },
    getChartData() {
        return this.state.chartData;
    },
    setChartData(data) {
        this.state.chartData = data;
    }
}