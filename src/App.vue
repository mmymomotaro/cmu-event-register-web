<template>
  <v-app>
    <v-main>
      <div v-if="user == 1">
        <Navbar />
      </div>
      <div v-else>
        <UserNavbar />
      </div>

      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import UserNavbar from "./components/User/UserNavbar";
export default {
  name: "App",

  components: {
    Navbar,
    UserNavbar,
  },

  data: () => ({
    user: 1
  }),
};
</script>

<style>
@font-face {
  font-family: "Kanit-Regular";
  src: url("assets/fonts/Kanit-Regular.ttf");
}

#app {
  font-family: "Kanit-Regular", sans-serif;
  color: #2c3e50;
  font-weight: 10;
}
</style>
