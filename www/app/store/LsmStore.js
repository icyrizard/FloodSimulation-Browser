Ext.define('app.store.LsmStore', {
	extend: 'Ext.data.Store',
	config: {
		autoLoad: true,
		fields: ['area_id', 'test_id', 'submitted'],
		proxy: {
			type: 'rest',
			url: 'http://sangkil.science.uva.nl:8003/lsm/list.json',
			reader: {
				type: 'json',
				rootProperty: 'simulations'
			}
		}
	}

});