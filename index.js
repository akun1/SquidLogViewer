//index.js

window.SquidStuff = {};

var relativePathToLogFile = "squid_stuff/squid_access.log";
var IPWhiteList = ["128.107.241.168","128.107.241.167"];

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function populateTable() {
	//time elapsed remotehost code/status bytes method URL rfc931 peerstatus/peerhost type
	var tableHTMLUpperHalf = `<div class="table-responsive">
						<table class="table table-hover table-fixed">
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

    	SquidStuff.allRawLogTextLineByLine = data.split('\n').reverse();

	    $.each(SquidStuff.allRawLogTextLineByLine, function(key,value) {

	        tableContent += `<tr><th scope="row">`+ key +`</th>`;

	    	var eachColInLine = value.replace(/\s+/g,' ').trim().split(' ');
	    	$.each(eachColInLine, function(key, value) {
	    		if(key == 0) {
	    			tableContent += `<td>`+ timeConverter(value) +`</td>`;
	    		}
	    		else if(key == 2) {
	    			if(IPWhiteList.includes(value)) {
	    				tableContent += `<td>`+ value +`<span class="badge badge-success">Whitelisted</span></td>`;	
	    			}
	    			else {
	    				tableContent += `<td>`+ value +`<span class="badge badge-danger">Unknown</span></td>`;	
	    			}
	    		}
	    		else {
	    			tableContent += `<td>`+ value +`</td>`;
	    		}
	    	});

	    	tableContent += `</tr>`;

	    });

        $('#tablediv').html(tableHTMLUpperHalf+tableContent+tableHTMLBottomHalf);
    });
};

window.onload = function() {
	populateTable();
};