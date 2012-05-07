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

		listeners: {
			maprender: function()
			{
				this.overlayImages = [];
				this.Images = [];
				this.imageIndex = 0;
				this.imageBounds = null;
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
		console.log("setmarker");
        var pos = new google.maps.LatLng(pos[0], pos[1]);
        new google.maps.Marker({
            position: pos,
            icon: 'Google_Maps_Marker.png',
            map: this.globalMap,
            title: 'you'
		});
	},

	/*create overlay*/
	// 'http://sangkil.science.uva.nl:8003/drfsm/199419691/visualization/level/map/600.png'
	// 'http://sangkil.science.uva.nl:8003/drfsm/207/visualization/level/map/300.png' ;
	createOverlayImage: function(bounds, area_id, timesteps) {
		//console.log('createOverlayImage');
		this.imageIndex = 0;
		this.imageBounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(bounds[2],bounds[3]),
				new google.maps.LatLng(bounds[0],bounds[1]));
		
		this.bounds = bounds;
		// delete all other images
		if (this.overlayImages.length > 1)
		{
			this.removeImages();
		}
		//var image = 'http://sangkil.science.uva.nl:8003/lsm/' + area_id +'/visualization/level/map/400.png';	

		for (i in timesteps)
		{
			//if (i > 0 && this.overlayImages.length > 0)
			//	this.overlayImages[i - 1].setMap(null);
			var image = 'http://sangkil.science.uva.nl:8003/drfsm/' + area_id + '/visualization/level/map/' + timesteps[i] + '.png';
			//var overlay = new google.maps.GroundOverlay(image, imageBounds, {map: this.globalMap});
			this.Images.push(image);
		}
		var overlay = new google.maps.GroundOverlay(this.Images[0], this.imageBounds, {map: this.globalMap});
		this.overlayImages.push(overlay);
	},

	nextImage: function()
	{
		var lastImagesIndex = this.imageIndex;
		this.imageIndex += this.imageIndex <= this.Images.length - 2 ? 1 : 0;
		console.log(this.imageIndex);
		if (this.imageIndex != lastImagesIndex)
		{
			if (this.imageIndex >= this.overlayImages.length || this.overlayImages.length == 0)
			{
				var overlay = new google.maps.GroundOverlay(this.Images[this.imageIndex], this.imageBounds, {map: this.globalMap});
				this.overlayImages.push(overlay);
				console.log(this.overlayImages);
				console.log("pushed "+ overlay);
			} else {
				console.log(this.overlayImages);
				this.overlayImages[this.imageIndex].setMap(this.globalMap);
			}

			this.overlayImages[this.imageIndex - 1].setMap(null);
		}
	},

	prevImage: function()
	{
		console.log(this.overlayImages);
		console.log(this.overlayImages[this.imageIndex]);
		console.log(this.imageIndex);
		this.overlayImages[this.imageIndex].setMap(null);
		console.log('removed');
		this.imageIndex -= this.imageIndex > 0 ? 1 : 0;

		if (this.imageIndex >= 0)
		{
			this.overlayImages[this.imageIndex].setMap(this.globalMap);
			console.log(this.overlayImages[this.imageIndex]);
		}
	},

	removeImages: function()
	{
		console.log('removedImages');
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
	}
});