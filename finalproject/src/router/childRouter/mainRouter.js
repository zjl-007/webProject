import userInfo from "../../views/system/userInfo"
import userConfig from "../../views/system/userConfig"
import capture from "../../views/flow/capture"
import flowInfo from "../../views/flow/flowInfo"
import netcardInfo from "../../views/base/netcardInfo"
import historyData from "../../views/history/historyData"
import historyChart from "../../views/history/historyChart"
export default [
    {
        path: '',
        redirect: 'base/netcardInfo'
    },
    {
        path: 'sys/userInfo',
        component: userInfo,
    },
    {
        path: 'sys/userConfig',
        component: userConfig,
    },

    {
        path: 'flow/capture',
        name: 'capture',
        component: capture,
    },
    {
        path: 'flow/flowInfo',
        component: flowInfo,
    },
    {
        path: 'base/netcardInfo',
        component: netcardInfo,
    },
    {
        path: 'history/historyData',
        component: historyData,
    },
    {
        path: 'history/historyChart',
        component: historyChart,
    }
]