/*list of areas*/
Ext.define('app.store.SimulationStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Rest'],
	id: 'simulationList',

	config: {
		autoLoad: true,
		fields: ['name', 'corners', 'visbounds', 'area_id', 'center'],
		proxy: {
			type: 'rest',
			url: 'http://sangkil.science.uva.nl:8003/area/list.json',
			reader: {
				type: 'json',
				rootProperty: 'areas'
			},
		}
	}
});

