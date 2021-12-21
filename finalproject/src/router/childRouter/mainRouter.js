import userInfo from "../../views/system/userInfo"
import userConfig from "../../views/system/userConfig"
import capture from "../../views/flow/capture"
import flowInfo from "../../views/flow/flowInfo"
export default [
    {
        path: '',
        redirect: 'sys/userInfo'
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
        component: capture,
    },
    {
        path: 'flow/flowInfo',
        component: flowInfo,
    },
]