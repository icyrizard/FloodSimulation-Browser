Ext.define('app.view.Map', {
	extend: "Ext.Map",
	xtype: 'SimulationMap',
	id: 'mapa',

	config: {
		mapOptions : {
			zoom : 12,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			navigationControl: true,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.DEFAULT
			}
		},
	},

	setGlobalMap: function(extmap, map){
		this.globalMap = map;
		this.globalExtMap = extmap;
	},
	
	setCenterMap: function(center){
		this.globalExtMap.setMapCenter({latitude: center[0], longitude: center[1]});
	},

	/* 
	 * options  - list of options, see doc google api
	 */
	alterMapOptions: function(options){
		this.globalExtMap.setMapOptions(options);
	},

	createMarker: function(pos){
        var pos = new google.maps.LatLng(52.3700, 4.89000);
        new google.maps.Marker({
            position: pos,
            icon: 'Google_Maps_Marker.png',
            map: this.globalMap,
            title: 'you'
		});
	},

	/*create overlay*/
	createOverlayImage: function(bounds) {
		var image = 'floodmap1.jpg';
		var imageBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(bounds[2],bounds[3]),
			new google.maps.LatLng(bounds[0],bounds[1]));
		new google.maps.GroundOverlay(image, imageBounds, {map: this.globalMap});
	},

	createOverlayPolygon: function(corners){
		var cornerBounds = [];
		console.log(corners);
		console.log(corners[0].length);
		for (var i = 0; i < corners[0].length - 1; i++) {

			console.log("i: " + i + corners[0][i][0] + "-" + corners[0][i][1]);
			cornerBounds.push(new google.maps.LatLng(corners[0][i][0], corners[0][i][1]));
		}
		console.log(cornerBounds);

		var rectangle = new google.maps.Polygon({
		    paths: cornerBounds,
		    strokeColor: "#FF0000",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#FF0000",
		    fillOpacity: 0.35
		});

		rectangle.setMap(this.globalMap);
	}
});