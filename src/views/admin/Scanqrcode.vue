<template>
  <div>
    <v-container grid-list-xs>
      <v-card-title>
        รายชื่อผู้เข้าร่วมงานอบรม
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card class="pa-3 mb-3">
        <v-simple-table fixed-header height="auto" id="my-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  ลำดับที่
                </th>
                <th class="text-center">
                  ชื่อผู้ใช้งาน
                </th>
                <th class="text-center">
                  คณะ
                </th>
                <th class="text-center">
                  E-mail
                </th>
                <th class="text-center">
                  วัน/เวลาที่ร่วมงาน
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in customer" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">
                  {{ user.prefix }} {{ user.name }} {{ user.lastname }}
                </td>
                <td class="text-center">{{ user.major }}</td>
                <td class="text-center">{{ user.email }}</td>
                <td class="text-center">{{ user.comingtime }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <p>ผู้รับผิดชอบ {{ responsible }}</p>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-container>
    <v-container grid-list-xs>
      <v-btn color="blue-grey" class="ma-2 white--text" @click="ExportEx()">
        export Excel
        <v-icon right dark>
          mdi-cloud-download
        </v-icon>
      </v-btn>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2 white--text"
            color="blue-grey"
            dark
            v-bind="attrs"
            v-on="on"
          >
            export pdf
            <v-icon right dark>
              mdi-cloud-download
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">กรอกชื่อผู้รับรอง</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="Prefix"
                    label="คำนำหน้า"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="fname"
                    label="ชื่อ"
                    hint=""
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="lname"
                    label="นามสกุล"
                    hint=""
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click=";(dialog = false), resetdialog()"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="(dialog = false),(responsible = Prefix + ' ' + fname + ' ' + lname),(dialog2 = !dialog2)"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="500px">
        <v-card>
          <v-card-title>
            ต้องการ Export flie PDF ใช่หรือไม่?
          </v-card-title>
          <v-card-text> </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog2 = false">
              Close
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="(dialog2 = false), createPDF()"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script langauge="javascript">
import { HTTP } from "@/axios.js"
import XLSX from "xlsx"
import jsPDF from "jspdf"
import "@/assets/fonts/THSarabun-normal.js"
export default {
  props: {
    senddata: String,
  },
  name: "app",
  components: {},
  computed: {},

  mounted() {
    this.getUserData()
    this.getonData()
    this.id = setInterval(() => {
      this.getUserData()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.id)
  },
  data() {
    return {
      email: "",
      username: "",
      lastname: "",
      massages: [],
      date: "",
      customer: [],
      users: [],
      eventid: this.$route.params.id,
      dialog: false,
      dialog2: false,
      responsible: "",
      Ondata: [],
    }
  },
  methods: {

    async getUserData() {
      await HTTP.get("/userslist-show")
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            let param = this.$route.params.id
            let duplicateUser = false
            console.log("duplicateUser", duplicateUser)
            res.data.forEach((v) => {
              duplicateUser = false
              if (v.eventid === param && v.status != "not available") {
                for (var i = 0; i < this.customer.length; i++) {
                  if (this.customer[i]._id === v._id) {
                    duplicateUser = true
                    return 0
                  }
                }
                this.alertDisplay(v)
                this.customer.push(v)
              }
            })
          }
          return
        })
        .catch((e) => {
          console.log(e)
        })
    },

    async getonData() {
      await HTTP.get("/eventlist-show")
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            let param = this.eventid
            res.data.forEach((v) => {
              if (v._id === param) {
                this.Ondata.push(v)
              }
            })
            return this.Ondata
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },

    createPDF() {
      let nametext = this.responsible
      let nameEv = this.Ondata[0].nameEvent
      console.log("textname = == = ", nameEv)
      var columns = [
        { title: "", dataKey: "prefix" },
        { title: "รายชื่อ", dataKey: "name" },
        { title: "", dataKey: "lastname" },
        { title: "Email", dataKey: "email" },
        { title: "คณะ", dataKey: "major" },
      ]

      var doc = new jsPDF("p", "pt", "a4")
      doc.addFont("THSarabun-normal.ttf", "THSarabun-normal", "normal")
      doc.setFont("THSarabun-normal")
      doc.setFontSize(18)
      doc.autoTable(columns, this.customer, {
        styles: { font: "THSarabun-normal", fontSize: 14 },
      })
      doc.text(
        "รายชื่อผู้เข้าร่วมงานอบรม" + " " + this.Ondata[0].nameEvent,
        80,
        30
      )
      doc.text("ผู้รับผิดชอบ" + " " + nametext, 260, 720)
      doc.text("ลายเซ็น.............................................", 280, 760)
      doc.save(nameEv + ".pdf")
    },

    ExportEx() {
      const dataWS = XLSX.utils.json_to_sheet(this.customer)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb,"รายชื่อผู้เข้าร่วมงาน" + this.Ondata[0].nameEvent + ".xlsx")
    },
    
    alertDisplay(name) {
      this.$swal({
        title: "success",
        text: "ยินดีต้อนรับ " + name.prefix + name.name + " " + name.lastname,
        icon: "success",
        timer: 800,
      })
    },

    resetdialog() {
      this.responsible = ""
      this.fname = ""
      this.lname = ""
      this.Prefix = ""
    },
  }
}
</script>

<style scoped></style>
