<template>
  <div id="app">
   <vue-circle-controler> </vue-circle-controler>
   <!-- <input type="range" min="-30" max="30" v-model="value"> -->
  </div>
</template>

<script>
import VueCircleControler from './VueCircleControler'
export default {
  name: 'app',
  data(){
    return{
      value: -30
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
