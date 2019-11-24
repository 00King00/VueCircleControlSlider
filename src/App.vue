<template>
  <div id="app">
   <vue-circle-controler > </vue-circle-controler>
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
