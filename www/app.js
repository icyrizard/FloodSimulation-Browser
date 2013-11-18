Ext.Loader.setPath({
    'Ext': 'sdk/src'
});

Ext.Loader.setConfig({enabled:true});


Ext.application({
    controllers: ["Main", "ChartController"],
    models: ["SimulationModel", "SimulationDetails"],
    stores: ['SimulationStore', 'FloodDetailStore', 'SimulationsSummary', 'LsmStore', 'chartStore'],

    name: 'app',

    requires: [
        'Ext.MessageBox',
    ],

    views: ['Main', "Simulation", "List", 'Map', 'StepsOverlay', 'OptionsPanel',
            'SimulationList', 'LsmSimulationList', 'Chart'],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('app.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
