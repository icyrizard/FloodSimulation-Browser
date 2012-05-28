Ext.define('app.view.LsmSimulationList', {
	extend: 'Ext.List',
	xtype: 'LsmSimulationList',
	id: 'lsmsimulation-list',
	config: {
		store: 'LsmStore',
		itemTpl: '{submitted}',
	}
});