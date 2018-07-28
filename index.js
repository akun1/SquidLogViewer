//index.js

window.SquidStuff = {};
SquidStuff.TableOfLogs = [];

var relativePathToLogFile = "squid_stuff/squid_access.log";
var IPWhiteList = ["128.107.241.168","128.107.241.167","47.187.198.151"];
var publicLocationAPIKey = 'b95dfbf3cf9cb7a8bac9aed6c7abbfbb';
var publicMapBoxAPIKey = 'pk.eyJ1IjoiY2hyaWRkeXAiLCJhIjoiY2lxMnVvdm5iMDA4dnhsbTQ5aHJzcGs0MyJ9.X9o_rzNLNesDxdra4neC_A';

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

function populateInfoBar() {
	$('#IPInfo').append("Unique & Unknown IP's: <span class='badge badge-info'>" + getNotWhitelistedIPs(getUniqueIPs()).length + "</span>");
	$('#LogInfo').append("Total Logs: <span class='badge badge-info'>" + Number(getTotalNumOfLogs()-Number(1)) + "</span>");
}

function populateTable() {
	//time elapsed remotehost code/status bytes method URL rfc931 peerstatus/peerhost type
	var tableHTMLUpperHalf = `<div class="table-responsive">
						<table class="table table-hover" id="logtable">
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

    $.get(relativePathToLogFile, function(data) {
    	SquidStuff.allRawLogTextLineByLine = data.split('\n').reverse();
	    $.each(SquidStuff.allRawLogTextLineByLine, function(key,value) {
	        tableContent += `<tr><th scope="row">`+ key +`</th>`;
	    	var eachColInLine = value.replace(/\s+/g,' ').trim().split(' ');
	    	$.each(eachColInLine, function(key, value) {
	    		if(typeof SquidStuff.TableOfLogs[key] === 'undefined') {
				    SquidStuff.TableOfLogs.push([value]);
				}
				else {
				    SquidStuff.TableOfLogs[key].push(value);
				}

	    		if(key == 0) {
	    			tableContent += `<td>`+ value +` <span class="badge badge-secondary">`+ timeConverter(value) +`</span></td>`;
	    		}
	    		else if(key == 2) {
	    			if(IPWhiteList.includes(value)) {
	    				tableContent += `<td><a data-toggle="modal" data-target="#exampleModalCenter" onClick="populateIPInfoPopup(\'`+ value +`\')">`+ value +`</a> <span class="badge badge-success">Whitelisted</span></td>`;
	    			}
	    			else {
	    				tableContent += `<td><a data-toggle="modal" data-target="#exampleModalCenter" onClick="populateIPInfoPopup(\'`+ value +`\')">`+ value +`</a> <span class="badge badge-danger">Unknown</span></td>`;
	    			}
	    		}
	    		else {
	    			tableContent += `<td>`+ value +` </td>`;
	    		}
	    	});
	    	tableContent += `</tr>`;
	    });

        $('#tablediv').html(tableHTMLUpperHalf+tableContent+tableHTMLBottomHalf);
	    populateInfoBar();
	    deleteFirstRow("logtable");
	    $('#logtable').DataTable();
    });
};


function getIPDetails(ip)
{
	var url = 'http://api.ipstack.com/' + ip + '?access_key=' + publicLocationAPIKey; 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function populateIPInfoPopup(ip) {
	//$('#main-content-area').append(getIPDetails(ip));
	var ipDetailsJSON = JSON.parse(getIPDetails(ip));
	var modalHeight = $('#ipmap').height();
	var mq = window.matchMedia( "(max-width: 576px)" );
	if (mq.matches) {
	    var modalWidth = 300;
	}
	else {
	    var modalWidth = 900;
	}

	var data = [{
	  type:'scattermapbox',
	  lat:[ipDetailsJSON.latitude],
	  lon:[ipDetailsJSON.longitude],
	  mode:'markers',
	  marker: {
	    size:5,
	    color: 'red'
	  },
	  text:[ipDetailsJSON.ip]
	}]

	layout = {
	  autosize: false,
	  width: modalWidth,
	  height: modalHeight,
      mapbox: {
        center: {
          lat: 38.03697222,
          lon: -90.70916722
        },
        style: 'dark',
        zoom: 0
      },
      margin: {
        r: 0,
        t: 0,
        b: 0,
        l: 0,
        pad: 0
      },
      paper_bgcolor: '#191A1A',
      plot_bgcolor: '#191A1A',
      showlegend: false
   };

	Plotly.setPlotConfig({
	  mapboxAccessToken: publicMapBoxAPIKey
	})

	Plotly.newPlot('ipmap', data, layout);
}

function deleteFirstRow(tableID) {
    var table = document.getElementById(tableID);
    table.deleteRow(1);
}

function getNotWhitelistedIPs(ips) {
	var notWhitelistedIPs = [];
	for (let ip of ips) {
		if(!(IPWhiteList.includes(ip))) {
			notWhitelistedIPs.push(ip);
		}
	}
	return notWhitelistedIPs;
}

function getUniqueIPs() {
	return [...new Set(SquidStuff.TableOfLogs[2])];
}

function getTotalNumOfLogs() {
	return SquidStuff.TableOfLogs[0].length;
}

window.onload = function() {
	populateTable();

	/*var data = [{
    type: 'scattergeo',
    lon: [100, 200],
    lat: [0, 0],
    mode: 'markers',
    marker: {
        size: [20, 20],
        color: [10, 20],
        cmin: 0,
        cmax: 50,
        colorscale: 'Greens',
        line: {
            color: 'black',
        }
    },
    name: 'IP Location'
	}];

	var layout = {
		'autosize': true,
	  	'margin': {
		    'l': 0,
		    'r': 0,
		    'b': 0,
		    't': 0,
		    'pad': 0
  	},
  	'paper_bgcolor': '#fff',
  	'plot_bgcolor': '#c7c7c7',
    'geo': {
    		'showframe': false,
            'showcoastlines': false,
    		'projection':{
                  'type': 'robinson'
              },
            'scope': 'world',
            'resolution': 50,
            'showrivers': false,
            'showlakes': true,
            'lakecolor': '#fff',
            'showland': true,
            'landcolor': 'gray',
            'countrycolor': '#d3d3d3',
            'countrywidth': 0.5,
            'subunitcolor': '#d3d3d3'
        }
	};*/
	
};