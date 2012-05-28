Ext.define("app.view.Main", {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar'],
    config: {
        title: "Simulation Browser",
        layout: "hbox",
        fullscreen: true,

        items: [
        {
            xtype: 'listpanel',
            width: '20%',
            style: 'border-right: 1px solid #373737',
            flex: 1,
        },
        {    
            xtype: 'simulationpanel',
            flex: 2
        }],
    }

});