<template>
 <v-card
        color="green darken-3"
        dark
      >
        <v-card-text class="px-3 py-3">
          สำเร็จ
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
  name: "SuccessUpload",
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
