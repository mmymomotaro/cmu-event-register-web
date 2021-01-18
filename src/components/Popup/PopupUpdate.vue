<template>
 <v-card
        color="blue darken-3"
        dark
      >
        <v-card-text class="px-3 py-3">
          กำลังอัพเดทข้อมูล
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
  name: "PopupUpdate",
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
