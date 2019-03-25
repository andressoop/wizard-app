<template>
  <div id="app">
    <fade-transition origin="center" mode="out-in" :duration="250">
      <router-view/>
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions';

export default {
  components: {
    FadeTransition
  }
};
</script>

<style>

#dashboard {
  padding-left: 350px;
}

#dashboard.collapsed {
  padding-left: 50px;
}

.dashboard {
  padding: 50px;
}

.container-main {
  max-width: 600px;
}

</style>
