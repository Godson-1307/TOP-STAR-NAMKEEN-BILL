
let items=[

"Aloo Patta",
"Bhavnagri Gathiya",
"Bhajni Thukda",
"Bangali Mix",
"Boondi",
"Bajari Chakli",
"Biscuit",
"Bingo",
"Butter Muruku",
"Bhakarwadi",
"Bhel Mix",
"Chana",
"Channa Dal",
"Culcutta",
"Diet Chiwda",
"Farari Chiwda",
"Finger Chips",
"Golden Mix",
"Jain Chiwda",
"Kachori",
"Kara Sing",
"Kabuli Chana",
"Kolhapuri Mix",
"Mix Farsan",
"Makai",
"Mangaloori",
"Murukku",
"Masala Sing",
"Mung Dal",
"Masur",
"Mini Chakli",
"N Sav",
"Nadiyadi Bhusa",
"Navarathan",
"Noodles",
"Pepper Banana Wafer",
"Poori",
"Papadi",
"Ratlami Sev",
"Sabudana",
"Sp Lasun",
"Spring Chakali",
"Silver Lasun",
"Sev",
"Sev Chakli",
"Surthi",
"Supreme Star",
"Schezwan",
"Sankar Balli",
"Tikka Banana Wafer",
"Tikka Madras",
"Tikka Masur",
"Tikka Ghatiya",
"Tikka Sev",
"Wafer",
"Yellow Banana Wafer"

];

let select;
let sr=1;
let subtotal=0;

window.onload=function(){

/* ITEM DROPDOWN */

select=document.getElementById("item");

select.innerHTML="<option value=''>Select Item</option>";

items.forEach(function(item){

let option=document.createElement("option");

option.value=item;

option.textContent=item;

select.appendChild(option);

});

/* AUTO INVOICE NUMBER */

let invoiceNumber=localStorage.getItem("invoiceNumber");

if(invoiceNumber==null){

invoiceNumber=1;

}else{

invoiceNumber=parseInt(invoiceNumber)+1;

}

localStorage.setItem("invoiceNumber",invoiceNumber);

document.getElementById("invoice").value=
"TSN-"+String(invoiceNumber).padStart(4,'0');

/* TODAY DATE AUTO */

document.getElementById("date").value=
new Date().toISOString().split('T')[0];

};

/* ADD ITEM */

function addItem(){

let item=document.getElementById("item").value;

let rate=parseFloat(document.getElementById("rate").value);

let packets=parseFloat(document.getElementById("packets").value);

let unit=document.getElementById("unit").value;

if(item=="" || isNaN(rate) || isNaN(packets)){

alert("Please fill all fields");

return;

}

if(rate<=0 || packets<=0){

alert("Values must be positive");

return;

}

let amount=rate*packets;

subtotal+=amount;

/* SELECT TABLE */

let targetTable;

let table1Rows=
document.querySelectorAll("#table1 tbody tr").length;

if(table1Rows<15){

targetTable=document.querySelector("#table1 tbody");

}else{

targetTable=document.querySelector("#table2 tbody");

}

/* CREATE ROW */

let row=targetTable.insertRow();

row.innerHTML=
`
<td>${sr}</td>

<td>${item}</td>

<td>
<input type='number'
value='${packets}'
min='1'
style='width:45px'
onchange='updateTotal(this,${rate})'>
</td>

<td>${unit}</td>

<td>${rate}</td>

<td>${Math.round(amount)}</td>

<td class="no-print">
<button onclick='deleteRow(this)'>X</button>
</td>

`;

sr++;

calculateGST();

/* CLEAR INPUTS */

document.getElementById("rate").value="";

document.getElementById("packets").value="";

}

/* DELETE ROW */

function deleteRow(btn){

let row=btn.parentNode.parentNode;

let amount=parseFloat(row.cells[5].innerText);

subtotal-=amount;

row.remove();

calculateGST();

}

/* UPDATE TOTAL */

function updateTotal(input,rate){

let row=input.parentNode.parentNode;

let oldAmount=parseFloat(row.cells[5].innerText);

let newPackets=parseFloat(input.value);

if(newPackets<=0){

alert("Packets must be positive");

input.value=1;

newPackets=1;

}

let newAmount=newPackets*rate;

/* UPDATE SUBTOTAL */

subtotal=subtotal-oldAmount+newAmount;

row.cells[5].innerText=Math.round(newAmount);

calculateGST();

}

/* GST CALCULATION */

function calculateGST(){

let cgst=Math.round(subtotal*0.025);

let sgst=Math.round(subtotal*0.025);

let finalTotal=Math.round(subtotal+cgst+sgst);

document.getElementById("subtotal").innerText=
Math.round(subtotal);

document.getElementById("cgst").innerText=
cgst;

document.getElementById("sgst").innerText=
sgst;

document.getElementById("grand").innerText=
finalTotal;

}

/* PRINT */

function printBill(){

window.print();

}

/* PDF DOWNLOAD */

function downloadPDF(){

const {jsPDF}=window.jspdf;

let doc=new jsPDF();

doc.text("TOP STAR NAMKEEN",20,20);

doc.text(
"Final Total: ₹ "+
document.getElementById("grand").innerText,
20,
40
);

doc.save("TopStarBill.pdf");

}

/* SEARCH ITEMS */

document.addEventListener("DOMContentLoaded",function(){

document.getElementById("searchItem")
.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

select.innerHTML="<option value=''>Select Item</option>";

items.forEach(function(item){

if(item.toLowerCase().includes(value)){

let option=document.createElement("option");

option.value=item;

option.textContent=item;

select.appendChild(option);

}

});

});

});

