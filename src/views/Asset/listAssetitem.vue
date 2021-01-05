<template>
  <v-container grid-list-xs>
    <div id="listAssetitem">
    <nav>
    <v-card-title primary-title style="font-size: 2rem">
             <!-- {{ AssetList[0].name }} -->
      </v-card-title>
    </nav>
    </div>
  </v-container>
</template>

<script>
import api from "../../services/asset";
export default {
  name: "listAssetitem",
  data() {
    return {
      Asset_id: this.$route.params.id,
      AssetList: [],
    };
  },
  components: {},
  methods: {
    ListAssetdata() {
      api.ListAssetItem(
        {
          id: this.Asset_id,
        },
        (result) => {
          this.AssetList = result.data;
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },

  mounted() {
    this.ListAssetdata();
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-size: 1.25rem;
  height: 2.5rem;
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
