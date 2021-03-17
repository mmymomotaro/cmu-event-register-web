<template>
  <div>
    <v-container grid-list-xs>
      <div align="right">
        <v-btn dark large color="primary" @click="scanuserlist(eventid)">
          เริ่มสแกน
          <i class="fas fa-qrcode"></i>
        </v-btn>
      </div>
    </v-container>
    <v-container grid-list-xs>
      <div ref="testHtml2">
        <v-card>
          <v-card-title>
            รายชื่อผู้ลงทะเบียน
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
            :items="customer"
            :search="search"
            item-key="num"
          >
            <template v-slot:[`item.num`]="{ index }">
              {{ index + 1 }}
            </template>

            <template v-slot:[`item.name`]="{ item }">
              {{ item.prefix + " " + item.name + " " + item.lastname }}
            </template>

            <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getstatus(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>

          </v-data-table>
        </v-card>
      </div>
      <br />
      <v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <p>ผู้รับผิดชอบ {{ responsible }}</p>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-container>
    <v-container grid-list-xs>
      <v-btn
        class="ma-2"
        color="success"
        @click="sendmail(eventid), sendmailok()"
      >
        Send mail
      </v-btn>

      <v-btn color="blue-grey" class="ma-2 white--text" @click="onExport()">
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
import "jspdf-autotable"
export default {
  name: "chackmember",
  components: {},
  computed: {},
  mounted() {
    this.getUserData()
    this.getonData()
    //  setInterval(()=>{
    //    this.getUserData()
    //     }, 3000);
  },

  data() {
    return {
      snackbar: false,

      customer: [],
      users: [],
      Ondata: [],
      getdata: "",
      eventid: this.$route.params.id,
      search: "",
      responsible: "",
      dialog: false,
      dialog2: false,
      fname: "",
      lname: "",
      Prefix: "",
      headers: [
        {
          text: "ลำดับรายชื่อ",
          align: "center",
          sortable: false,
          value: "num",
        },
        {
          text: "รายชื่อผู้เข้าร่วมงานอบรม",
          align: "center",
          value: "name",
        },
        { text: "คณะ", align: "center", value: "major" },
        { text: "E-mail", align: "center", value: "email" },
        { text: "สถานะ", align: "center", value: "status" },
        {
          text: "วัน/เวลาลงทะเบียน",
          align: "center",
          value: "timedate",
        },
        {
          text: "เวลาเข้าร่วมงาน",
          value: "comingtime",
          align: "center",
        },
      ],
    }
  },

  methods: {
    async getUserData() {
      this.customer = []
      await HTTP.get("/userslist-show")
        .then((res) => {
          if (res.data) {
            console.log("data", res.data)
            let param = this.eventid
            res.data.forEach((v) => {
              if (v.eventid === param) {
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

    async sendmail(dataeventid) {
      await HTTP.get(`/tocanvas?eventid=${dataeventid}`)
        .then((res) => {
          if (res.data) {
            console.log(res.data)
          }
          return
        })
        .catch((e) => {
          console.log(e)
        })
    },

    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.customer)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb,"รายชื่อผู้ลงทะเบียนงาน" + this.Ondata[0].nameEvent + ".xlsx")
    },

    createPDF() {
      let nametext = this.responsible
      let nameEv = this.Ondata[0].nameEvent
      var columns = [
        { title: "ลำดับ", dataKey: "" },
        { title: "", dataKey: "prefix" },
        { title: "รายชื่อ", dataKey: "name" },
        { title: "", dataKey: "lastname" },
        { title: "คณะ", dataKey: "major" },
        { title: "วัน/เวลาเข้าร่วมงาน", dataKey: "comingtime" },
      ]

      var doc = new jsPDF("p", "pt", "a4")
      doc.addFont("THSarabun-normal.ttf", "THSarabun-normal", "normal")
      doc.setFont("THSarabun-normal")
      doc.setFontSize(16)
      doc.text(
        "รายชื่อผู้เข้าร่วมงานอบรม" + " " + this.Ondata[0].nameEvent,
        80,
        30
      )
      doc.autoTable(columns, this.customer, {
        styles: { font: "THSarabun-normal", fontSize: 14 },
      })
    //   doc.text(
    //     "รายชื่อผู้เข้าร่วมงานอบรม" + " " + this.Ondata[0].nameEvent,
    //     80,
    //     30
    //   )
      doc.text("ผู้รับผิดชอบ" + " " + nametext, 260, 720)
      doc.text("ลายเซ็น.............................................", 280, 760)
      doc.save(nameEv + ".pdf")
    },

    sendmailok() {
      this.$swal({
        title: "success",
        text: "ส่ง QR CODE ให้กับผู้เข้าร่วมงานสำเร็จ",
        icon: "success",
      })
    },

    scanuserlist(iduserlist) {
      this.$router.push({ path: "/Scanqrcode/" + iduserlist })
    },

    getstatus(status) {
      if (status == "not available") return "red"
      else return "green"
    },

    resetdialog() {
      this.responsible = ""
      this.fname = ""
      this.lname = ""
      this.Prefix = ""
    },
  },
}
</script>

<style scoped></style>
