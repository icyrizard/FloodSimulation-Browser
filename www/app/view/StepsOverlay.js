Ext.define('app.view.StepsOverlay', {
	extend: 'Ext.Panel',
	xtype: 'StepsOverlay',
	id: 'overlay',

	config: {
		floating: true,
		modal: true,
		width: 300,
		height: 50,
		scroll: false,
	}
});