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

// import { MapPopupHelper } from './map.popup.helper';

// export class MapEventHelper {
//     constructor(
//         private map: Map,
//         private contextMenu: any,
//         private layers: Array<any>,
//         private popups: any,
//         private popupHelper: MapPopupHelper,
//         private outageService: OutageService,
//     ) { }

//     registerEventHandlers(): any {
//         this.map.on('singleclick', evt => {
//             const features = this.map.forEachFeatureAtPixel(evt.pixel,
//                 (feature, layer) => {
//                     // console.log(feature);
//                     console.log('Name: ', feature.get('name'));
//                     return [feature, layer];
//                 });
//         });

//         // display left-click popup on click
//         this.map.on('singleclick', evt => {
//             this.popupHelper.hidePopup();

//             const features = this.map.forEachFeatureAtPixel(evt.pixel,
//                 (feature, layer) => {
//                     if (feature) {
//                         // const geometry = feature.getGeometry();
//                         // const coord = geometry.getCoordinates();
//                         const popupOverlay = this.popupHelper.createPopup(feature);
//                         popupOverlay.setPosition(evt.coordinate);
//                     }
//                 });
//         });

//         this.map.getView().on('change:resolution', evt => {
//             // this.layers.forEach(layer => layer.redra);
//         });

//         this.contextMenu.on('beforeopen', evt => {
//             const featureFound = this.map.forEachFeatureAtPixel(evt.pixel, ft => ft);

//             if (featureFound) {
//                 this.contextMenu.enable();
//             } else {
//                 this.contextMenu.disable();
//             }
//         });

//         this.contextMenu.on('open', evt => {
//             const feature = this.map.forEachFeatureAtPixel(evt.pixel, ft => ft);

//             if (feature.get('type') === FeatureType.breaker) {
//                 this.contextMenu.clear();

//                 const isSwitchClosed = feature.get('state');
//                 this.contextMenu.extend([{
//                     text: isSwitchClosed ? 'Open Switch' : 'Close Switch',
//                     classname: 'bold',
//                     callback: () => {
//                         this.outageService.handleSwitchStatusChange(feature.get('id'), feature.get('state')).subscribe(elements => {
//                             this.map.getLayers().forEach(layer => {
//                                 if ([FeatureType.line, FeatureType.transformer, FeatureType.load].includes(layer.get('type'))) {
//                                     layer.getSource().getFeatures().forEach(elem => {
//                                         if (elements.includes(elem.get('id'))) {
//                                             elem.set('isEnergized', false);
//                                         }
//                                     });
//                                 }
//                             });
//                         });
//                     }
//                 }]);
//                 this.contextMenu.extend(this.contextMenu.getDefaultItems());
//             } else {
//                 this.contextMenu.clear();
//                 this.contextMenu.extend(this.contextMenu.getDefaultItems());
//             }
//         });
//     }
// }
