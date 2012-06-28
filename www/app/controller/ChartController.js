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
		me = this;
		app.Api.on({
			gotIzid: function(izid){
				app.Api.getCsvFile(me.getMapView().testId, izid);
			},

			gotCsv: function(result){
				me.plot(result);
			}
		});
	},

	addListener: function(){
		me = this;
		this.getMapView().on({
			gotClick: function(event){
				if (self.marker != null) {
					self.marker.setMap(null);
					self.marker = null;
				}
				lat = event.latLng.lat();
				lng = event.latLng.lng();
				options = {
					icon: 'resources/images/crosshair.png',
					draggable: true,
					raiseOnDrag: true,
				};
				self.marker = me.getMapView().createMarker([lat, lng], options);
				app.Api.getIzid(lat, lng, me.getMapView().areaId)
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
			console.log(parseInt(line_clmns[0]));
			data.push({
				time : parseInt(line_clmns[0]),
				volume : parseInt(line_clmns[2]),
				time1 : parseInt(line_clmns[0]),
				volume1: parseInt(line_clmns[2])
			});
		}

	 	store.setData(data);
	 	this.openChart();
	},

	openChart: function(){
		this.getFloodchart().showBy(this.getMapView(), 'bl-bl');

	},

	closeFloodChart: function(){
		this.getFloodchart().hide();
	},

	expandChart: function(){
		
		
	}

});