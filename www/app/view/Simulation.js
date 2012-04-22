Ext.define('app.view.Simulation', {
    extend: 'Ext.Container',
    xtype: 'simulationpanel',

    config: {
        title: "Map",
        layout: "vbox",
        items: [
            {
                dock: "top",
                xtype: 'toolbar',

                items : [
                    {
                        text: "button",
                        ui: "square"
                    }   
                ],
            },
            {
                xtype: 'SimulationMap',      
                flex: 2,
            }
        ],
    },
});

