Ext.define('app.controller.ChartController', {
	extend: 'Ext.app.Controller',

	requires: ['app.Api'],

	config: {
		refs: {
			Floodchart: {
				xtype: 'floodChart',
				selector: 'flood-chart',
				autoCreate: true,
			},

			ChartData : {
				selector: 'flood-chart-id',
				autoCreate: true,
			},

			ExpandButton: '#expand-button',

			mapView: 'SimulationMap',
		},

		control: {
			'#mapa': {
				maprender: 'addListener'
			},

			'#closeChart': {
				tap: 'closeFloodChart'
			},

			'#expand-button': {
				tap: 'expandChart'
			},
		},
	},

	init: function(){
		self.marker = null;
		map = this.getMapView();

		app.Api.on({
			gotIzid: function(izid){
				app.Api.getCsvFile(map.testId, izid);
			},

			gotCsv: function(result){
				me.plot(result);
			}
		});
	},

	addListener: function(){
		me = this;
		map = this.getMapView();
		map.on({
			gotClick: function(event){
				if (self.marker != null) {
					self.marker.setMap(null);
					self.marker = null;
				}
				lat = event.latLng.lat();
				lng = event.latLng.lng();
				options = {
					icon: 'resources/images/marker.png',
					draggable: true,
					raiseOnDrag: true,
				};

				self.marker = map.createMarker([lat, lng], options);
				app.Api.getIzid(lat, lng, map.areaId);
			},
			dragend: function(event){
				console.log(event);
				lat = event.latLng.lat();
				lng = event.latLng.lng();
				app.Api.getIzid(lat, lng, map.areaId);		
			}
		});
	},

	plot: function(result){
		array = result.split('\n');
		store = Ext.getStore('chartStore');
		columns = array[0];
		volume = [];
		time = [];
		data = []

		for (i = 1; i < array.length; i++)
		{
			line_clmns = array[i].split(',');
			data.push({
				time : parseInt(line_clmns[0]),
				volume : parseInt(line_clmns[2]),
			});
		}

	 	store.setData(data);
	 	this.openChart();
	},

	openChart: function(){
		this.getFloodchart().showBy(this.getMapView(), 't-t');

	},

	closeFloodChart: function(){
		this.getFloodchart().hide();
	},

	expandChart: function(){
		
		
	}

});