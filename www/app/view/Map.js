Ext.define('app.view.Map', {
	extend: "Ext.Map",
	xtype: 'SimulationMap',
	id: 'mapa',

	config: {
		useLoadMask : true,

		mapOptions : {
			zoom : 12,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			navigationControl: true,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.DEFAULT
			}
		},

		listeners: {
			maprender: function()
			{
				this.overlayImages = [];
				this.Images = [];
				this.imageIndex = 0;
				this.imageBounds = null;
				this.play = false;
			}
		}
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

	/*
	 * createMarker: 
     *  sets marker at pos
     * @params: 
     *		pos = [latitude, longitude]
     * 
	 */
	createMarker: function(pos){
        var pos = new google.maps.LatLng(pos[0], pos[1]);
        new google.maps.Marker({
            position: pos,
            icon: 'Google_Maps_Marker.png',
            map: this.globalMap,
            title: 'you'
		});
	},

	
	// 'http://sangkil.science.uva.nl:8003/drfsm/199419691/visualization/level/map/600.png'
	// 'http://sangkil.science.uva.nl:8003/drfsm/207/visualization/level/map/300.png' ;
	/*create overlays with area_id, bounds and timesteps
	 * Bounds: array(4) 
	*/
	createOverlayImage: function(bounds, area_id, timesteps) {
		this.imageIndex = 0;
		this.imageBounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(bounds[2],bounds[3]),
				new google.maps.LatLng(bounds[0],bounds[1]));
		this.bounds = bounds;
		if (this.overlayImages.length > 1)
			this.removeImages();
		//var image = 'http://sangkil.science.uva.nl:8003/lsm/' + area_id +'/visualization/level/map/400.png';	

		for (i in timesteps)
		{
			var image = 'http://sangkil.science.uva.nl:8003/drfsm/' + area_id + '/visualization/level/map/' + timesteps[i] + '.png';
			this.overlayImages.push(new google.maps.GroundOverlay(image, this.imageBounds));
		}
		this.overlayImages[0].setMap(this.globalMap);
	},

	/* set next Image*/
	nextImage: function()
	{
		var lastImagesIndex = this.imageIndex;
		this.imageIndex += this.imageIndex <= this.overlayImages.length - 2 ? 1 : 0;
		if (this.imageIndex != lastImagesIndex)
		{
			this.overlayImages[this.imageIndex].setMap(this.globalMap);
			this.overlayImages[this.imageIndex - 1].setMap(null);
		}
	},

	/*set prev image*/
	prevImage: function()
	{
		this.overlayImages[this.imageIndex].setMap(null);
		this.imageIndex -= this.imageIndex > 0 ? 1 : 0;

		if (this.imageIndex >= 0)
		{
			this.overlayImages[this.imageIndex].setMap(this.globalMap);
		}
	},

	removeImages: function()
	{
		for (i in this.overlayImages)
			this.overlayImages[i].setMap(null);
		this.imageIndex = 0;
		this.overlayImages = [];
		this.Images = [];
	},

	createOverlayPolygon: function(corners){
		var cornerBounds = [];
		for (var i = 0; i < corners[0].length - 1; i++) {
			cornerBounds.push(new google.maps.LatLng(corners[0][i][0], corners[0][i][1]));
		}

		var rectangle = new google.maps.Polygon({
		    paths: cornerBounds,
		    strokeColor: "#FF0000",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#FF0000",
		    fillOpacity: 0.35
		});

		rectangle.setMap(this.globalMap);
	},

	getCurrentImage: function(){
		if (this.overlayImages.length > 0) {
			this.overlayImages[this.imageIndex];
			return this.overlayImages[this.imageIndex].url;
		}	
	},

	getFloodImage: function(test_id, timestep){
		if (timestep)
			return 'http://sangkil.science.uva.nl:8003/drfsm/' + test_id + '/visualization/level/map/' + timestep + '.png';
		else return false;
	}
});