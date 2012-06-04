/**
* Main controller object
* 
*
*/
Ext.define('app.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        /*references to objects in the viewport*/
        refs: {
            map: '#mapa',
            sidepanel: 'listpanel',
            api: 'api',
            play: '#play',
            pause: '#pause',
            playBackw: '#play-backw',
            pauseBackw: '#pause-backw',
            mapView: 'SimulationMap',
            simulationList: {
                selector: 'summary',
                xtype: 'SimulationList',
                autoCreate: true,
            },
            /*use this format if this object is not yet created*/
            overlay: {
                selector: '#overlay',
                xtype: 'StepsOverlay',
                autoCreate: true,
            },
            /*use this format if this object is not yet created*/
            simulationOptions: {
                selector: '#simulation-options',
                xtype: 'SimulationOptions',
                autoCreate: true,
            },

            simOptionsButton: { 
                selector: '#simulationOptions',
                autoCreate: true,
            },

            optionsList: {
                selector:'#optionsList',
                autoCreate: true,
            },

            lsmSimulation: {
                selector: 'lsmsimulation-list',
                xtype: 'LsmSimulationList',
                autoCreate: true,
            },

            /*the list simulations available in the area selected*/
            simulation: 'simulationpanel'
        },

        /*all event listeners*/
        control: {
            'listpanel #cities': {
                itemtap: 'showList',
                show: 'initiateCities'
            },

            'listpanel #summary': {
                itemtap: 'simulate',
            },

            '#mapa': {
                maprender: 'setMap'
            },

            '#closebutton': {
                tap: 'closeoverlay'
            },

            '#backwards': {
                tap: 'prevImage'
            },

            '#forward': {
                tap: 'nextImage'
            },

            '#simulationOptions': {
                tap: 'openSimulationsOptions'
            },

            '#pause': {
                tap: 'stopPlayImages'
            },

            '#play': {
                tap: 'playImages'
            },

            '#pause-backw': {
                tap: 'stopBackwImages'
            },

            '#play-backw': {
                tap: 'playBackwImages'
            },

            '#optionsList': {
                itemtap: 'changeSimulationType',
            },

            'listpanel #lsmsimulation-list':{
                itemtap: 'simulate',
            }
        }
    },

    initiateCities: function(){
        this.getSimOptionsButton().show();
    },
    /* first function to call */
    setMap: function(extmap, map){
        this.test_id = null;
        this.globalMap = map;
        this.getMapView().setGlobalMap(extmap, map);
        this.selectedIndex = [];
        /*default simulation type*/
        this.SimulType = 'Flood';
    },

    stopBackwImages: function(button){
        clearInterval(this.interval);
        button.hide();
        this.getPlayBackw().show();
    },

    playBackwImages: function(button){
        this.getPlay().show();
        this.getPause().hide()
        clearInterval(this.interval);
        button.hide();
        this.getPauseBackw().show();

        var instance = this.getMapView();
        this.interval = setInterval(function() {instance.prevImage()}, 500);
    },

    /*loop trough images, see map module*/
    playImages: function(button){
        this.getPlayBackw().show()
        this.getPauseBackw().hide();
        clearInterval(this.interval);
        /*hide this button*/
        button.hide();
        /*show pause button*/
        this.getPause().show();
        /*create reference of the mapview, setInterval looses this. scope */
        var instance = this.getMapView();
        /*store this.interval, for later removal*/
        this.interval = setInterval(function() {instance.nextImage()}, 500);
    },

    /*stop looping trough images*/
    stopPlayImages: function(button){
        clearInterval(this.interval);
        /*hide this pause button*/
        button.hide();
        /*show play button*/
        this.getPlay().show();
        /*remove interval function*/
        clearInterval(this.interval);
    },

    /*show prev image*/
    prevImage: function(){
        this.getMapView().prevImage();
    },

    /*show next image*/
    nextImage: function(){
        this.getMapView().nextImage();
    },

    closeoverlay: function() {
        /*show play buttons and hide pause buttons*/
        this.getPlay().show();
        this.getPause().hide();
        this.getPlayBackw().show()
        this.getPauseBackw().hide();
        
        /*clear interval, even if there wasn't any*/
        clearInterval(this.interval);
        this.getMapView().removeImages();
        this.getOverlay().hide();
    },

    /* Initialize simulation, responds when tapped on a list item 
     * of the simulation panel
     */
    simulate: function(list, index, element, record) {
        console.log('simulate call');
        var me = this;
        /*first, remove all images, even if there werent any*/
        this.getMapView().removeImages();       
        //console.log(this.getOverlay());
        /*create reference, cb looses scope of this.*/
        var map = this.getMapView(),
            /*The simulationDetailStore has the details of the get test_id*/
            test_id = record.get('test_id'), 
            /*bounds variable used later on*/
            bounds;

        /*store test_id globaly for use in other functions*/
        this.test_id = test_id;

        /* callback, executed when ajax call returns
         * this function calls the map object to create overlays
         * for retrieved timesteps
         */
        var cb = function(result){
            var timesteps = result['timesteps'] || result['images'];
            console.log(timesteps);
            if (timesteps.length > 0)
                map.createOverlayImage(bounds, test_id, timesteps, me.SimulType);
        }

        var store = Ext.getStore('SimulationDetailsStore');

        /*Get visbounds, for later use in overlay map*/
        store.each(function(r) {
            bounds = r.get('visbounds');
        });

        /* The information of the simulation, has data of the time
         * steps available, crucial data for the displaying the images.
         */
        //console.log(this.getSimulationOptions().getSelectedCls())
        var url = '';
        if (this.SimulType == 'Flood')
        {
            url = 'http://sangkil.science.uva.nl:8003/drfsm/'+ test_id +'/info.json';
            console.log(this.SimulType);
        }
        else url = 'http://sangkil.science.uva.nl:8003/lsm/'+ test_id +'/visualization/paru/info.json';
        this.requestInfo(test_id, cb, url);

        /*show overlay*/
        this.getOverlay().showBy(this.getMapView(), 'br-br');
    },

    /* When an area is selected, this function is executed
     * Pushes a list to the view with data of the available simulations
     * Set map center to the center of the area that was tapped
     * Create a polygon dikes if there is information about them
     */
    showList: function(list, index, element, record){
        this.getSimOptionsButton().hide();
        //console.log(this.getSimulationOptions());
        //this.getSimulationOptions().hide();
        /*Remove images, even if there werent any*/
        this.getMapView().removeImages();
        /*store center*/
        var center = record.get('center');
        var area_id = record.get('area_id');
        
        /* This is used because this function may only be
         *  executed onece. */
        var selected = false;
        
        for (i in this.selectedIndex)
            if (this.selectedIndex[i] == index)
                selected = true;

        /* Instance of the store of all images data*/
        var store = Ext.getStore('SimulationsSummary');
        var store_lsm = Ext.getStore('LsmStore');
        store_lsm.clearFilter();
        store_lsm.filter("area_id", area_id);
        /* clear filter, if the flters are not cleared, they will
         * be filtered on top of each other, resuting in an unwanted
         * state.
         */
        store.clearFilter();
        store.filter("area_id", area_id);

        /*push the side panel, in future create the view somewhere else*/
        console.log(this.SimulType);
        if (this.SimulType == 'Flood')
        {
            this.setThumb(center);
            this.getSidepanel().push(this.getSimulationList());
        }
        else if(this.SimulType == 'Lsm')
            this.getSidepanel().push(this.getLsmSimulation());
        
        /*set thumb images*/
        //this.setThumb(center);
        /*the store with details of the of the simulation*/
        var store = Ext.getStore('SimulationDetailsStore');

        /*change url, a short coming of the store object of sencha touch*/
        store.setUrl(area_id);
        store.load();

        if (selected == false)
        {
            
            this.selectedIndex.push(index);
            var dikes = null;
            var bounds = record.get('visbounds');
            var corners = record.get('corners');

            store.each(function(r) {
                dikes = r.get('dikes');
            });
            
            if (dikes.length != 0)
                this.getMapView().createOverlayPolygon(dikes);
            this.getMapView().createMarker(center);

            this.getSimulationOptions().show();
            this.getSimulationOptions().hide();
        }

        this.getMapView().setCenterMap(center);
        this.getMapView().alterMapOptions({zoom: 13});
    },

    /* Set the thumb, the image is the last image of the simulation  */
    setThumb: function(){
        if (typeof this.test_id == undefined)
            return;
        var me = this;
        var summary_store = Ext.getStore('SimulationsSummary');

       // var mapImage ='http://maps.googleapis.com/maps/api/staticmap?center='+ center[0] +','+ center[1] + '&zoom=13&size=300x180&maptype=roadmap&sensor=false';
        summary_store.each(function(record){
            var test_id = record.get('test_id');

            var setImages = function(result){
         //       document.getElementById(test_id + "_map").src = mapImage;//me.getMapView().getFloodImage(test_id, result['timesteps'][result['timesteps'].length - 1]); 
                var image = me.getMapView().getFloodImage(test_id, result['timesteps'][result['timesteps'].length - 1]) || 'resources/images/noimage.png';
                document.getElementById(test_id + "_flood").src = image;
            }
            me.requestInfo(record.get('test_id'), setImages);
        });
    },

    requestInfo: function(test_id, callback, url){
            var url = url || 'http://sangkil.science.uva.nl:8003/drfsm/'+ test_id +'/info.json';
            var request = Ext.Ajax.request({
                method: 'GET',
                url: url,//'http://sangkil.science.uva.nl:8003/drfsm/'+ test_id +'/info.json',
    
            success: function(response, opts){
                var result = Ext.decode(response.responseText);
                callback(result);
            },

            failure: function(){
                 console.log('failed to create images');
            }
        });
    },

    openSimulationsOptions: function(element){
        this.getSimulationOptions().showBy(element);
    },

    closeSimulationsOptions: function(element){
        this.getSimulationOptions().hide();
    },

    changeSimulationType: function(list, index, element, record){
        if (record.get('type') == 'Lsm' && this.SimulType != 'Lsm')
            this.SimulType = 'Lsm'
        else if (record.get('type') == 'Flood' && this.SimulType != 'Flood')
            this.SimulType = 'Flood'
        this.getSimulationOptions().hide();  
    },

    pushSimulationList: function(){
        //this.getSidepanel().push(this.getLsmSimulation());
    }
});
