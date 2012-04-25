/*
 * Side panel, listing all the simulations available on 
 * http://sangkil.science.uva.nl:8003/area/list.json
 */
Ext.define("app.view.List", 
{
	extend: "Ext.Container",
	xtype: 'listpanel',

	requires: [
		'Ext.data.Store', 'Ext.dataview.List', 'Ext.Map'
	],

	//stores: ['SimulationStore'],

	config: {
		layout: "vbox",
		items: [
			{
				dock: 'top',
				xtype: "toolbar",

				items: [
					{
						text: "Button",
						ui: "Square",
						margin: 10
					}
				]
			},
			{
				xtype: 'list',
				ui: 'round',
				itemTpl: '<div>{name}</div>',
				store: 'SimulationStore',
				flex: 1
			}
		],
	},
});