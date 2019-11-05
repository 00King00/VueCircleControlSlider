<template>
  <div id="app">
   <CircleControler  ></CircleControler>
  </div>
</template>

<script>
import CircleControler from './VueCircleControler'
export default {
  name: 'app',
  components: {
    CircleControler
  }
}
</script>

<style>
#app{
  text-align: center;
  padding: 50px;
}
</style>
