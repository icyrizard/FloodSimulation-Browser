Ext.define('app.store.SimulationsSummary', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Rest'],
	config: {
		autoLoad: true,
		fields :['simulations', 'area_id', 'test_id', 'submitted'],
 		proxy : {
			type: 'rest',
			url: 'http://sangkil.science.uva.nl:8003/drfsm/list.json?summary',
			reader: {
				type: 'json',
				rootProperty: 'simulations'
			}
		}
	}

});