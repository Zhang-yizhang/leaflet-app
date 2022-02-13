import Map from './Map'

// 直接应用vue.min.js的写法，直接引用打包好的js会把vue绑到window上
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(Map.name, Map)
}

// Vue.use全局注册：单文件写法
//Vue.use注册的目标必须为一个install方法
// Map.install = Vue=>{
//     Vue.component(Map.name,Map)
// }
// export default Map

export default {
    install(Vue) {
        // 注册组件参数：【组件名，组件】
        Vue.component(Map.name, Map)
    }
}
