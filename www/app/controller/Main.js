Ext.define('app.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            map: '#mapa',
            sidepanel: 'listpanel',
            api: 'api',
            mapView: 'SimulationMap',
            overlay: '#overlay',
            simulation: 'simulationpanel'
        },
        control: {
            'listpanel #cities': {
                itemtap: 'showOverlay',
                tap: 'closeoverlay',
            },

            'listpanel #summary': {
                itemtap: 'simulation',
            },

            '#ext-button-1': {
                tap: 'callRemoveImages'
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

            '#overlay': {
                hide: 'callRemoveImages',
            }

        }
    },

    callRemoveImages: function() {
        this.getMapView().removeImages();
        console.log('hide removeimages');
        this.getOverlay().hide();

    },

    prevImage: function(){
        this.getMapView().prevImage();
    },

    nextImage: function(){
        this.getMapView().nextImage();
    },

    closeoverlay: function() {
        //console.log(this.getMapView().getCurrentImage());
        this.setThumb();
        console.log('call removeimages');
        console.log(this.getOverlay());
        this.getMapView().removeImages();
        this.getOverlay().hide();
    },

    setMap: function(extmap, map){
        this.test_id = null;
        this.globalMap = map;
        this.getMapView().setGlobalMap(extmap, map);
        this.selectedIndex = [];
    },

    simulation: function(list, index, element, record) {
        var cb = function(result){
            if (result['timesteps'].length > 0)
                map.createOverlayImage(bounds, test_id, result['timesteps']);
        }
        console.log(record);
        var store = Ext.getStore('SimulationDetailsStore');
        var test_id = record.get('test_id');
        console.log(test_id)
        this.test_id = test_id;
        console.log(this.this_id);
        var map = this.getMapView();
        var bounds;
        console.log(store);

        store.each(function(r){
            bounds = r.get('visbounds');
        });

        console.log(bounds);
        this.requestInfo(test_id, cb);
        // var request = Ext.Ajax.request({
        //     method: 'GET',
        //     url: 'http://sangkil.science.uva.nl:8003/drfsm/'+ test_id +'/info.json',
    
        //     success: function(response, opts){
        //         var result = Ext.decode(response.responseText);
        //         if (result['timesteps'].length > 0)
        //             map.createOverlayImage(bounds, test_id, result['timesteps']);
        //     },

        //     failure: function(){
        //          console.log('failed to create images');
        //     }
        // });

        this.getOverlay().showBy(element);
    },

    showOverlay: function(list, index, element, record) {
        this.getMapView().removeImages();
        var center = record.get('center');
        var selected = false;
        var area_id = record.get('area_id');
        for (i in this.selectedIndex)
            if (this.selectedIndex[i] == index)
                selected = true;

        var store = Ext.getStore('SimulationsSummary');

        store.clearFilter();
        store.filter("area_id", area_id);

        this.getSidepanel().push({
            showAnimation: {
                type: 'slide',
                direction: 'left',
                duration: 200
            },
            id: 'summary',
            xtype: 'list',
            store: 'SimulationsSummary',
            itemTpl: '<div><img class="flood_thumb" id="{test_id}_flood"' +
                    'style="width: 180px; height: 180px;" alt="noimage.png" src=""/> ' + 
                    '<div style:"clear:both"></div><b>{test_id}</b>: {submitted}</div>',
        });
        this.setThumb(center);
        var store = Ext.getStore('SimulationDetailsStore');
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
            //this.getImages();
        }   
        this.getMapView().setCenterMap(center);
    },

    setThumb: function(center){
        if (typeof this.test_id == undefined)
            return;
        var me = this;
        var summary_store = Ext.getStore('SimulationsSummary');
        summary_store.each(function(record){
            var test_id = record.get('test_id');
            var setImages = function(result){
                console.log(result);
                //var mapImage ='http://maps.googleapis.com/maps/api/staticmap?center='+ center[0] +','+ center[1] + '&zoom=12&size=512x512&maptype=roadmap&sensor=false';
                //document.getElementById(test_id + "_thumb").src = mapImage;//me.getMapView().getFloodImage(test_id, result['timesteps'][result['timesteps'].length - 1]); 
                var image = me.getMapView().getFloodImage(test_id, result['timesteps'][result['timesteps'].length - 1]) || 'noimage.png';
                console.log(image);
                document.getElementById(test_id + "_flood").src = image;
            }
            console.log(record.get('test_id'));
            // console.log(this.requestInfo);
            me.requestInfo(record.get('test_id'), setImages);
            
        });

        // if (typeof this.test_id != undefined) {
        //    document.getElementById(this.test_id + "_thumb").src = this.getMapView().getCurrentImage();
        // }
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

    }
});


            // this.getApi.getAreaInfo(area_id,  map.createOverlayPolygon);
            // var request = Ext.Ajax.request({
            //      method: 'GET',
            //      url: 'http://sangkil.science.uva.nl:8003/area/' + area_id + '/info.json',
                
            //      success: function(response, opts){
            //          console.log(response);
            //          var result = Ext.decode(response.responseText);
            //          console.log(this);
            //          if (result['dikes'].length  > 0)
            //              map.createOverlayPolygon(result['dikes']);
            //      },
            // });

