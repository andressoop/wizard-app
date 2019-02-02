<template>
  <div class="dashboard">
    <HelloWorld msg="Wizard App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'dashboard',
  components: {
    HelloWorld
  }
}
</script>
