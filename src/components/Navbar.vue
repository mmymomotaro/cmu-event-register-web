<template>
  <div>
    <nav >
      <v-toolbar dense height="40" >
        <v-btn icon @click="drawer = !drawer" color="red" >
          <v-icon color="black">list</v-icon>
        </v-btn>
      </v-toolbar>
      <v-navigation-drawer app v-model="drawer" width="305" elevation="10"  >
        <!--sidebar -->
        

        <v-card class="mx-auto hover" max-width="400" flat >
          <v-list >
            <v-list-item-group color="blue darken-1" mandatory  >

              <!-- <v-list-item  @click="$router.push('/Dashboard')" >
                <v-list-item-icon><v-icon>dashboard</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title >Dashboard</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->


              <v-list-item @click="$router.push('/register')">
                <v-list-item-icon><v-icon>fact_check</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>ลงทะเบียนงานอบรม</v-list-item-title>
                </v-list-item-content>
              </v-list-item> 
              
              <v-list-item @click="$router.push('/listevent')">
                <v-list-item-icon><v-icon>description</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>ตารางงานอบรม</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            
            </v-list-item-group>
          </v-list>
          
        </v-card>


        
      </v-navigation-drawer>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  data() {
    return {
      drawer: false,
    };
  },
  methods: {

  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
