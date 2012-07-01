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
				this.testId = 0;
				this.areaId = 0;
				this.listener_ref = null;
				this.marker_listener = null;
			}
		}
	},

	getReference: function(){
		return this.globalMap;
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
    /*  sets marker at pos
     * @params: 
     *		pos = [latitude, longitude]
     * 
	 */
	createMarker: function(pos, options){
		map = this.globalExtMap;
        var pos = new google.maps.LatLng(pos[0], pos[1]);
        if (options != null){
        	icon = options['icon'] || 'resources/images/Google_Maps_Marker.png';
        	draggable = options['draggable'] || false;
        	raiseOnDrag = options['raiseOnDrag'] || false;
    	}
    	else {
    		icon = 'resources/images/Google_Maps_Marker.png';
    		draggable = false;
    		raiseOnDrag = false;
    	}

        marker = new google.maps.Marker({
            position: pos,
            icon: icon,
            map: this.globalMap,
            title: 'you',
      		raiseOnDrag: true,
            draggable: draggable,

		});
		if (this.marker_listener != null)
			google.maps.event.removeListener(this.marker_listener);

		this.marker_listener = google.maps.event.addListener(marker, 'dragend', function(event){
			map.fireEvent('dragend', event);
		});
		return marker;
	},

	// 'http://sangkil.science.uva.nl:8003/drfsm/199419691/visualization/level/map/600.png'
	// 'http://sangkil.science.uva.nl:8003/drfsm/207/visualization/level/map/300.png' ;
	/*create overlays with area_id, bounds and timesteps
	 * Bounds: array(4) 
	*/
	createOverlayImage: function(bounds, area_id, timesteps, simulationType) {
		var me = this;
		var url = '';
		if (simulationType == 'Flood')
		{
			url = 'http://sangkil.science.uva.nl:8003/drfsm/' + area_id + '/visualization/level/map/';
		}
		else if (simulationType == 'Lsm')
		{
			url = 'http://sangkil.science.uva.nl:8003/lsm/' + area_id + '/visualization/paru/map/';
		}
		else return false;
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
			//var image = 'http://sangkil.science.uva.nl:8003/drfsm/' + area_id + '/visualization/level/map/' + timesteps[i] + '.png';
			var image = new Image();
			image.src = url + timesteps[i] + '.png';
			console.log(image.src);
			this.overlayImages.push(new google.maps.GroundOverlay(image.src, this.imageBounds));
		}

		this.overlayImages[0].setMap(this.globalMap);
		this.imageIndex = this.overlayImages.length;

		/*remove clickevent and add to new image*/
		if (this.listeners_ref != null)
			google.maps.event.removeListener(this.listeners_ref);

		this.listeners_ref = google.maps.event.addListener(this.overlayImages[0], 'click', function(event){
			me.fireEvent('gotClick', event);
		});
	},

	/* set next Image*/
	nextImage: function()
	{
		var me = this;
		if (this.overlayImages.length <= 1)
			return;
		var lastIndex = (this.overlayImages.length + this.imageIndex) % this.overlayImages.length;
		this.imageIndex = (this.overlayImages.length + this.imageIndex + 1) % this.overlayImages.length;
		//this.imageIndex = (this.overlayImages.length + this.imageIndex + 1) % (this.overlayImages.length);
		//this.overlayImages[this.imageIndex - 1].setMap(null);
		this.overlayImages[this.imageIndex].setMap(this.globalMap);	

		if (this.listeners_ref != null){
			google.maps.event.removeListener(this.listeners_ref);
		}

		this.listeners_ref = google.maps.event.addListener(this.overlayImages[this.imageIndex], 'click', function(event){
			me.fireEvent('gotClick', event);
		});
		this.overlayImages[lastIndex].setMap(null);
		//this.imageIndex = (this.imageIndex + 1) % (this.overlayImages.length)
	},

	/*set prev image*/
	prevImage: function()
	{
		if (this.overlayImages.length <= 1)
			return;
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
			return this.overlayImages[this.imageIndex];
		}	
	},

	getFloodImage: function(test_id, timestep){
		if (timestep)
			return 'http://sangkil.science.uva.nl:8003/drfsm/' + test_id + '/visualization/level/map/' + timestep + '.png';
		else return false;
	}
});