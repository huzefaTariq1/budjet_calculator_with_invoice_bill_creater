import React from "react";

import PDFDocument from "@react-pdf/pdfkit";
import blobStream from "blob-stream";



let a1=[{discription:"abcdee", amount:"12"},
{discription:"sdsudsdsds", amount:"12"},
{discription:"sdsudsdsds", amount:"12"},
{discription:"sdsudsdsds", amount:"12"}


];

//const doc = new PDFDocument();
// Passing size to the constructor
const doc = new PDFDocument({size: 'A4'});

// pipe the document to a blob
const stream = doc.pipe(blobStream());

// add your content to the document here, as usual






doc.fontSize(35).text("Budget Calculator",80,100);

doc.fontSize(18).text('Company Name',400,50)
doc.fontSize(12).text('Xyz company',400,70)
doc.fontSize(12).text('Xyz company',400,85)
doc.fontSize(12).text('Xyz company',400,100)
doc.fontSize(12).text('Xyz company',400,115)


doc.fontSize(20).text('Xyz company',80,170);


//first coulmn
doc.fontSize(11).text('Xyz company',80,210)
doc.fontSize(11).text('Xyz company',80,225)
doc.fontSize(11).text('Xyz company',80,240)
doc.fontSize(11).text('Xyz company',80,255)

//2nd coulmn
doc.fontSize(11).text('Xyz company',240,210)
doc.fontSize(11).text('Xyz company',240,225)
doc.fontSize(11).text('Xyz company',240,240)
doc.fontSize(11).text('Xyz company',240,255)
// 3rd coumn
doc.fontSize(11).text('Xyz company',400,210)
doc.fontSize(11).text('Xyz company',400,225)
doc.fontSize(11).text('Xyz company',400,240)
doc.fontSize(11).text('Xyz company',400,255)




doc.fontSize(15).text('Description',80,300)

doc.fontSize(15).text('Amount',400,300)




let x=80;
let y=350;
for (let i=0;i<a1.length;i++){
    doc.fontSize(10).text(`${a1[i].discription}`, x, y);
    y=y+20
}



let x1=400;
let y1=350;
for (let i=0;i<a1.length;i++){
    doc.fontSize(10).text(`${a1[i].amount}`, x1, y1);
    y1=y1+20
}



doc.fontSize(18).text('Grand Tptal',400,450)














  





// get a blob when you're done
doc.end();

const a = document.createElement("a");
document.body.appendChild(a);
a.style = "display: none";

let blob;

function download() {
  if (!blob) return;
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'test.pdf';
  a.click();
  window.URL.revokeObjectURL(url);
}

stream.on("finish", function() {
  // get a blob you can do whatever you like with
  blob = stream.toBlob("application/pdf");

  // or get a blob URL for display in the browser
  const url = stream.toBlobURL("application/pdf");

});



const App1=()=>{
    return(
<div>

</div>
    )
}

export default App1