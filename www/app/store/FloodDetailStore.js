Ext.define('app.store.FloodDetailStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Rest'],
	xtype: 'FloodDetailStore',

	config: {
		autoLoad: true,
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
		var store = Ext.getStore('FloodDetailStore').getProxy();
		store._url = 'http://sangkil.science.uva.nl:8003/area/' + area_id + '/info.json';
	},
});