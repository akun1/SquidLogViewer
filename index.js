//index.js

window.SquidStuff = {};

var relativePathToLogFile = "squid_stuff/squid_access.log";

function populateTable() {

    var tableContent = '';

    $.get( relativePathToLogFile, function( data ) {

      //this will split the string into array line by line
      SquidStuff.allRawLogTextLineByLine = data.split('\n');
        //here we're itraing the array which you've created and printing the values
        $.each(SquidStuff.allRawLogTextLineByLine , function(key,value){
            tableContent += '<tr>';
            tableContent += '<td>' + value + '</td>';
            tableContent += '</tr>';
        });

        $('#tablediv').html(tableContent);
    });
};

window.onload = function() {
	populateTable();
};