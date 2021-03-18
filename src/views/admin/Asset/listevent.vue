<template>
  <v-card>
    <v-card-title>
      ค้นหารายชื่องานอบรม
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dataform"
      :search="search"
      item-key="name"
    >
      <template v-slot:[`item.num`]="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          color="success"
          @click="checkuserlist(item)"
          @onData="onData(item)"
        >
        Check
        </v-btn>
        &nbsp;
        <v-btn color="error" @click="deletelistevent(item)">delete</v-btn>
        <span>{{ dataon }}</span>
      </template>
    </v-data-table>
    <b-modal id="modal-1" no-stacking ok-title="ย้อนกลับ" ok-only>
      <template #modal-header="{ close }">
        <h5>ต้องการลบงานอบรมใช่หรือไม่?</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          Close
        </b-button>
      </template>

      <template #default>
        <h5>โปรดตรวจสอบรายชื่ออีกครั้ง</h5>
        <br />
        <p>ชื่องานอบรม : {{ deletename.nameEvent }}</p>
        <br />
      </template>

      <template #modal-footer>
        <b-button
          v-b-modal.modal-multi-2
          @click="deleteUser(deletename)"
          variant="danger"
        >
          ลบข้อมูล
        </b-button>
      </template>
    </b-modal>

    <b-modal id="modal-multi-2" title="ลบรายการสำเร็จ" ok-only>
      <center>
        <img src="@/assets/sus2.png" />
        <h2 color="success">Success</h2>
      </center>
    </b-modal>
  </v-card>
</template>

<script>
import { HTTP } from "@/axios.js"
export default {
  mounted() {
    this.getUserDataform()
  },
  data() {
    return {
      dataform: [],
      iduserlist: "",
      user: "",
      search: "",
      dataon: "",
      headers: [
        {
          text: "ลำดับ",
          align: "center",
          sortable: false,
          value: "num",
        },
        { text: "รายชื่องานอบรม", value: "nameEvent", align: "center" },
        { text: "วัน/เวลาเริ่มงาน", value: "datetime", align: "center" },
        { text: "E-mail Admin", value: "emailOwner", align: "center" },
        { text: "", value: "action", sortable: false, align: "center" },
      ],
      deletename: "",
    }
  },
  methods: {
    async getUserDataform() {
      await HTTP.get("/eventlist-show")
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.dataform = res.data
          }
          return
        })
        .catch((e) => {
          console.log(e)
        })
    },

    async deleteUser(datauser) {
      console.log("id", datauser._id)
      let obj = { _id: datauser._id }
      await HTTP.delete(`/eventlist-delete`, {
        data: obj,
      })
        .then((res) => {
          console.log(res)
          this.getUserDataform()
        })
        .catch((e) => {
          console.log(e)
        })
    },

    onData(dataon) {
      this.dataon = dataon
    },

    checkuserlist(iduserlist) {
      this.$emit("parentfunction", iduserlist)
      this.$router.push("chackmember/" + iduserlist._id)
    },

    deletelistevent(user) {
      this.$bvModal.show("modal-1")
      this.deletename = user
    },

    openedit(user) {
      this.$bvModal.show("my-modal")
      this.deletename = user
    },

    setdatetime(set) {
      var settime = moment(set).format("DD/MM/YYYY HH:mm")
      return settime
    },

    submitevent() {
      this.$swal({
        title: "ผลการลงทะเบียนงานอบรม",
        text: "ลงทะเบียนงานอบรมสำเร็จ",
        button: "Close",
        icon: "success",
      })
    },
  },
}
</script>
