Ext.define('app.view.LsmSimulationList', {
	extend: 'Ext.List',
	xtype: 'LsmSimulationList',
	id: 'lsmsimulation-list',
	config: {
		title: 'lsm',
		store: 'LsmStore',
		itemTpl: '{submitted}',
	}
});