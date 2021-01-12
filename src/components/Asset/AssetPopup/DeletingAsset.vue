<template>
 <v-card
        color="red"
        dark
      >
        <v-card-text class="px-3 py-3">
          กำลังลบ
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
  name: "DeletingAsset",
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
