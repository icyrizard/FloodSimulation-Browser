Ext.define('app.view.OptionsPanel', {
	extend: 'Ext.Panel',
	xtype: 'SimulationOptions',
	id: 'simulation_options',
	requires: ['Ext.dataview.List'],
	config: {
		layout: 'hbox',
		right: 40,
		width: 200,
		height: 100,
		hideOnMaskTap: true,
		modal: true,
		items: [
		{
			xtype: 'list',
			id: 'optionsList',
			width: '100%',
			itemTpl: 'Simulation {type}',
			data: [
				{type: "Flood"},
				{type: "Lsm"}
			],
		}],
	}
});