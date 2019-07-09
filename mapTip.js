var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
        link.id   = 'cssId';
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css';
        link.media = 'all';
        head.appendChild(link);

script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

var regex = new RegExp("[0-9]{2}.[0-9]{6}, -[0-9]{2}.[0-9]{6}"), s;
$('span').filter(function () {
    if( regex.test($(this).text())){
        s = this;
    }
});

$(s).click(function() {
    if ($('#map').length ){
        hideMap() 
    } else {
        $('body').append('<div class="map-tooltip" style="height: 100%; width: 100%; z-index: 2; background: rgba(0,0,0,0.5); position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px;" ><div id="map" style="height: 50%;  width: 50%; top: 25%; left: 25%; z-index: 3; border: 1px solid black;"></div></div>')
        var t = $(s).text(), 
            lat = t.substr(0,8),
            long = t.substr(11,255);
        console.log(lat + ' ' + long);
        initmap(lat, long);
    }
});
var map;

function initmap(lat, long) {
	map = new L.Map('map');
	var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});		
	map.setView(new L.LatLng(lat, long),9);
    map.addLayer(osm);
    L.marker([lat, long]).addTo(map);
}
function hideMap(){
    $('.map-tooltip').remove();
}

$('body').on('click', '.map-tooltip', function () {
    hideMap();
});