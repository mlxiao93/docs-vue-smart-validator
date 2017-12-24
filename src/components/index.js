import demo from './demo';

export default {
    install(Vue) {
        Vue.component(demo.name, demo);
    }
}