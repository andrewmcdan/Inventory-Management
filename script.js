var defaultItem = JSON.parse('{"_id":"123","Name":"deafult","Tags":["tag1","tag2"],"Description":"Enter a description of the item","Date":{"First Stored":"1995-12-17T03:24:00","Last Stored":"2018-04-05T22:09:00","Expiration":"2099-01-01T00:00:00"},"Numbers":{"Stored":0,"Pulled":0,"Full Stock":1},"Associated Items":[{"ID":"7c6d77fafd119835f3a7acfc480274bc","amount":0}],"Part Number":"LM7085CT","Website":"https://www.mouser.com/ProductDetail/ON-Semiconductor-Fairchild/LM7805CT?qs=cnIeywgme7bzmZ37%2FiFT9w%3D%3D","Data Sheet":"http://www.onsemi.com/pub/Collateral/MC7800-D.PDF","Size":{"value":null,"unit":null},"Style":"PTH (pin through hole)","Status":null,"Associated Projects":["7c6d77fafd119835f3a7acfc480274bc"],"Category":"components"}');
var username = prompt("Username:");
var password = prompt("Password:");

var dBase = "http://192.168.1.200:5984/";

function updateUUID(xhttp) {
	document.getElementById("UUID").disabled = true;
	document.getElementById("UUID").value = JSON.parse(xhttp.responseText).uuids[0];
}

function dataBaseRequest(url, cFunctionSuccess, cFunctionFailure,data){
	var xhttp;
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			cFunctionSuccess(data==null?this:this,data);
		}else if(this.readyState == 4 && this.status == 404 && cFunctionFailure!=null){
			cFunctionFailure(data==null?this:this,data);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function databasePOST(url, data, cFunction) {
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4/* && this.status == 201*/) {
			cFunction(this);
		}
	};
	xhttp.open("PUT",url,true,username,password);
	xhttp.send(data);
}

function csvToObj(csv){
	var tag_s = csv.split(",");
	var result = [];
	tag_s.map(function(tagTag){
		result.push(tagTag.trim());
	})
	return result // JavaScript object
}

function downloadFile(url, success) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = "blob";
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (success) success(xhr.response);
		}
	};
	xhr.send(null);
}
