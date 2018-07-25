//index.js

window.SquidStuff = {};

var relativePathToLogFile = "squid_stuff/squid_access.log";

/*function populateTable() {

    var tableContent = '';

    $.get(relativePathToLogFile, function( data ) {
    	SquidStuff.allRawLogTextLineByLine = data.split('\n');
	    $.each(SquidStuff.allRawLogTextLineByLine,function(key,value){
	        tableContent += '<tr>';
	        tableContent += '<td>' + value + '</td>';
	        tableContent += '</tr>';
	    });
        $('#tabledive').html(tableContent);
    });
};*/

function populateTable() {
	var tableHTMLUpperHalf = `<div class="table-responsive">
						<table class="table table-striped">
						  <thead>
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">First</th>
						      <th scope="col">Last</th>
						      <th scope="col">Handle</th>
						      <th scope="col">Handle</th>
						      <th scope="col">Handle</th>
						    </tr>
						  </thead>
						  <tbody>`
    var tableContent = '';
    var tableHTMLBottomHalf = `</tbody>
						</table>
					</div>`

    $.get(relativePathToLogFile, function( data ) {
    	SquidStuff.allRawLogTextLineByLine = data.split('\n');
	    $.each(SquidStuff.allRawLogTextLineByLine,function(key,value){
	        tableContent += `<tr>
						      <th scope="row">1</th>
						      <td>Mark</td>
						      <td>Otto</td>
						      <td>@mdo</td>
						    </tr>`
	    });
        $('#tablediv').html(tableHTMLUpperHalf+tableContent+tableHTMLBottomHalf);
    });
};

window.onload = function() {
	populateTable();
};