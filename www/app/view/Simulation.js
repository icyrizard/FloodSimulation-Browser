/*simulationpanel, this is the right side of the app, on flex 2*/
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
            items: [{
                id: 'create-chart',
                xtype: 'button',
                text: 'create chart',
            }]
        },
        {
            xtype: 'SimulationMap',
            flex: 2,
        }],
    }
});