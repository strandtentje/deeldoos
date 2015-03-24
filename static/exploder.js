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
