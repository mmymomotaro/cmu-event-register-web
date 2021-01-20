<template>
  <div>
    <nav>
      <v-toolbar dense height="40">
        <v-btn icon @click="drawer = !drawer" color="blue">
          <v-icon color="black">list</v-icon>
        </v-btn>
      </v-toolbar>
      <v-navigation-drawer app v-model="drawer" width="305" elevation="10">
        <!--sidebar -->
        <v-card elevation="10" class="mx-auto botton">
          <v-list-item three-line>
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

        <v-card class="mx-auto hover" max-width="400" flat>
          <v-list>
            <v-list-item-group color="blue darken-1" mandatory>
              <v-list-item @click="$router.push('/Dashboard')">
                <v-list-item-icon><v-icon>dashboard</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="$router.push('/manageAsset')">
                <v-list-item-icon><v-icon> work</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>จัดการข้อมูลสินทรัพย์</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="$router.push('/manageAssetDamage')">
                <v-list-item-icon><v-icon>work_off</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>จัดการข้อมูลสินทรัพย์เสียหาย</v-list-item-title>
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
                <v-list-item-icon><v-icon>construction</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>รายงานสินทรัพย์เสียหาย</v-list-item-title>
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
      search: "",
    };
  },
  methods: {
    SearchAssetdata() {
      this.$emit("search", this.search);
    },
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
