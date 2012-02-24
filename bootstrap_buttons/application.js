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
		highhex = hsl2Hex(hue, saturation, highlight),
		lowhex = hsl2Hex(hue, saturation, lowlight),
		text = getTextColor(lightness, delta),
		css = generateHSLGradient(hsl, gradientTop, gradientBottom, borderBottom, text, highhex, lowhex),
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

function generateHSLGradient(hsl, highlight, lowlight, superLowlight, text, highhex, lowhex) {
  // return '  background-color: ' + lowlight + ' !important;\n\
  //   background-repeat: repeat-x;\n\
  //   filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="'+highhex+'", endColorStr="'+lowhex+'");\n\
  //   background-image: -khtml-gradient(linear, left top, left bottom, from('+highlight+'), to('+lowlight+'));\n\
  //   background-image: -moz-linear-gradient(top, '+highlight+', '+lowlight+');\n\
  //   background-image: -ms-linear-gradient(top, '+highlight+', '+lowlight+');\n\
  //   background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, '+highlight+'), color-stop(100%, '+lowlight+'));\n\
  //   background-image: -webkit-linear-gradient(top, '+highlight+', '+lowlight+');\n\
  //   background-image: -o-linear-gradient(top, '+highlight+', '+lowlight+');\n\
  //   background-image: linear-gradient('+highlight+', '+lowlight+');\n\
  //   border-color: '+lowlight+' '+lowlight+' '+superLowlight+';\n\
  //   '+text+'\n';
  //  filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="'+highhex+'", endColorStr="'+lowhex+'");\n\ // replaced with hack below
	return '  background-color: ' + lowlight + ' !important;\n\
  background-repeat: repeat-x;\n\
  filter: e(%("progid:DXImageTransform.Microsoft.gradient(startColorstr=\'%d\', endColorstr=\'%d\', GradientType=0)", '+highhex+', '+lowhex+'));\n\
  background-image: -khtml-gradient(linear, left top, left bottom, from('+highhex+'), to('+lowhex+'));\n\
  background-image: -moz-linear-gradient(top, '+highhex+', '+lowhex+');\n\
  background-image: -ms-linear-gradient(top, '+highhex+', '+lowhex+');\n\
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, '+highhex+'), color-stop(100%, '+lowhex+'));\n\
  background-image: -webkit-linear-gradient(top, '+highhex+', '+lowhex+');\n\
  background-image: -o-linear-gradient(top, '+highhex+', '+lowhex+');\n\
  background-image: linear-gradient('+highhex+', '+lowhex+');\n\
  border-color: '+lowhex+' '+lowhex+' '+superLowlight+';\n\
  '+text+'\n';
}

function hsl2Hex(h, s, l) {
  var m1, m2, hue;
  var r, g, b
  s /=100;
  l /= 100;
  if (s == 0)
    r = g = b = (l * 255);
  else {
    if (l <= 0.5)
      m2 = l * (s + 1);
    else
      m2 = l + s - l * s;
    m1 = l * 2 - m2;
    hue = h / 360;
    r = HueToRgb(m1, m2, hue + 1/3);
    g = HueToRgb(m1, m2, hue);
    b = HueToRgb(m1, m2, hue - 1/3);
  }
  return "#"+hexify(r) + hexify(g) + hexify(b);
}

function hexify(i){
  var hex = parseInt(i).toString(16);
  if(hex.length == 1){hex="0"+hex};
  return hex;
}

function HueToRgb(m1, m2, hue) {
  var v;
  if (hue < 0)
    hue += 1;
  else if (hue > 1)
    hue -= 1;
  if (6 * hue < 1)
    v = m1 + (m2 - m1) * hue * 6;
  else if (2 * hue < 1)
    v = m2;
  else if (3 * hue < 2)
    v = m1 + (m2 - m1) * (2/3 - hue) * 6;
  else
    v = m1;
  return 255 * v;
}


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