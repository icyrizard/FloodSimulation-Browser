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

            'sliderfield': {
                change: 'callNextImage'
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
        //console.log('hide removeimages');
        //this.getOverlay().hide();
    },

    prevImage: function(){
        this.getMapView().prevImage();
    },

    nextImage: function(){
        this.getMapView().nextImage();
    },

    closeoverlay: function() {
        // console.log('call removeimages');
        // console.log(this.getOverlay());
        // this.getMapView().removeImages();
        // this.getOverlay().hide();
    },

    setMap: function(extmap, map){
        this.globalMap = map;
        this.getMapView().setGlobalMap(extmap, map);
        this.selectedIndex = [];
    },

    simulation: function(list, index, element, record) {
        var store = Ext.getStore('SimulationDetailsStore');
        var test_id = record.get('test_id');
        var map = this.getMapView();
        var bounds;

        store.each(function(r){
            bounds = r.get('visbounds');
        });
       
        var request = Ext.Ajax.request({
            method: 'GET',
            url: 'http://sangkil.science.uva.nl:8003/drfsm/'+ test_id +'/info.json',
    
            success: function(response, opts){
                var result = Ext.decode(response.responseText);
                if (result['timesteps'].length > 0)
                    map.createOverlayImage(bounds, test_id, result['timesteps']);
            },
        });

        console.log(this.getOverlay());
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
            itemTpl: '<div>simulation {submitted} - {test_id}</div>',
        });

        if (selected == false)
        {
            this.selectedIndex.push(index);
            var dikes = null;
            var bounds = record.get('visbounds');
            var corners = record.get('corners');

            var store = Ext.getStore('SimulationDetailsStore');
            store.setUrl(area_id);
            store.load();

            store.each(function(r) {
                dikes = r.get('dikes');
            });
            
            if (dikes.length != 0)
                this.getMapView().createOverlayPolygon(dikes);
            this.getMapView().createMarker(center);
            this.getMapView().createOverlayImage(bounds);
        }   
        this.getMapView().setCenterMap(center);
    },
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

