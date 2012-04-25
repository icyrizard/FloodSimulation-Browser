Ext.define('app.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            map: '#mapa',
            mapView: 'SimulationMap',
        },
        control: {
            'listpanel list': {
                itemtap: 'showOverlay',
            },

            '#mapa': {
                maprender: 'setMap'
            }
        }
    },

    setMap: function(extmap, map){
        this.globalMap = map;
        this.getMapView().setGlobalMap(extmap, map);
       // var traffic = new google.maps.TrafficLayer();
      //  traffic.setMap(map);
    }, 

    showOverlay: function(list, index, element, record) {
        //var area_id = record.get('area_id');
        var store = Ext.getStore('SimulationDetailsStore');
        var area_id = record.get('area_id');
        var map = this.getMapView();
        var dikes = null;
        //store.setUrl(record.get('area_id'));
        //console.log(store.getData().getCount());
        //console.log(store.getData().getAt(0).get('dikes'));
        //var dikes = store.getData().getAt(0).get('dikes');
        var bounds = record.get('visbounds');
        var center = record.get('center');
        var corners = record.get('corners');

        var request = Ext.Ajax.request({
            method: 'GET',
            url: 'http://sangkil.science.uva.nl:8003/area/' + area_id + '/info.json',
            
            success: function(response, opts){
                console.log(response);
                var result = Ext.decode(response.responseText);
                console.log(this);
                if (result['dikes'].length  > 0)
                    map.createOverlayPolygon(result['dikes']);
            },
        });
        //var result = Ext.decode(request.responseText);
        //  console.log(result);
        //if (result['dikes'].length > 0)
        //  this.getMapView().createOverlayPolygon(result['dikes']);
        this.getMapView().createMarker();
        //this.getMapView().createOverlayImage(bounds);
        this.getMapView().setCenterMap(center);
    },

    callMapPolygon: function(polygon)
    {
        this.getMapView().createOverlayPolygon(polygon);
    }

});