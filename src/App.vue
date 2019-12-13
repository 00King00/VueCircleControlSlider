<template>
  <div id="app">
   <vue-circle-control-slider @value="updatedVal" :value="val"/>
   <h2>{{value}}</h2>
   <input type="range" v-model.number="val">
  </div>
</template>

<script>
import VueCircleControlSlider from './VueCircleControlSlider'
export default {
  name: 'app',
  data(){
    return{
      value: 0,
      val: 0
    }
    
  },
  computed:{
    cpValue(){ return +this.value}
  },
  methods:{
    updatedVal(v){this.value = v}
  },
  components: {
    VueCircleControlSlider
  }
}
</script>

<style>

</style>
