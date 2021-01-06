<template>
    <nav>
<v-toolbar dense height="80">
    <v-btn icon @click="drawer = !drawer" color="blue"> 
        <v-icon color="blue" >list</v-icon>
      </v-btn>
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        label="ค้นหาสินทรัพย์ด้วยชื่อ , บาร์โค้ด"
        class="pl-2"
      ></v-text-field>
      <v-btn outlined class="ml-3 white--text botton">
        หมวดหมู่
      </v-btn>
    </v-toolbar>
    
 <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <!-- @click="drawer = !drawer" -->

      <v-navigation-drawer app v-model="drawer" width="305" elevation="10">
        <!--sidebar -->
        <v-card
          elevation="10"
          class="mx-auto botton"
        >
          <v-list-item three-line >
            <v-list-item-content>
              <v-list-item-title class="headline white--text">
                Nuttapon <br />Jenwathanyukit
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined color="white" block> ออกจากระบบ</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mx-auto hover" max-width="400" flat >
          <v-list >
            <v-list-item-group  color="blue darken-3" >
              <v-list-item @click="$router.push('/manageAsset')">
                <v-list-item-icon ><v-icon >inventory</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title >จัดการข้อมูลสินทรัพย์</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="$router.push('/manageCategory')">
                <v-list-item-icon><v-icon>more</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>จัดการหมวดหมู่/ประเภท</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon><v-icon>content_paste</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>จัดการคำขอ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-icon><v-icon>signal_cellular_no_sim</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>จัดการสินทรัพย์เสียหาย</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-navigation-drawer>
      <!--sidebar -->
    </nav>
</template>

<script>
export default {
  name: "Navbar",
  components : {

  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
.botton{
    background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
  }
</style>
