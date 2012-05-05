Ext.define('app.store.SimulationDetailsStore', {
	extend: 'Ext.data.Store',
	requires: ['app.CustomProxy'],
	xtype: 'SimulationDetailsStore',

	config: {
		autoLoad: true,
		model: 'app.model.SimulationDetails',
		fields: ['name', 'center', 'corners', 'size', 'extents', 'visbounds', 'vissize', 'projection', 'dikes'],
		proxy: {
			type: 'rest',
			url: 'http://sangkil.science.uva.nl:8003/area/1/info.json',
			reader: {
				type: 'json',
			},
		},

		listeners: {

		}
	},
	
	setUrl: function(area_id) {
		var store = Ext.getStore('SimulationDetailsStore').getProxy();
		store._url = 'http://sangkil.science.uva.nl:8003/area/' + area_id + '/info.json';
	},
});