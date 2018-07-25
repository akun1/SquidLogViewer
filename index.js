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
	//time elapsed remotehost code/status bytes method URL rfc931 peerstatus/peerhost type
	var tableHTMLUpperHalf = `<div class="table-responsive">
						<table class="table table-striped">
						  <thead>
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Time</th>
						      <th scope="col">Elapsed</th>
						      <th scope="col">Remote Host IP</th>
						      <th scope="col">Status Code</th>
						      <th scope="col">Bytes</th>
						      <th scope="col">Method</th>
						      <th scope="col">URL</th>
						      <th scope="col">RFC931</th>
						      <th scope="col">Peerstatus</th>
						      <th scope="col">Type</th>
						    </tr>
						  </thead>
						  <tbody>`;
    var tableContent = '';
    var tableHTMLBottomHalf = `</tbody>
						</table>
					</div>`;

    $.get(relativePathToLogFile, function( data ) {

    	SquidStuff.allRawLogTextLineByLine = data.split('\n');

	    $.each(SquidStuff.allRawLogTextLineByLine, function(key,value) {

	        tableContent += `<tr><th scope="row">`+ key +`</th>`;
	       /*if(key < 10) {
	    			alert(value.replace(/\s+/g,' ').trim());
	    		}*/

	    	var eachColInLine = value.replace(/\s+/g,' ').trim().split(' ');
	    	$.each(eachColInLine, function(key, value) {
	    		tableContent += `<td>`+ value +`</td>;`
	    	});

	    	tableContent += `</tr>`

	    });

        $('#tablediv').html(tableHTMLUpperHalf+tableContent+tableHTMLBottomHalf);
    });
};

window.onload = function() {
	populateTable();
};