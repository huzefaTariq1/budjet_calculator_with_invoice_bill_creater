import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Pdf from "react-to-pdf";


import PDFDocument from "@react-pdf/pdfkit";
import blobStream from "blob-stream";



import './App.css';
import App1 from './app1';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};









//appjs starts here
function App() {


  let item = [

  ]






  //state for holding itmes
  let [itemstate, setitemstate] = useState(item)

  let [inputdes, setinputdes] = useState("")
  let [inputamount, setinputamount] = useState("")
  const [enableButton, setEnable] = useState(false)

  const [globalindex, setGlobalIndex] = useState()




  let [spendamount, setspendAmount] = useState(0)





















//const doc = new PDFDocument();
//Passing size to the constructor
const doc = new PDFDocument({size: 'A4'});

//pipe the document to a blob
const stream = doc.pipe(blobStream());

//add your content to the document here, as usual






doc.fontSize(35).text("Budget Calculator",80,100);

doc.fontSize(18).text('Company Name',400,50)
doc.fontSize(12).text('Xyz company',400,70)
doc.fontSize(12).text('Phone N0:xxxxxxx',400,85)
doc.fontSize(12).text('Email:abc@gmail.com',400,100)
doc.fontSize(12).text('reg no:xxxxxx',400,115)


doc.fontSize(20).text('Invoice',80,170);


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
//3rd coumn
doc.fontSize(11).text('Xyz company',400,210)
doc.fontSize(11).text('Xyz company',400,225)
doc.fontSize(11).text('Xyz company',400,240)
doc.fontSize(11).text('Xyz company',400,255)




doc.fontSize(15).text('Description',80,300)

doc.fontSize(15).text('Amount',400,300)




let x=80;
let y=350;
for (let i=0;i<itemstate.length;i++){
    doc.fontSize(10).text(`${itemstate[i].description}`, x, y);
    y=y+20
}



var x1=400;
var y1=350;
for (let i=0;i<itemstate.length;i++){
    doc.fontSize(10).text(`${itemstate[i].amount}`, x1, y1);
    y1=y1+20
}



doc.fontSize(18).text('Grand Tptal',400,y1+18)

doc.fontSize(18).text(`${spendamount}`,510,y1+18)














  





//get a blob when you're done
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
  //get a blob you can do whatever you like with
  blob = stream.toBlob("application/pdf");

  //or get a blob URL for display in the browser
  const url = stream.toBlobURL("application/pdf");

});



















  // //states for modal
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);






  // for ref

  const ref = React.createRef();

  const amounts = itemstate.map((obj) => {
    return (
      +obj.amount
    )
  })




  const spend = amounts.filter((obj) => obj > 0).reduce((acc, cv) => acc += cv, 0)


  useEffect(() => {
    setspendAmount(spend)
  }, [spend])

  console.log(spend)

  console.log(itemstate)



  //function to add item
  function additem(index) {
    if (isNaN(inputdes) == true) {

      itemstate.push({ description: inputdes, amount: inputamount, id: Math.floor(Math.random() * (100000 - 1) + 1) })
      setinputamount("")
      setinputdes("")
      console.log("ru")
    }
    else { alert("description can't be a number") }




  }


  //function to clear all item
  function clearall() {
    setitemstate([])
    console.log("clear")
  }



  //function for edit
  function edit(index, id) {
    setinputdes((itemstate[index].description));
    setinputamount((itemstate[index].amount));

    setEnable(true)
    console.log(index)



  }





  function updatebuttonfunction() {
    itemstate[globalindex].description = inputdes

    itemstate[globalindex].amount = inputamount
    console.log(itemstate);
    setEnable(false)
  }






  function delete1(index) {

    const filteritem = itemstate.filter((obj, i) => i !== index)
    setitemstate(filteritem)
  }


  return (
    <div >
      <div>
        <h1>Budject Calculator</h1>
        <div className='calultorbox'>
          <div className='inputfields'>
            <div className='inputs'>
              <p>charge</p>
              <input value={inputdes} onChange={(event) => {
                setinputdes(event.target.value)
              }} type={"text"} placeholder='"e.g Rent'></input>
            </div>

            <div className='inputs'>
              <p>
                Amount
              </p>
              <input value={inputamount} onChange={(event) => setinputamount(event.target.value)} type={"number"} placeholder="e.g 400"></input>
            </div>
          </div>



          {enableButton ? <button className='btn12' onClick={() => updatebuttonfunction()}>update</button> : <button className='btn12' onClick={() => additem()} >Submit   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg></button>}


          {/* <button  onClick={()=>additem()} >Submit</button> */}






          {itemstate.length <= 0 ? <h1>No Expesene record Add yet</h1> :

            itemstate.map((obj, index) => {
              return (
                <div>
                  <div className='itemshow' >
                    <p>{obj.description}</p>
                    <p>{obj.amount}</p>
                    <div className='icon'>
                      <button className='i1' onClick={() => { edit(index); setGlobalIndex(index) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                      </svg></button>
                      <button className='i1' onClick={() => delete1(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                      </svg></button>
                    </div>
                  </div>
                </div>
              )
            })


          }












          <button className='btn1' onClick={clearall} > Clear All <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg>
          </button>


           <button style={{marginLeft:"5px",padding:"9px"}} onClick={download}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
  <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
</svg></button>
             
      {/* <button className='btn1' style={{margin:"0 5px"}} onClick={handleOpen}>Get Recepit <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-receipt" viewBox="0 0 16 16">
  <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
  <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
</svg></button> */}


        </div>

        <h1>Total Spend ${spendamount}</h1>
      </div>













    </div >





// )
  )
}

export default App;











// import React from "react";
// import App1 from "./app1";

// const App=()=>{
//   return(
//     <>
//     <App1></App1>
//     </>
//   )
// }
// export default App;