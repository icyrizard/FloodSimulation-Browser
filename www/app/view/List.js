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

	config: {
		layout: "card",
        animation: {
            type: 'slide',
            direction: 'left',
            duration: 1000
        },
		items: [
			{
				id: 'cities',
				xtype: 'list',
				ui: 'round',
				itemTpl: '<div>{name}</div>',
				store: 'SimulationStore',
				flex: 1
			},
		],
	},
});