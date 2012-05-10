Ext.define("app.view.Main", {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar'],

    config: {
        title: "Simulation Browser",
        layout: "hbox",

        fullscreen: true,
        layout: "hbox",
        
        items: [
        {
            xtype: 'listpanel',
            flex: 1
        },
        {  
            title: "map",     
            xtype: 'simulationpanel',
            flex: 2
        },
        ]
    }
});