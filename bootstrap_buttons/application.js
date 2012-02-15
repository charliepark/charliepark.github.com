function refreshSwatch() {
	var hue = $("#hue").slider("value"),
		saturation = $("#saturation").slider("value"),
		lightness = $("#lightness").slider("value"),
		delta = $("#delta").slider("value"),
		highlight = lightness + delta,
		lowlight = lightness - delta,
		superLowlight = lightness - delta * 1.5,
		gradientTop = "hsl("+hue+", "+saturation+"%, "+highlight+"%)",
		gradientBottom = "hsl("+hue+", "+saturation+"%, "+lowlight+"%)",
		borderBottom = "hsl("+hue+", "+saturation+"%, "+superLowlight+"%)",
		hsl = "hsl("+hue+", "+saturation+"%, "+lightness+"%)",
		text = getTextColor(lightness, delta),
		css = generateHSLGradient(hsl, gradientTop, gradientBottom, borderBottom, text),
		embeddedCss = ".btn-custom {\n"+css+"}";
		$("button.custom").not('.sample').attr('style', css);
		$(".ui-slider-range").css("background", hsl);
		$('#embedded_css').html(embeddedCss);
		$('.ui-slider-handle').each(function(){
			var v = $(this).parents('div').slider("value");
			var i = $(this).parents('div').attr('id');
			$("#"+i+"_value").text(v);
		});
}

function getTextColor(lightness, puffiness){
	if(parseInt(lightness) < 50){
		return "color: #fff !important;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0."+shadowAlpha(puffiness)+");\n  -webkit-font-smoothing: antialiased;"
	} else {
		return "color: #333 !important;\n  text-shadow: 0 1px 1px rgba(255, 255, 255, 0."+shadowAlpha(puffiness)+");\n  -webkit-font-smoothing: antialiased;"
	};
}

function shadowAlpha(puffiness){
	var a = parseInt(3.3*puffiness);
	if(a<10){a="0"+a};
	return a;
}

function generateHSLGradient(hsl, highlight, lowlight, superLowlight, text) {
	return '  background-color: ' + lowlight + ' !important;\n\
  background-repeat: repeat-x;\n\
  background-image: -khtml-gradient(linear, left top, left bottom, from('+highlight+'), to('+lowlight+'));\n\
  background-image: -moz-linear-gradient(top, '+highlight+', '+lowlight+');\n\
  background-image: -ms-linear-gradient(top, '+highlight+', '+lowlight+');\n\
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, '+highlight+'), color-stop(100%, '+lowlight+'));\n\
  background-image: -webkit-linear-gradient(top, '+highlight+', '+lowlight+');\n\
  background-image: -o-linear-gradient(top, '+highlight+', '+lowlight+');\n\
  background-image: linear-gradient('+highlight+', '+lowlight+');\n\
  border-color: '+lowlight+' '+lowlight+' '+superLowlight+';\n\
  '+text+'\n';
}

// removed from above code: filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="'+highlight+'", endColorStr="'+lowlight+'");\n\


$(function() {
	refreshSwatch();
	$("#hue").slider({
		range: "min",
		max: 360,
		value: 201,
		slide: refreshSwatch,
		change: refreshSwatch
	});
	$("#saturation").slider({
		range: "min",
		max: 100,
		value: 100,
		slide: refreshSwatch,
		change: refreshSwatch
	});
	$("#lightness").slider({
		range: "min",
		max: 100,
		value: 40,
		slide: refreshSwatch,
		change: refreshSwatch
	});
	$("#delta").slider({
		range: "min",
		max: 30,
		value: 10,
		slide: refreshSwatch,
		change: refreshSwatch
	});
	$( "#lightness" ).slider( "value", 40 );
});

$('.sample').click(function(){
	var h = $(this).data('h');
	var s = $(this).data('s');
	var l = $(this).data('l');
	var p = $(this).data('p');
	$("#hue").slider({value: h});
	$("#saturation").slider({value: s});
	$("#lightness").slider({value: l});
	$("#delta").slider({value:p});
})