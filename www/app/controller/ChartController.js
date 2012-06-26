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

			chartData : {
				selector: 'flood-chart-id',
				autoCreate: true,
			},

			mapView: 'SimulationMap',
		},

		control: {
			'#mapa': {
				maprender: 'addListener'
			},

			'#closeChart': {
				tap: 'closeFloodChart'
			}
		},
	},

	init: function(){
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
				app.Api.getIzid(event.latLng.lat(), event.latLng.lng())
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
				time : time.push(parseInt(line_clmns[0]) + i * 100),
				volume : volume.push(line_clmns[1])
			});
		}


	 	console.log(data);
	 	
		this.openChart();
	},

	getFile: function(result){
		app.Api.getCsvFile(result['izid']);
	},

	closeFloodChart: function(){
		this.getFloodchart().hide();
	},

	getData: function(latLng){
		app.Api.getIzid(latLng.lat(), latLng.lng())
	},

	openChart: function(){
		this.getFloodchart().showBy(this.getMapView());
	},
});