/*
 * Side panel, listing all the simulations available on 
 * http://sangkil.science.uva.nl:8003/area/list.json
 */
Ext.define("app.view.List", 
{
	extend: "Ext.navigation.View",
	xtype: 'listpanel',

	requires: [
		'Ext.data.Store', 'Ext.dataview.List', 'Ext.Map'
	],
	title: 'Simulations',

	config: {
		items: [
			{
				id: 'cities',
				xtype: 'list',
				ui: 'round',
				itemTpl: '<div>{name}</div>',
				store: 'SimulationStore',
			}],
	},
});