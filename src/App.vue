<template>
  <div id="app">
   <vue-circle-controler :value="cpValue"  dial :startAngleOffset="90" ></vue-circle-controler>
   <input type="range" min="0" max="100" v-model="value">
  </div>
</template>

<script>
import VueCircleControler from './VueCircleControler'
export default {
  name: 'app',
  data(){
    return{
      value: 0
    }
    
  },
  computed:{
    cpValue(){ return +this.value}
  },
  components: {
    VueCircleControler
  }
}
</script>

<style>

</style>
