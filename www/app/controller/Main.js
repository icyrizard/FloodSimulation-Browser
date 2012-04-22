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
                maprender: 'overlay'
            }
        }
    },

    overlay: function(extmap, map){
        console.log("allo");
        this.globalMap = map;
        var pos = new google.maps.LatLng(52.3700,4.89000);
        console.log(map);
        new google.maps.Marker({
            position: pos,
            icon: 'Google_Maps_Marker.png',
            map: map,
            title: 'YOO'
        });
    },

    showOverlay: function(list, index, element, record) {

        var bounds = record.get('visbounds');
        var center = record.get('center');
        var corners = record.get('corners');


        var imageBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(bounds[2],bounds[3]),
            new google.maps.LatLng(bounds[0],bounds[1]));
        
        var cornerBounds = [
            new google.maps.LatLng(corners[0][0],corners[0][1]),
            new google.maps.LatLng(corners[1][0],corners[1][1]),
            new google.maps.LatLng(corners[2][0],corners[2][1]),
            new google.maps.LatLng(corners[3][0],corners[3][1])
        ];

        new google.maps.GroundOverlay('floodmap1.jpg', imageBounds, {map: this.globalMap});

        var rectangle = new google.maps.Polygon({
                        paths: cornerBounds,
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35
                    });

        rectangle.setMap(this.globalMap);
        this.getMap().setMapCenter(
            {latitude: center[0], longitude: center[1]}
        );

        this.getMap().setMapOptions({
                zoom: 12,
        });
                
    },
});