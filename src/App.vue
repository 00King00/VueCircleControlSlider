<template>
  <div id="app">
   <!-- <CircleControler></CircleControler> -->
   <test :value="cpValue"></test>
   <input type="range" min="0" max="100" v-model="value">
  </div>
</template>

<script>
//import CircleControler from './VueCircleControler'
import test from './test'
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
    //CircleControler
    test
  }
}
</script>

<style>

</style>
