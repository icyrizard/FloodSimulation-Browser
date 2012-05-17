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
            /*use this format if this object is not yet created*/
            overlay: {
                selector: '#overlay',
                xtype: 'StepsOverlay',
                autoCreate: true,
            },
            /*use this format if this object is not yet created*/
            simulationOptions: {
                selector: 'simulation_options',
                xtype: 'SimulationOptions',
                autoCreate: true,
            },

            /*the list simulations available in the area selected*/
            simulation: 'simulationpanel'
        },

        /*all event listeners*/
        control: {
            'listpanel #cities': {
                itemtap: 'showOverlay',
            },

            'listpanel #summary': {
                itemtap: 'simulation',
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
                tap: 'openSimulations'
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
        }
    },

    /* first function to call */
    setMap: function(extmap, map){
        this.test_id = null;
        this.globalMap = map;
        this.getMapView().setGlobalMap(extmap, map);
        this.selectedIndex = [];
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
        /*show play button and hide pause button*/
        this.getPlay().show();
        this.getPause().hide();
        
        /*clear interval, even if there wasn't any*/
        clearInterval(this.interval);
        this.getMapView().removeImages();
        this.getOverlay().hide();
    },

    /* Initialize simulation, responds when tapped on a list item 
     * of the simulation panel
     */
    simulation: function(list, index, element, record) {
        /*first, remove all images, even if there werent any*/
        this.getMapView().removeImages();       
        //console.log(this.getOverlay());
        /*create reference, cb looses scope of this.*/
        var map = this.getMapView(),
            /*The simulationDetailStore has the details of the */
            
            /*get test_id*/
            test_id = record.get('test_id'), 
            /*bounds variable used later on*/
            bounds;

        /*store test_id globaly for use in other functions*/
        this.test_id = test_id; 

        /* callback, executed when ajax call returns
         * this function calls the map object to create overlays
         * for retrieved timessteps
         */
        var cb = function(result){
            if (result['timesteps'].length > 0)
                map.createOverlayImage(bounds, test_id, result['timesteps']);
        }

        var store = Ext.getStore('SimulationDetailsStore');
        /*Get visbounds, for later use in overlay map*/
        store.each(function(r) {
            bounds = r.get('visbounds');
        });

        /* The information of the simulation, has data of the time
         * steps available, crucial data for the displaying the images.
         */
        this.requestInfo(test_id, cb);

        /*show overlay*/
        this.getOverlay().showBy(this.getMapView(), 'br-br');
    },

    /* When an area is selected, this function is executed
     * Pushes a list to the view with data of the available simulations
     * Set map center to the center of the area that was tapped
     * Create a polygon dikes if there is information about them
     */
    showOverlay: function(list, index, element, record){
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

        /* clear filter, if the flters are not cleared, they will
         * be filtered on top of each other, resuting in an unwanted
         * state.
         */
        store.clearFilter();
        store.filter("area_id", area_id);

        /*push the side panel, in future create the view somewhere else*/
        this.getSidepanel().push({
            showAnimation: {
                type: 'slide',
                direction: 'left',
                duration: 200
            },
            id: 'summary',
            xtype: 'list',
            store: 'SimulationsSummary',
            itemTpl: '<div><img class="map_thumb" id="{test_id}_map"' +
                    'src=""/> ' +
                    '<img class="flood_thumb" id="{test_id}_flood"' +
                    'style:"width: 100px;" src=""/>' +
                    '<div style:"clear:both">' +
                    '<div id="{test_id}_control" class="control"></div>' +  
                    '</div><b>{test_id}</b>: {submitted}</div></div>',
        });

        /*set thumb images*/
        this.setThumb(center);
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
        }

        this.getMapView().setCenterMap(center);
        this.getMapView().alterMapOptions({zoom: 13});
    },

    /* Set the thumb, the image is the last image of the simulation  */
    setThumb: function(center){
        if (typeof this.test_id == undefined)
            return;
        var me = this;
        var summary_store = Ext.getStore('SimulationsSummary');
       // var mapImage ='http://maps.googleapis.com/maps/api/staticmap?center='+ center[0] +','+ center[1] + '&zoom=13&size=300x180&maptype=roadmap&sensor=false';
        summary_store.each(function(record){
            var test_id = record.get('test_id');

            var setImages = function(result){
         //       document.getElementById(test_id + "_map").src = mapImage;//me.getMapView().getFloodImage(test_id, result['timesteps'][result['timesteps'].length - 1]); 
                var image = me.getMapView().getFloodImage(test_id, result['timesteps'][result['timesteps'].length - 1]) || 'recourses/images/noimage.png';
                document.getElementById(test_id + "_flood").src = image;
            }
            me.requestInfo(record.get('test_id'), setImages);
        });
    },

    requestInfo: function(test_id, callback){
            var request = Ext.Ajax.request({
                method: 'GET',
                url: 'http://sangkil.science.uva.nl:8003/drfsm/'+ test_id +'/info.json',
    
            success: function(response, opts){
                var result = Ext.decode(response.responseText);
                callback(result);
            },

            failure: function(){
                 console.log('failed to create images');
            }
        });
    },

    openSimulations: function(element){
        this.getSimulationOptions().show();
    }
});
