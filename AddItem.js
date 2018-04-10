
var tags = new Array;
var styles = new Array;
dataBaseRequest(dBase+"items/tagsAndStyles/",function(xhttp){
	tags = JSON.parse(xhttp.responseText).tag;
	styles = JSON.parse(xhttp.responseText).style;
	tags.map(function(tagtagtag){
		var z = document.createElement("OPTION");
		z.setAttribute("value",tagtagtag);
		document.getElementById("tagList").appendChild(z);
	});
	styles.map(function(stylestylestyle){
		var z = document.createElement("OPTION");
		z.setAttribute("value",stylestylestyle);
		document.getElementById("styleList").appendChild(z);
	});
});

function detectTagsAndUpdateTagList(){
	if(document.getElementById("tags").value.slice(-1)==','){
		var currentTags = document.getElementById('selectedTags').value;
		document.getElementById('selectedTags').value=currentTags+(currentTags==''?'':',')+document.getElementById("tags").value.slice(0,-1);
		document.getElementById("tags").value='';
	}
}

function existingTagSelected(){
	document.getElementById("tags").value+=',';
	detectTagsAndUpdateTagList();
}

function submitNewItemForm(){
	var newItem = defaultItem;
	newItem._id=document.getElementById("UUID").value;
	newItem.Name=document.getElementById("name").value;
	newItem.Tags=csvToObj(document.getElementById("selectedTags").value);
	// update tags in dBase
	newItem.Description=document.getElementById("description").value;
	newItem.Date.Expiration=document.getElementById("expDate").value;
	newItem.Date["First Stored"]=new Date();
	newItem.Date["Last Stored"]=new Date();
	newItem.Numbers.Pulled=document.getElementById("addNum").value;
	newItem.Numbers["Full Stock"]=document.getElementById("fullStock").value;
	// associated items
	if(newItem["Associated Items"][0].ID=="7c6d77fafd119835f3a7acfc480274bc"){
		newItem["Associated Items"]=[0].ID=null;
		newItem["Associated Items"]=[0].amount=null;
	}
	newItem["Part Number"]=document.getElementById("partNum").value;
	newItem.Website=document.getElementById("website").value;
	newItem["Data Sheet"]=document.getElementById("datasheet").value;
	newItem.Size.value=document.getElementById("size").value;
	newItem.Size.unit=document.getElementById("sizeUnit").value;
	newItem.Style=document.getElementById("style").value;
	newItem.Status=null;
	//associated projects
	if(newItem["Associated Projects"][0]=="7c6d77fafd119835f3a7acfc480274bc"){
		newItem["Associated Projects"]=[];
	}
	newItem.Category=document.getElementById("category").value;
	newItem.Comments=document.getElementById("comments").value;
	databasePOST(dBase+"items/"+newItem._id,JSON.stringify(newItem),function(res){
		var nothing = res.responseText;
		if(document.getElementById("datasheet").value!=''){
			var revision;
			dataBaseRequest(dBase+"items/"+newItem._id,function(xhttp){
				revision=JSON.parse(xhttp.responseText)._rev;
				downloadFile(document.getElementById("datasheet").value,function(theFile){
					databasePOST(dBase+"items/"+newItem._id+"/datasheet?rev="+revision,theFile,function(){
					})
				});
			});
		};
	});
	if(confirm("Reload page?")){
		location.reload();
	}
}

function associateThisThing(what){
	if(document.getElementById(what=="item"?"itemIDToBeAssociated":"projectToBeAssociated").value!=""){
		// check to see if this id is already associated with this item
		if(JSON.stringify(defaultItem[what=="item"?"Associated Items":"Associated Projects"]).indexOf(document.getElementById(what=="item"?"itemIDToBeAssociated":"projectToBeAssociated").value)!=-1){
			alert("Already associated!!");
			return;
		}

		var name = "name";
		// lookup ID to see if it is in the dBase
		dataBaseRequest(dBase+(what=="item"?"items/":"projects/")+document.getElementById(what=="item"?"itemIDToBeAssociated":"projectToBeAssociated").value,function(xhttp){
			name = (JSON.parse(xhttp.responseText).Name=="")||(JSON.parse(xhttp.responseText).Name==null)?"Name not available":JSON.parse(xhttp.responseText).Name;
			var divRow = document.createElement("div");
			var divCell = document.createElement("div");
			var divCell1 = document.createElement("div");
			var inputText = document.createElement("input");
			inputText.disabled = true;
			inputText.id = document.getElementById(what=="item"?"itemIDToBeAssociated":"projectToBeAssociated").value;
			divRow.className = "divTableRow";
			divCell.className = "divTableCell";
			divCell1.className = "divTableCell";
			divCell1.innerHTML = name;
			divCell.appendChild(inputText);
			divRow.appendChild(divCell);
			divRow.appendChild(divCell1);
			document.getElementById(what=="item"?"associatedItemSubTable":"associatedProjectSubTable").appendChild(divRow);
			document.getElementById(document.getElementById(what=="item"?"itemIDToBeAssociated":"projectToBeAssociated").value).value=document.getElementById(what=="item"?"itemIDToBeAssociated":"projectToBeAssociated").value;
			what=="item"?
			function(){
				var newAssociatedItem = Object.assign({},defaultItem["Associated Items"][0]);
				if(defaultItem["Associated Items"][0].ID=="7c6d77fafd119835f3a7acfc480274bc"){
					defaultItem["Associated Items"]=[];
				}
				newAssociatedItem.ID=document.getElementById("itemIDToBeAssociated").value;
				newAssociatedItem.amount=document.getElementById("itemAmountToBeAssociated").value==""?"1":document.getElementById("itemAmountToBeAssociated").value;
				defaultItem["Associated Items"].push(newAssociatedItem);
				document.getElementById("itemIDToBeAssociated").value = "";
				document.getElementById("itemAmountToBeAssociated").value = "";
			}():
			function(){
				if(defaultItem["Associated Projects"][0]=="7c6d77fafd119835f3a7acfc480274bc"){
					defaultItem["Associated Projects"]=[];
				}
				defaultItem["Associated Projects"].push(document.getElementById("projectToBeAssociated").value);
				document.getElementById("projectToBeAssociated").value = "";
			}();
		},function(){
			alert("ID not found in database.")
		});
	}
}

//  need function that updates all asociated items and projects with this item's ID
//  Need function that updates list of styles and tags with any new ones from this form
