
var timer;

$(function() {
    $("#command_line").on("click", function() {
    var searchTerm = $("#command_line").val();
		var url = 'http://itunes.apple.com/search?' + parameters;
		$.ajax({
		url: url,
		type: 'GET',
		contentType: "jsonp",
		async: false,
    dataType: "jsonp",
    success: function(data) {
      console.log(data);
        }
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
      data(data);
		});
    });
});


$(document).ready(function() {
	$('#command_line').keyup(function(event) {
			var input = $('#command_line').val();
			input = input.toLowerCase().replace(/\s+/g, '');
			clearTimeout(timer);
		if(input != ''){
			timer = setTimeout("searchSongs()", 400);
		}else {
			clear_all();
		}
	})
	$('#selectType').change(function() {
		clearTimeout(timer);
		if(input != '') timer = setTimeout("searchSongs()", 400);
		else clear_all();
	});
});

function data(data){
  for (var i = 0; i < data.resultsCount; i++) {

  }
}

function searchSongs(){
var select = $('#selectType').val();
var parameters = {
   term: encodeURIComponent($('#command_line').val()),
   country: 'US',
   media: select,
   limit: 26,
   callback: 'itunesSearch'
 };
 var parameters = urlEncode(parameters);
 var url = 'http://itunes.apple.com/search?' + parameters;
 var html = '<script src="' + url + '"><\/script>';
 $('head').append(html);
}

function urlEncode(obj) {
 var save = '';
 for (var key in obj) {
   save += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
 }
 if (save.length > 0) {
   save = save.substr(0, save.length - 1);
 }
 return (save);
}

function itunesSearch(arg){
	var object = arg.results;
	var table = "";
	$('#command_line').addClass('loader');
		for(var i = 0; i < object.length; i++){
			var temp = object[i];
			var obj = {
				artistName: temp.artistName,
				trackName: temp.trackName,
				trackViewUrl: temp.trackViewUrl,
				previewUrl: temp.previewUrl,
				releaseDate: temp.releaseDate,
			}
			object[i] = obj;
			var test = object[i].artistName;

			table += '<tr class="pagination-sm">';
			table += '<td><span class="spacer">[z]</span></td>'.replace('[z]', temp.trackName);
			table += '<td><span class="spacer"><a href="[z]">[x]</a></span></td>'.replace('[z]', temp.trackViewUrl).replace('[x]', temp.artistName);
			table += '<td><span class="spacer">[z]</span></td>'.replace('[z]', getDate(temp.releaseDate));
			table += '<td><span class="spacer"><audio controls preload="none" style="width:480px;">'
			table += '<source src="[z]" type="audio/mp4" /></audio></span></td></tr>'.replace('[z]', temp.previewUrl);
		};

$("#placeholder").append(table);

$('.Title').fadeIn(1000);

$('#command_line').removeClass('loader');
}

function getDate(date){
	var newDate = date.split('T');
	return newDate[0];
}

function clear_all(){
	$('#command_line').val('');
	$('#placeholder').html('');
	$('.spacer').html('');
}