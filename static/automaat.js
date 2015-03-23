var results = $("#results ul");

function sorty(columnname) {
	$(".sort").removeClass("selected");
	var selected = $("#" + columnname + ".sort");
	selected.addClass("selected");
	var isintsort = selected.hasClass("int");
	var classname = ".column." + columnname;
	var counter = 0;

	$("li", results).sort(function(left, right) {
		var leftvalue = $(classname, left).text();
		var rightvalue = $(classname, right).text();

		if (isintsort) {
			leftvalue = parseInt(leftvalue) || 0;
			rightvalue = parseInt(rightvalue) || 0;

			if (leftvalue > rightvalue)
				return 1;
			if (leftvalue < rightvalue)
				return -1;
			return 0;
		}

		return leftvalue.localeCompare(rightvalue);
	}).each(function() {
		counter++;
		var item = $(this);
		item.remove();
		item.appendTo(results);
	});

	$("#sorteditems").text("" + counter + " items")	
}

function viewy (viewmode) {
	$(".view").removeClass("selected");
	$("#" + viewmode + ".view").addClass("selected");

	$("#results .viewswitch").remove();
	$("#results").prepend('<span class="viewswitch ' + viewmode + '"></span>');
}

$("a.sort").each(function() {
	var button = $(this);
	var kenmerk = button.attr("id");

	button.click(function() {
		sorty(kenmerk);
		$.cookie("sortmode", kenmerk)
	});
});

$("a.view").click(function() {
	var kenmerk = $(this).attr("id");
	viewy(kenmerk);
	$.cookie("viewmode", kenmerk);
});

if ($.cookie("sortmode") !== undefined) 
	sorty($.cookie("sortmode"));

if ($.cookie("viewmode") !== undefined)
	viewy($.cookie("viewmode"));

var mousex; var mousey;
var offsetx; var offsety;
var orposx; var orposy;
var movingwindow = "x";

$(document).mousemove(function(e) {
	mousex = e.pageX;
	mousey = e.pageY;

	if (movingwindow != "x") {
		var l = (orposx + (mousex - offsetx));
		var t = (orposy + (mousey - offsety));

		movingwindow.css({
			left: l + "px",
			top: t + "px"
		});
	}
})

$(document).mouseup(function(e) {
	movingwindow = "x";
});

function clickety(hwnd) {
	$(".titlebar", hwnd).mousedown(function(e) {
		$(".window").removeClass("active");
		hwnd.addClass("active")

		offsetx = mousex;
		offsety = mousey;
		orposx = parseInt(hwnd.css("left"), 10);
		orposy = parseInt(hwnd.css("top"), 10);

		movingwindow = hwnd;
	});
}

$(".window").each(function() {
	var hwnd = $(this);

	clickety(hwnd);
});

$(".navwin").click(function() {
	var nw = $('<div class="window"><div class="vuilehack"><div class="titlebar"><img class="icon" src="/static/folder.png"><span class="caption">Mapje</span><a class="kruisje"><img src="/static/kruisje.png"></a></div><iframe src="/navigate" scrolling="no"></iframe></div></div>');
	nw.appendTo($(".desktop"));
	clickety(nw);

 	return false;
});