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

	createMarker: function(position){
        var pos = new google.maps.LatLng(52.3700,4.89000);
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
		for (i in corners) {
			console.log(corners[i][0], corners[i][1]);
			cornerBounds.push(new google.maps.LatLng(corners[i][0], corners[i][1]));
		}

		new google.maps.LatLng(corners[1][0],corners[1][1]),
				new google.maps.LatLng(corners[2][0],corners[2][1]),
				new google.maps.LatLng(corners[3][0],corners[3][1])

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