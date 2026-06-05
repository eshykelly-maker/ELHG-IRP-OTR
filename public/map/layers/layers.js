var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });
var lyr_declividade_definitiva_1 = new ol.layer.Image({
        opacity: 1,
        
    title: 'declividade_definitiva<br />\
    <img src="styles/legend/declividade_definitiva_1_0.png" /> 0 - 3%<br />\
    <img src="styles/legend/declividade_definitiva_1_1.png" /> 3 - 6%<br />\
    <img src="styles/legend/declividade_definitiva_1_2.png" /> 6 - 10%<br />\
    <img src="styles/legend/declividade_definitiva_1_3.png" /> 10 - 15%<br />\
    <img src="styles/legend/declividade_definitiva_1_4.png" /> >15%<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/declividade_definitiva_1.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [-5604573.051181, -715606.533759, -5600114.916285, -713339.313607]
        })
    });
var lyr_sombreamento_2 = new ol.layer.Image({
        opacity: 1,
        
    title: 'sombreamento<br />\
    <img src="styles/legend/sombreamento_2_0.png" /> 1<br />\
    <img src="styles/legend/sombreamento_2_1.png" /> 255<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/sombreamento_2.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [-5604573.051181, -715606.533759, -5600114.916285, -713339.313607]
        })
    });
var format_curvas_de_niveisbancadas_3 = new ol.format.GeoJSON();
var features_curvas_de_niveisbancadas_3 = format_curvas_de_niveisbancadas_3.readFeatures(json_curvas_de_niveisbancadas_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_curvas_de_niveisbancadas_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_curvas_de_niveisbancadas_3.addFeatures(features_curvas_de_niveisbancadas_3);
var lyr_curvas_de_niveisbancadas_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_curvas_de_niveisbancadas_3, 
                style: style_curvas_de_niveisbancadas_3,
                popuplayertitle: 'curvas_de_niveis(bancadas)',
                interactive: true,
                title: '<img src="styles/legend/curvas_de_niveisbancadas_3.png" /> curvas_de_niveis(bancadas)'
            });
var format_trecho_baixo_4 = new ol.format.GeoJSON();
var features_trecho_baixo_4 = format_trecho_baixo_4.readFeatures(json_trecho_baixo_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_trecho_baixo_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_trecho_baixo_4.addFeatures(features_trecho_baixo_4);
var lyr_trecho_baixo_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_trecho_baixo_4, 
                style: style_trecho_baixo_4,
                popuplayertitle: 'trecho_baixo',
                interactive: true,
                title: '<img src="styles/legend/trecho_baixo_4.png" /> trecho_baixo'
            });
var format_trecho_medio_5 = new ol.format.GeoJSON();
var features_trecho_medio_5 = format_trecho_medio_5.readFeatures(json_trecho_medio_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_trecho_medio_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_trecho_medio_5.addFeatures(features_trecho_medio_5);
var lyr_trecho_medio_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_trecho_medio_5, 
                style: style_trecho_medio_5,
                popuplayertitle: 'trecho_medio',
                interactive: true,
                title: '<img src="styles/legend/trecho_medio_5.png" /> trecho_medio'
            });
var format_trecho_alto_6 = new ol.format.GeoJSON();
var features_trecho_alto_6 = format_trecho_alto_6.readFeatures(json_trecho_alto_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_trecho_alto_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_trecho_alto_6.addFeatures(features_trecho_alto_6);
var lyr_trecho_alto_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_trecho_alto_6, 
                style: style_trecho_alto_6,
                popuplayertitle: 'trecho_alto',
                interactive: true,
                title: '<img src="styles/legend/trecho_alto_6.png" /> trecho_alto'
            });
var format_rea_de_estudo_7 = new ol.format.GeoJSON();
var features_rea_de_estudo_7 = format_rea_de_estudo_7.readFeatures(json_rea_de_estudo_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_rea_de_estudo_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_rea_de_estudo_7.addFeatures(features_rea_de_estudo_7);
var lyr_rea_de_estudo_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_rea_de_estudo_7, 
                style: style_rea_de_estudo_7,
                popuplayertitle: 'área_de_estudo',
                interactive: false,
                title: '<img src="styles/legend/rea_de_estudo_7.png" /> área_de_estudo'
            });

lyr_GoogleSatellite_0.setVisible(true);lyr_declividade_definitiva_1.setVisible(true);lyr_sombreamento_2.setVisible(true);lyr_curvas_de_niveisbancadas_3.setVisible(true);lyr_trecho_baixo_4.setVisible(true);lyr_trecho_medio_5.setVisible(true);lyr_trecho_alto_6.setVisible(true);lyr_rea_de_estudo_7.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_declividade_definitiva_1,lyr_sombreamento_2,lyr_curvas_de_niveisbancadas_3,lyr_trecho_baixo_4,lyr_trecho_medio_5,lyr_trecho_alto_6,lyr_rea_de_estudo_7];
lyr_curvas_de_niveisbancadas_3.set('fieldAliases', {'fid': 'fid', 'ID': 'ID', 'ELEV': 'ELEV', 'busetinha': 'busetinha', });
lyr_trecho_baixo_4.set('fieldAliases', {'trecho': 'trecho', 'classe_sg': 'classe_sg', 'sg': 'sg', 'tkph': 'tkph', 'cp': 'cp', 'ie': 'ie', 'sa': 'sa', 'pa': 'pa', 'irp_otr': 'irp_otr', 'risco': 'risco', 'acao': 'acao', });
lyr_trecho_medio_5.set('fieldAliases', {'trecho': 'trecho', 'classe_sg': 'classe_sg', 'sg': 'sg', 'tkph': 'tkph', 'cp': 'cp', 'ie': 'ie', 'sa': 'sa', 'pa': 'pa', 'irp_otr': 'irp_otr', 'risco': 'risco', 'acao': 'acao', });
lyr_trecho_alto_6.set('fieldAliases', {'trecho': 'trecho', 'classe_sg': 'classe_sg', 'sg': 'sg', 'tkph': 'tkph', 'cp': 'cp', 'ie': 'ie', 'sa': 'sa', 'pa': 'pa', 'irp_otr': 'irp_otr', 'risco': 'risco', 'acao': 'acao', });
lyr_rea_de_estudo_7.set('fieldAliases', {'id': 'id', });
lyr_curvas_de_niveisbancadas_3.set('fieldImages', {'fid': 'TextEdit', 'ID': 'TextEdit', 'ELEV': 'TextEdit', 'busetinha': 'TextEdit', });
lyr_trecho_baixo_4.set('fieldImages', {'trecho': 'TextEdit', 'classe_sg': 'TextEdit', 'sg': 'TextEdit', 'tkph': 'TextEdit', 'cp': 'TextEdit', 'ie': 'TextEdit', 'sa': 'TextEdit', 'pa': 'TextEdit', 'irp_otr': 'TextEdit', 'risco': 'TextEdit', 'acao': 'TextEdit', });
lyr_trecho_medio_5.set('fieldImages', {'trecho': 'TextEdit', 'classe_sg': 'TextEdit', 'sg': 'TextEdit', 'tkph': 'TextEdit', 'cp': 'TextEdit', 'ie': 'TextEdit', 'sa': 'TextEdit', 'pa': 'TextEdit', 'irp_otr': 'TextEdit', 'risco': 'TextEdit', 'acao': 'TextEdit', });
lyr_trecho_alto_6.set('fieldImages', {'trecho': 'TextEdit', 'classe_sg': 'TextEdit', 'sg': 'TextEdit', 'tkph': 'TextEdit', 'cp': 'TextEdit', 'ie': 'TextEdit', 'sa': 'TextEdit', 'pa': 'TextEdit', 'irp_otr': 'TextEdit', 'risco': 'TextEdit', 'acao': 'TextEdit', });
lyr_rea_de_estudo_7.set('fieldImages', {'id': 'TextEdit', });
lyr_curvas_de_niveisbancadas_3.set('fieldLabels', {'fid': 'no label', 'ID': 'no label', 'ELEV': 'no label', 'busetinha': 'no label', });
lyr_trecho_baixo_4.set('fieldLabels', {'trecho': 'inline label - visible with data', 'classe_sg': 'inline label - visible with data', 'sg': 'inline label - visible with data', 'tkph': 'inline label - visible with data', 'cp': 'inline label - visible with data', 'ie': 'inline label - visible with data', 'sa': 'inline label - visible with data', 'pa': 'inline label - visible with data', 'irp_otr': 'inline label - visible with data', 'risco': 'inline label - visible with data', 'acao': 'inline label - visible with data', });
lyr_trecho_medio_5.set('fieldLabels', {'trecho': 'inline label - visible with data', 'classe_sg': 'inline label - visible with data', 'sg': 'inline label - visible with data', 'tkph': 'inline label - visible with data', 'cp': 'inline label - visible with data', 'ie': 'inline label - visible with data', 'sa': 'inline label - visible with data', 'pa': 'inline label - visible with data', 'irp_otr': 'inline label - visible with data', 'risco': 'inline label - visible with data', 'acao': 'inline label - visible with data', });
lyr_trecho_alto_6.set('fieldLabels', {'trecho': 'inline label - visible with data', 'classe_sg': 'inline label - visible with data', 'sg': 'inline label - visible with data', 'tkph': 'inline label - visible with data', 'cp': 'inline label - visible with data', 'ie': 'inline label - visible with data', 'sa': 'inline label - visible with data', 'pa': 'inline label - visible with data', 'irp_otr': 'inline label - visible with data', 'risco': 'inline label - visible with data', 'acao': 'inline label - visible with data', });
lyr_rea_de_estudo_7.set('fieldLabels', {'id': 'no label', });
lyr_rea_de_estudo_7.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});