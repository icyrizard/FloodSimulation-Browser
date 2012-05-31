Ext.define('app.view.Simulation', {
    extend: 'Ext.Panel',
    xtype: 'simulationpanel',
    config: {
        layout: 'card',
        items: 
        [
        {   
            docked: 'top',
            xtype: 'toolbar',
            ui: 'charcoal',
            title: 'Flood Simulation Browser',
        },
        {
            xtype: 'SimulationMap',
            flex: 2,
        }],
    }
});