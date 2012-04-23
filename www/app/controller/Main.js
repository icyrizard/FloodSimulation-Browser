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
        var traffic = new google.maps.TrafficLayer();
        traffic.setMap(map);
    },

    showOverlay: function(list, index, element, record) {
        var store = Ext.getStore('ImagesStore');
        store.setUrl(record.get('area_id'));
        store.load();

        var bounds = record.get('visbounds');
        var center = record.get('center');
        var corners = record.get('corners');

        this.getMapView().setCenterMap(center);
        this.getMapView().createOverlayImage(bounds);
        this.getMapView().createOverlayPolygon(corners);
    },
});