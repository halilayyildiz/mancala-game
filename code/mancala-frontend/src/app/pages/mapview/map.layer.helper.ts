// import { MessageService } from '../../service/message.service';
// import { OutageService } from '../../service/outage.service';
// import { GeoService } from '../../service/geo.service';

// import { User } from '../../domain/user';
// import { FeatureType } from '../../domain/geo/feature.type';

// import Map from 'ol/map';
// import Proj from 'ol/proj';
// import View from 'ol/view';
// import Feature from 'ol/feature';
// import Control from 'ol/control';
// import ControlOverviewMap from 'ol/control/overviewmap';
// import SourceBingMaps from 'ol/source/bingmaps';
// import LayerTile from 'ol/layer/tile';
// import SourceXYZ from 'ol/source/xyz';
// import LayerVector from 'ol/layer/vector';
// import SourceVector from 'ol/source/vector';
// import GeomPoint from 'ol/geom/point';
// import GeomCircle from 'ol/geom/circle';
// import GeomLineString from 'ol/geom/linestring';
// import StyleStyle from 'ol/style/style';
// import StyleRegularShape from 'ol/style/regularshape';
// import StyleIcon from 'ol/style/icon';
// import StyleText from 'ol/style/text';
// import StyleCircle from 'ol/style/circle';
// import StyleFill from 'ol/style/fill';
// import StyleStroke from 'ol/style/stroke';

// export class MapLayerHelper {
//     constructor(
//         private map: Map,
//         private layers: Array<any>,
//         private geoService: GeoService,
//         private outageService: OutageService
//     ) { }

//     initLayers() {
//         this.layers = [
//             this.createLineLayer(),
//             this.createTransformerLayer(),
//             this.createLoadLayer(),
//             this.createBreakerLayer(),
//             this.createOutageLayer()
//         ];

//         this.layers.forEach(layer => layer.init().draw());
//     }

//     createOutageLayer() {
//         const name = 'outage';
//         let layer: LayerVector = null;
//         let source: SourceVector = null;

//         const init = () => {
//             source = new SourceVector();
//             layer = new LayerVector({
//                 source: source,
//                 style: style
//             });
//             layer.set('type', FeatureType.outage);
//             this.map.addLayer(layer);

//             return { name, init, draw };
//         };

//         const draw = () => {
//             this.outageService.getAllOutages()
//                 .subscribe(outages => {
//                     outages.forEach(outage => {
//                         source.addFeature(new Feature({
//                             type: FeatureType.outage,
//                             name: outage.id,
//                             geometry: new GeomPoint(Proj.fromLonLat(outage.coordinate))
//                         }));
//                     });
//                 });

//             return { name, init, draw };
//         };

//         const style = (feature, resolution) => {
//             return new StyleStyle({
//                 image: new StyleIcon({
//                     src: 'assets/image/outage.svg'
//                 })
//             });
//         };

//         return { name, init, draw };
//     }

//     createLineLayer() {
//         const name = 'line';
//         let layer: LayerVector = null;
//         let source: SourceVector = null;

//         const init = () => {
//             source = new SourceVector();
//             layer = new LayerVector({
//                 source: source,
//                 style: style
//             });
//             layer.set('type', FeatureType.line);
//             this.map.addLayer(layer);

//             return { name, init, draw };
//         };

//         const draw = () => {
//             this.geoService.getAllLines()
//                 .subscribe(lines => {
//                     lines.forEach(line => {
//                         source.addFeature(new Feature({
//                             type: FeatureType.line,
//                             id: line.id,
//                             name: line.name,
//                             voltageLevel: line.voltageLevel,
//                             isEnergized: line.isEnergized,
//                             geometry: new GeomLineString([Proj.fromLonLat(line.coord_start), Proj.fromLonLat(line.coord_end)])
//                         }));
//                     });
//                 });

//             return { name, init, draw };
//         };

//         const colors = {
//             '0.4': '#E8FF1D',
//             '0.66': '#cec027',
//             '1': '#86f442',
//             '3.15': '#44f441',
//             '6.3': '#41f48e',
//             '11': '#41f4e2',
//             '15': '#ff9900',
//             '31.5': '#FF0000',
//             '154': '#000000'
//         };

//         const style = (feature, resolution) => {
//             return new StyleStyle({
//                 stroke: new StyleStroke({
//                     // color: colors[feature.get('voltageLevel')],
//                     color: (feature.get('isEnergized')) ? colors[feature.get('voltageLevel')] : '#FFFFFF',
//                     width: 2
//                 })
//             });
//         };

//         return { name, init, draw };
//     }

//     createTransformerLayer() {
//         const name = 'transformer';
//         let layer: LayerVector = null;
//         let source: SourceVector = null;

//         const init = () => {
//             source = new SourceVector();
//             layer = new LayerVector({
//                 source: source,
//                 style: style
//             });
//             layer.set('type', FeatureType.transformer);
//             this.map.addLayer(layer);

//             return { name, init, draw };
//         };

//         const draw = () => {
//             this.geoService.getAllTransformers()
//                 .subscribe(transformers => {
//                     transformers.forEach(transformer => {
//                         source.addFeature(new Feature({
//                             type: FeatureType.transformer,
//                             id: transformer.id,
//                             name: transformer.name,
//                             voltageLevel: transformer.voltageLevel,
//                             isEnergized: transformer.isEnergized,
//                             geometry: new GeomLineString([Proj.fromLonLat(transformer.coord_start), Proj.fromLonLat(transformer.coord_end)])
//                         }));

//                         calculateCirclePoints(transformer.coord_start, transformer.coord_end).forEach(coordinate => {
//                             source.addFeature(new Feature({
//                                 type: FeatureType.transformer,
//                                 id: transformer.id,
//                                 name: transformer.name,
//                                 voltageLevel: transformer.voltageLevel,
//                                 isEnergized: transformer.isEnergized,
//                                 geometry: new GeomCircle(Proj.fromLonLat(coordinate), 2)
//                             }));
//                         });
//                     });
//                 });

//             return { name, init, draw };
//         };

//         const style = (feature, resolution) => {
//             if (resolution < 10) {
//                 return new StyleStyle({
//                     stroke: new StyleStroke({
//                         color: (feature.get('isEnergized')) ? '#0000FF' : '#FFFFFF',
//                         width: 2
//                     })
//                 });
//             } else {
//                 return new StyleStyle({});
//             }
//         };

//         const calculateCirclePoints = (coord_start, coord_end) => {
//             const medianX = (coord_end[0] - coord_start[0]) / 2;
//             const medianY = (coord_end[1] - coord_start[1]) / 2;

//             const circle1 = [coord_start[0] + (medianX - (medianX * 0.2)), coord_start[1] + (medianY - (medianY * 0.2))];
//             const circle2 = [coord_start[0] + (medianX + (medianX * 0.2)), coord_start[1] + (medianY + (medianY * 0.2))];

//             return [circle1, circle2];
//         };

//         return { name, init, draw };
//     }

//     createLoadLayer() {
//         const name = 'load';
//         let layer: LayerVector = null;
//         let source: SourceVector = null;

//         const init = () => {
//             source = new SourceVector();
//             layer = new LayerVector({
//                 source: source,
//                 style: style
//             });
//             layer.set('type', FeatureType.load);
//             this.map.addLayer(layer);

//             return { name, init, draw };
//         };

//         const draw = () => {
//             this.geoService.getAllLoads()
//                 .subscribe(loads => {
//                     loads.forEach(load => {
//                         source.addFeature(new Feature({
//                             type: FeatureType.load,
//                             id: load.id,
//                             name: load.name,
//                             voltageLevel: load.voltageLevel,
//                             isEnergized: load.isEnergized,
//                             geometry: new GeomPoint(Proj.fromLonLat(load.coordinate))
//                         }));
//                     });
//                 });

//             return { name, init, draw };
//         };

//         const style = (feature, resolution) => {
//             if (resolution < 10) {
//                 return new StyleStyle({
//                     image: new StyleRegularShape({
//                         fill: new StyleFill({
//                             color: (feature.get('isEnergized')) ? '#00FF00' : '#FFFFFF'
//                         }),
//                         stroke: new StyleStroke({
//                             color: (feature.get('isEnergized')) ? '#00AA00' : '#666666',
//                             width: 1
//                         }),
//                         points: 3,
//                         radius: 8,
//                         rotation: Math.PI / 4,
//                         angle: 0
//                     }),
//                     text: new StyleText({
//                         font: '10px helvetica,sans-serif',
//                         text: (resolution < 4) ? feature.get('name') : '',
//                         rotation: Math.PI * 2,
//                         fill: new StyleFill({
//                             color: '#000'
//                         }),
//                         stroke: new StyleStroke({
//                             color: '#FFFFFF',
//                             width: 2
//                         }),
//                         offsetX: 5,
//                         offsetY: 20
//                     })
//                 });
//             } else {
//                 return new StyleStyle({});
//             }
//         };

//         return { name, init, draw };
//     }

//     createBreakerLayer() {
//         const name = 'breaker';
//         let layer: LayerVector = null;
//         let source: SourceVector = null;

//         const init = () => {
//             source = new SourceVector();
//             layer = new LayerVector({
//                 source: source,
//                 style: style
//             });
//             layer.set('type', FeatureType.breaker);
//             this.map.addLayer(layer);

//             return { name, init, draw };
//         };

//         const draw = () => {
//             this.geoService.getAllBreakers()
//                 .subscribe(breakers => {
//                     breakers.forEach(breaker => {
//                         source.addFeature(new Feature({
//                             type: FeatureType.breaker,
//                             id: breaker.id,
//                             name: breaker.name,
//                             isEnergized: breaker.isEnergized,
//                             state: breaker.state,
//                             geometry: new GeomPoint(Proj.fromLonLat(breaker.coordinate))
//                         }));
//                     });
//                 });

//             return { name, init, draw };
//         };

//         const style = (feature, resolution) => {
//             if (resolution < 10) {
//                 return new StyleStyle({
//                     image: new StyleRegularShape({
//                         fill: new StyleFill({
//                             color: (feature.get('isEnergized')) ? (feature.get('state') ? '#0000FF' : '#FFFFFF') : '#FFFFFF',
//                         }),
//                         stroke: new StyleStroke({
//                             color: (feature.get('isEnergized')) ? '#0000FF' : '#666666',
//                             width: 1
//                         }),
//                         points: 4,
//                         radius: 8,
//                         rotation: Math.PI / 4,
//                         angle: 0
//                     })
//                 });
//             } else {
//                 return new StyleStyle({});
//             }
//         };

//         return { name, init, draw };
//     }
// }
