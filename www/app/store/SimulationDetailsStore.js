Ext.define('app.store.SimulationDetailsStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Rest'],
	xtype: 'SimulationDetailsStore',

	config: {
		model: 'app.model.SimulationDetails',
		fields: ['name', 'center', 'corners', 'size', 'extents', 'visbounds', 'vissize', 'projection', 'dikes'],
		proxy: {
			type: 'rest',
			url: 'http://sangkil.science.uva.nl:8003/area/',
			reader: {
				type: 'json',
			},
			 callback: function(response) {
        		console.log(response.responseText);
    		}
		},

		listeners: {
			beforeload: function(store){
				console.log(store);
			}
		}
	},
	setUrl: function(area_id) {
		var store = Ext.getStore('SimulationDetailsStore').getProxy();
		store._url = 'http://sangkil.science.uva.nl:8003/area/' + area_id + '/info.json';
	}
});