Ext.define('app.Api', {
	mixins: ['Ext.mixin.Observable'],
	singleton: true,

	getIzid: function(lat, lng, area_id) {
		var me = this;
		var requestName = Ext.Ajax.request({
            method: 'GET',
            url: 'http://sangkil.science.uva.nl:8003/area/'+area_id+'/izid.json?latlng=' + lat + ',' + lng,
	        
	        success: function(response, opts){
	            var result = Ext.decode(response.responseText);
				me.fireEvent('gotIzid', result['izid']);
	        },

	        failure: function(){
	             console.log('getIzid: failed to get izid');
        	}
        });
	},

	getCsvFile: function(test_id, izid) {
		var me = this;
     	var requestName = Ext.Ajax.request({
            method: 'GET',
            url: 'http://sangkil.science.uva.nl:8003/drfsm/'+test_id+'/results/izid/'+izid+'.csv',
	        success: function(response, opts){
	            me.fireEvent('gotCsv', response.responseText)
	        },

	        failure: function(){
	             console.log('getCsvFile: failed to get csv file');
        	}
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
   	}
});