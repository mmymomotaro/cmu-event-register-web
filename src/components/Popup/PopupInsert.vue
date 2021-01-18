<template>
 <v-card
        color="light-blue darken-1"
        dark
      >
        <v-card-text class="px-3 py-3">
          กำลังเพิ่มข้อมูล
          <v-progress-linear
            indeterminate
            color="white"
            class="ma-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
</template>

<script>

export default {
  name: "PopupInsert",
  data() {
    return {
    };
  },
  components: {},
  methods: {},
  mounted() {
  },
};
</script>
