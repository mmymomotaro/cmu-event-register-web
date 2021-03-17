import { jsPDF } from "jspdf"
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('THSarabunNew-normal.ttf', font);
this.addFont('THSarabunNew-normal.ttf', 'THSarabunNew', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
