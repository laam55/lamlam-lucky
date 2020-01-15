// Spin
var force = 0;
var angle = 0;
var inertia = 0.985;
var minForce = 15;
var randForce = 15;
var rouletteElem = document.getElementsByClassName('roulette_wheel')[0];
var scoreElem = document.getElementById('score');
var result = null

// draw wheel
var element_wrap = document.getElementById('wheel-lucky');
// console.log('clientHeight', element_wrap.clientHeight)
var heightWidth = element_wrap.clientHeight
var padding = {top: 20, right: 20, bottom: 20, left: 20},
    w = heightWidth - padding.left - padding.right,
    h = heightWidth - padding.top  - padding.bottom,
    r = Math.min(w, h)/2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20();

// list image data
var data = [
    {"label":"Dell LAPTOP", "value":1, "imageLink":"https://www.pikpng.com/pngl/m/30-306273_pixel-heart-png-download-20-x-20-pixel.png"},
    {"label":"IMAC PRO", "value":1, "imageLink":"https://images-na.ssl-images-amazon.com/images/I/51V8ObWrpKL._AC_SX569_.jpg"}, //font-family
    {"label":"SUZUKI", "value":1, "imageLink":"https://www.pikpng.com/pngl/m/30-306273_pixel-heart-png-download-20-x-20-pixel.png"}, //color
    {"label":"HONDA", "value":1, "imageLink":"https://images-na.ssl-images-amazon.com/images/I/51V8ObWrpKL._AC_SX569_.jpg"}, //font-weight
    {"label":"FERRARI", "value":1, "imageLink":"https://www.pikpng.com/pngl/m/30-306273_pixel-heart-png-download-20-x-20-pixel.png"}, //font-size
    {"label":"APARTMENT", "value":1, "imageLink":"https://images-na.ssl-images-amazon.com/images/I/51V8ObWrpKL._AC_SX569_.jpg"}, //background-color
    {"label":"IPAD PRO", "value":1, "imageLink":"https://www.pikpng.com/pngl/m/30-306273_pixel-heart-png-download-20-x-20-pixel.png"}, //nesting
    {"label":"LAND", "value":1, "imageLink":"https://images-na.ssl-images-amazon.com/images/I/51V8ObWrpKL._AC_SX569_.jpg"}, //bottom
];
var init_rotate = 360 / data.length
var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width",  w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);
var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
var vis = container
    .append("g");
    
var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");
    
arcs.append("path").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + init_rotate + ")";
    })
    .attr("fill", function(d, i){ return color(i); })
    .attr("d", function (d) { return arc(d); });

// Them text cho Wheel
arcs.append("text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
    })
    .attr("text-anchor", "end")
    .text( function(d, i) {
        return data[i].label;
    });

// Them anh cho Wheel
arcs.append("svg:image")
    .attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90 + init_rotate) + ")translate(" + (d.outerRadius - 30) +")";
    })
    .attr('x', -init_rotate)
    .attr('y', -init_rotate)
    .attr('width', 80)
    .attr('height', 80)
    .attr("xlink:href", function(d, i){
        return d.data.imageLink
    })
    // .attr("xlink:href", "https://www.pikpng.com/pngl/m/30-306273_pixel-heart-png-download-20-x-20-pixel.png")
