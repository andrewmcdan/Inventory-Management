<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inventory Management</title>
</head>
<body>
  <div class="wrapper">
    <div class="left">
      <a href="AddItem.html" target="theIframe">Add item to database</a></br>
      <a href="ModItem.html" target="theIframe">Modify an existing item</a></br>
      <a href="AddProj.html" target="theIframe">Add a project to database</a></br>
      <a href="ModProj.html" target="theIframe">Modify an existing project</a></br>
      <a href="AddBin.html" target="theIframe">Add a storage bin</a></br>
      <a href="ModBin.html" target="theIframe">Modify a storage bin</a></br>
      <a href="AddLoc.html" target="theIframe">Add a storage location</a></br>
      <a href="ModLoc.html" target="theIframe">Modify a storage location</a></br>
      <a href="ItemList.html" target="theIframe">View a list of items</a></br>
      <a href="BinList.html" target="theIframe">View a list of bins</a></br>
      <a href="LocList.html" target="theIframe">View a list of storage locations</a></br>
      <a href="ProjList.html" target="theIframe">View a list of projects</a></br>
      <a href="ExpItem.html" target="theIframe">View a list of expired (-ing) items</a></br>
      <a href="LowStock.html" target="theIframe">View a list of low stock items</a></br>
      <a href="RetrItem.html" target="theIframe">Retrieve an item</a></br>
      <a href="RetrBin.html" target="theIframe">Retrieve a bin</a></br>
  </div>
    <div class="right">
      <iframe name="theIframe"></iframe>
    </div>
  </div>
</body>


<style type='text/css'>
body {
  padding: 0px;
  margin: 0px;
  font-size: 120%;
  background-color: #e7e7de;
  height:100%;
  --total-height: 100vh;
}
.wrapper{
  margin: 0px auto;
  width: 100%;
  background-color: #cccccc;
  height: var(--total-height);
}
.left{
  float: left;
  margin-right: 6px;
  width: 25%;
  background-color: #eee;
  height: var(--total-height);
}
.right{
  float: right;
  width: calc(75% - 6px);
  background-color: #eee;
  height: var(--total-height);
}

iframe{
  border:none;
  width:100%;
  height:100%;
}

a{
  text-decoration: none;
}

</style>
<script src="script.js"></script>
</html>
