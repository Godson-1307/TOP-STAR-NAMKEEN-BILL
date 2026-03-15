let items=[

"Aloo Patta","Bhavnagri Gathiya","Bhajni Thukda","Bangali Mix","Boondi",
"Bajari Chakli","Biscuit","Bingo","Butter Muruku","Bhakarwadi",
"Bhel Mix","Chana","Channa Dal","Culcutta","Diet Chiwda",
"Farari Chiwda","Finger Chips","Golden Mix","Jain Chiwda",
"Kachori","Kara Sing","Kabuli Chana","Kolhapuri Mix","Mix Farsan",
"Makai","Mangaloori","Murukku","Masala Sing","Mung Dal",
"Masur","Mini Chakli","N Sav","Nadiyadi Bhusa","Navarathan",
"Noodles","Pepper Banana Wafer","Poori","Papadi","Ratlami Sev",
"Sabudana","Sp Lasun","Spring Chakali","Silver Lasun","Sev",
"Sev Chakli","Surthi","Supreme Star","Schezwan","Sankar Balli",
"Tikka Banana Wafer","Tikka Madras","Tikka Masur","Tikka Ghatiya",
"Tikka Sev","Wafer","Yellow Banana Wafer"

];

let select=document.getElementById("item");

items.forEach(i=>{
let option=document.createElement("option");
option.text=i;
option.value=i;
select.appendChild(option);
});

document.getElementById("invoice").value="INV-"+Date.now();

let sr=1;
let total=0;

function addItem(){

let item=document.getElementById("item").value;
let rate=document.getElementById("rate").value;
let packets=document.getElementById("packets").value;
let unit=document.getElementById("unit").value;

if(item==""||rate==""||packets==""){
alert("Fill all fields");
return;
}

let amount=rate*packets;

total+=amount;

let table=document.getElementById("table").getElementsByTagName("tbody")[0];

let row=table.insertRow();

row.insertCell(0).innerHTML=sr++;
row.insertCell(1).innerHTML=item;

row.insertCell(2).innerHTML=`<input type='number' value='${packets}' onchange='updateTotal(this,${rate})'>`;

row.insertCell(3).innerHTML=unit;
row.insertCell(4).innerHTML=rate;
row.insertCell(5).innerHTML=amount;

row.insertCell(6).innerHTML="<button onclick='deleteRow(this)'>X</button>";

document.getElementById("grand").innerText=total;

saveBill();

}

function deleteRow(btn){

let row=btn.parentNode.parentNode;

let amount=row.cells[5].innerHTML;

total-=amount;

row.remove();

document.getElementById("grand").innerText=total;

saveBill();

}

function updateTotal(input,rate){

let packets=input.value;

let row=input.parentNode.parentNode;

let newAmount=packets*rate;

row.cells[5].innerHTML=newAmount;

calculateGrand();

}

function calculateGrand(){

total=0;

let rows=document.querySelectorAll("#table tbody tr");

rows.forEach(r=>{
total+=parseFloat(r.cells[5].innerHTML);
});

document.getElementById("grand").innerText=total;

}

function saveBill(){

localStorage.setItem("lastBill",document.querySelector(".bill").innerHTML);

}

function printBill(){

window.print();

}

function downloadPDF(){

const {jsPDF}=window.jspdf;

let doc=new jsPDF();

doc.text("Top Star Namkeen Bill",20,20);

doc.save("bill.pdf");

}

document.getElementById("searchItem").addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let options=select.options;

for(let i=0;i<options.length;i++){

let txt=options[i].text.toLowerCase();

options[i].style.display=txt.includes(value)?"":"none";

}

});