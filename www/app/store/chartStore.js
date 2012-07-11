/*Used to fill the chart with data*/
Ext.define('app.store.chartStore', {
	extend: 'Ext.data.JsonStore',

	config : {
		fields: ['time', 'volume'],
	}
});