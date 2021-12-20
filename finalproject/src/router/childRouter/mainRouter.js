import userInfo from "../../views/system/userInfo"
import userConfig from "../../views/system/userConfig"
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
}
]