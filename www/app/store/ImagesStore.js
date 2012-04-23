Ext.define('app.store.ImagesStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Rest'],
	xtype: 'ImagesStore',

	config : {
		model: 'app.model.SimulationDetails',
		fields: ['name', 'corners', 'visbounds', 'area_id', 'center'],
		proxy : {
			type: 'rest',
			url: 'http://sangkil.science.uva.nl:8003/area/',
			reader: {
				type: 'json',
			},
		}
	},
	setUrl: function(area_id) {
		var store = Ext.getStore('ImagesStore').getProxy();
		store._url = 'http://sangkil.science.uva.nl:8003/area/' + area_id + '/info.json';
	}
});