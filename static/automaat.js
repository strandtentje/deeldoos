var results = $("#results ul");

$("a.sort").each(function() {
	var button = $(this);
	var isintsort = button.hasClass("int");

	button.click(function() {
		var columnname = button.attr("id");
		var classname = ".column." + columnname;
		var counter = 0;

		$("li", results).sort(function(left, right) {
			var leftvalue = $(classname, left).text();
			var rightvalue = $(classname, right).text();

			if (isintsort) {
				leftvalue = parseInt(leftvalue);
				rightvalue = parseInt(rightvalue);

				return leftvalue > rightvalue;
			}

			return leftvalue.localeCompare(rightvalue);
		}).each(function() {
			counter++;
			var item = $(this);
			item.remove();
			item.appendTo(results);
		});

		$("#sorteditems").text("" + counter + " items")
	});
});

var currentclass = ""

$("a.view").click(function() {
	var id = $(this).attr("id");
	$("#results .viewswitch").remove();
	$("#results").prepend('<span class="viewswitch ' + id + '"></span>');
});