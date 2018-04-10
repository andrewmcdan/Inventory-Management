function subsections(){
  var num = eval(prompt('How many subsections? ( "rows * cols" is valid and will be evaluated)'));
  for(i=0;i<num;i++){
    newRowDiv = document.createElement("DIV");
    newRowDiv.className = "divTableRow";
    newCellDiv1 = document.createElement("DIV");
    newCellDiv1.className = "divTableCell";
    newCellDiv1.innerHTML = "ID:";
    newCellDiv2 = document.createElement("DIV");
    newCellDiv2.className = "divTableCell";
    newCellDiv2.innerHTML = "<input disabled type='text' id='UUID"+i+"' class='subUUID'>"
    newRowDiv.appendChild(newCellDiv1);
    newRowDiv.appendChild(newCellDiv2);
    document.getElementById("tableBody").appendChild(newRowDiv);
    dataBaseRequest(dBase+"_uuids",function(xhttp,u){
      document.getElementById("UUID"+u).value=JSON.parse(xhttp.responseText).uuids[0];
    },null,i);
    document.getElementById("subSectionButton").disabled = true;
    // add to array of ID's
  }
}

function dimensions(){

}
