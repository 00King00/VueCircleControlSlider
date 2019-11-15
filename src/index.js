import VueCircleControler from "./VueCircleControler.vue";

// Install the components
export function install (Vue){
    Vue.component('VueCircleControler', VueCircleControler);
}

// Expose the components
export default VueCircleControler;


// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}



