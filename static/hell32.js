var desktop = $("#desktop");

var mousex; var mousey;
var offsetx; var offsety;
var orposx; var orposy;
var movingwindow = "x";
var mode;
var wsx = 32; var wsy = 32;

$(document).mousemove(function(e) {
	mousex = e.pageX;
	mousey = e.pageY;
})

$(document).mouseup(function(e) {
	movingwindow = "x";
	desktop.removeClass("dragging");
});

function initiatedrag(hwnd, x, y) {
	offsetx = mousex;
	offsety = mousey;
	orposx = x;
	orposy = y;

	movingwindow = hwnd;
}

function clickety(hwnd) {
	var iframewnd = $("iframe", hwnd);

	var activate = function() {
		$(".window.active").removeClass("active");
		hwnd.addClass("active")
	};

	hwnd.css({
		left: wsx += 32,
		top: wsy += 32
	});

	activate();

	hwnd.mousedown(function() {
		activate();
	});

	$(".titlebar", hwnd).mousedown(function(e) {
		activate();

		mode = "d";

		desktop.addClass("dragging");

		initiatedrag(hwnd, 
			parseInt(hwnd.css("left"), 10), 
			parseInt(hwnd.css("top"), 10));

		return false;
	});

	$(".resizer", hwnd).mousedown(function(e) {
		activate();

		mode = "r";

		desktop.addClass("dragging");

		initiatedrag(iframewnd,
			parseInt(iframewnd.css("width"), 10),
			parseInt(iframewnd.css("height"), 10));

		return false;
	});

	$(".titlebar .kruisje", hwnd).click(function() {
		hwnd.responsible.dontdoit = false;
		hwnd.remove();
	});
}

$(".window").each(function() {
	var hwnd = $(this);

	clickety(hwnd);
});

$("a.runnable").click(function() {
	if (this.dontdoit) {
		return false;
	}

	var barelink = $(this).attr("href");
	var link = "/window" + barelink;
	var response;

	$.ajax({ type: "GET",   
	     url: link,   
	     async: false,
	     success : function(text)
	     {
	         response = text;
	     }
	});

	var added = $(response);
	var iframe = $("iframe", added);

	iframe.on('load', function() {
		$(".caption", added).html(this.contentDocument.title);	
	});

	if ($(this).hasClass("single")) {
		added.responsible = this;
		this.dontdoit = true;
	}	

	desktop.append(added);

	if ($(this).hasClass("notwide")) {
		iframe.css("width", "300px");
	}

	clickety($("#desktop .window:last-child"));

 	return false;
});

setInterval(function() {
	if (movingwindow != "x") {
		var l = (orposx + (mousex - offsetx));
		var t = (orposy + (mousey - offsety));


		if (mode == "d") {
			movingwindow.css({
				left: l + "px",
				top: t + "px"
			});	
		} else if (mode == "r") {
			movingwindow.css({
				width: l + "px",
				height: t + "px"
			});	
		}		
	}
}, 50);