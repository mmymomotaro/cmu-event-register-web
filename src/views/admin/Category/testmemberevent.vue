<template>
  <div id="memberevent">

    <v-card class="pa-0 ma-0" elevation="1" tile color="white">
      <v-container grid-list-xs>
        <v-row no-gutters>
          <v-col cols="12" md="9" style="font-size: 1.7rem" class="text-center">
            <v-row no-gutters>
              <v-col cols="12" md="6" >รายชื่อผู้เข้าร่วมงานอบรม</v-col>
            </v-row>
          </v-col>
          <!-- <v-col cols="12" md="3" class="px-1" >

            </v-col> -->
        </v-row>
      </v-container>
    </v-card>
    <v-container grid-list-xs>
      <v-row no-gutters class="pb-4">
        <v-col cols="12" md="10">

        </v-col>
        <!-- <v-col cols="12" md="2" class="px-1">
          <Addmember @parentfunction="parentfunction"/>
        </v-col> -->
      </v-row>
    </v-container>
  <div>
    <Getuser :senddata="text" />
  </div>


</div>
</template>

<script langauge="javascript">
import Getuser from '../testgetuser.vue';
// import Addmember from './addmember.vue';



export default {
  name: "memberevent",

  components: {
    Getuser,

    // Addmember,
  },
  data(){
    return{
      text:''
    }
  },
  methods:{
    parentfunction(data){
      console.log('ค่าที่ส่งมา',data);
      this.text=data
    },

  }
}
  
</script>

<style lang="scss" scoped>
.button {
  font-size: 1.25rem;
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
.bthover:hover {
  border-bottom: 1px;
}
</style>
