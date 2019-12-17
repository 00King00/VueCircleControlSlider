import VueCircleControlSlider from "./VueCircleControlSlider.vue";

// Install the components
// export function install (Vue){
//     Vue.component('VueCircleControlSlider', VueCircleControlSlider);
// }

// Expose the components
export default VueCircleControlSlider;


// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}



