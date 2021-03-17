<template>
  <div>
    <div>
      <v-card class="pa-0 ma-0" elevation="1" tile color="white">
        <v-container grid-list-xs>
          <v-row no-gutters>
            <v-col cols="12" md="12" style="font-size: 1.7rem">
              <v-row no-gutters>
                <v-col cols="12" md="3" class="text-center">
                    ลงทะเบียนงานอบรม
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>

    <div class="container">
      <form ref="anyName" @submit.prevent="submit">
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="ข้อมูลงานอบรม"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label="อีเมลล์เจ้าหน้าที่ :"
              label-for="nested-street"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="email"
                type="email"
                placeholder="email@example.com"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="รายชื่องานอบรม :"
              label-for="nested-city"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-3"
                v-model="eventname"
                placeholder="Application"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Google Form URL :"
              label-for="nested-country"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-5"
                v-model="gform"
                placeholder="URL Google Form "
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Google Sheets URL :"
              label-for="nested-country"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-6"
                v-model="gsheet"
                placeholder="URL Google Sheets (กรุณาเปลี่ยนลิ้งค์ไฟล์เป็นสาธารณะก่อนส่งทุกครั้ง) "
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="วัน/เวลาเริ่มงาน :"
              label-for="nested-country"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-button class="bts" variant="outline-secondary"
                ><datetime
                  type="datetime"
                  v-model="datetime"
                  value-zone="Asia/Bangkok"
                ></datetime
              ></b-button>
              <v-checkbox
                v-model="checkbox"
                :label="`ต้องการส่ง QR CODE ให้ผู้เข้าร่วมงานอบรม`"
              ></v-checkbox>
              <v-btn color="success" class="mr-4" type="submit">
                submit
              </v-btn>
              <v-btn type="reset" color="error" class="mr-4" @click="Clear">
                Reset Form
              </v-btn>
            </b-form-group>
          </b-form-group>
        </b-card>
      </form>
      <b-modal
        id="modal-1"
        title="ผลการลงทะเบียนงานอบรม"
        body-text-variant="success"
      >
        <center>
          <h1>ลงทะเบียนงานอบรมสำเร็จ</h1>
          <img src="@/assets/success-icon100px.png" />
        </center>
      </b-modal>
    </div>
  </div>
</template>

<script langauge="javascript">
import { HTTP } from "@/axios.js"
import moment from "moment"

export default {
  name: "app",
  components: {},

  data() {
    return {
      customer: [],
      useradmin: "",
      email: "",
      eventname: "",
      eventid: "",
      gsheet: "",
      gform: "",
      massages: [],
      date: "",
      datetime: "",
      googleform: "",
      dataform: [],
      checkbox: true,
      resId: "",
    }
  },

  methods: {
    async addCustomer() {
      let obj = {
        emailOwner: this.dataform.email,
        nameEvent: this.dataform.eventname,
        eventID: this.dataform.eventid,
        googleformURL: this.dataform.googleform,
        googlesheetID: this.dataform.googlesheet,
        datetime: this.dataform.datetime,
      }
      let res_id = await HTTP.post(`/create-eventlist`, obj)
        .then((res) => {
          console.log("_id", res)
          if (res.data) {
            console.log(res.data)
          }
          return res.data
        })
        .catch((e) => {
          console.log(e)
        })
      console.log("ตรวจสอบ", res_id)
      return res_id
    },

    async sendmail(idRes) {
      await HTTP.get(`/tocanvas?eventid=${idRes}`)
        .then((res) => {
          if (res.data) {
            console.log("ส่งเมลแล้ว", res.data)
          }
          return
        })
        .catch((e) => {
          console.log(e)
        })
    },

    Clear() {
      this.username = "", this.email = "", this.lastname = ""
    },

    reset() {
      this.$refs.form.reset()
    },

    submit: async function() {
        console.log("this.dataform.datetime",this.datetime)
      let data = {
        eventname: this.eventname,
        eventid: this.eventid,
        email: this.email,
        googlesheet: this.partscut(this.gsheet),
        googleform: this.gform,
        datetime: this.myFunctiondate(this.datetime),
        checkbox: this.checkbox,
      }
      this.dataform = data
      let _idMail = await this.addCustomer()
      if (this.checkbox == true) {
        this.sendmail(_idMail)
      }
      this.submitevent()
      this.$refs.anyName.reset()
    },

    partscut(formurl) {
      var parts = formurl
        .split("/")
        .filter((e) => e)
        .slice(-2)
      return parts[0]
    },

    myFunctiondate(subdate) {
      var res = subdate.substring(0, 16)

      return res
    },
    setdatetime(set) {
      var settime = moment(set).format("DD/MM/YYYY HH:mm")
      return settime
    },
    submitevent() {
      this.$swal({
        title: "ผลการลงทะเบียนงานอบรม",
        text: "ลงทะเบียนงานอบรมสำเร็จ",
        confirmButtonText: '<a href="/listevent">OK</a>',
        confirmButtonColor: "#8CD4F5",
        icon: "success",
      })
    },
  },
}
</script>

<style scoped>
.bts {
  outline-color: rgb(107, 104, 104);
  background-color: rgb(255, 255, 255);
  border-color: rgb(219, 216, 216);
}
</style>
