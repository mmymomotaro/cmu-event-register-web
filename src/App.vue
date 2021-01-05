<template>
  <v-app>
    <v-main>
    <Navbar/>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  name: 'App',

  components: {
    Navbar,

  },

  data: () => ({
    //
  }),
};
</script>


<style>
@font-face {
  font-family: "Kanit-Regular";
  src: url("assets/fonts/Kanit-Regular.ttf");
}

#app {
  font-family: 'Kanit-Regular', sans-serif;
  color: #2c3e50;
  font-weight: 10;
}
</style>