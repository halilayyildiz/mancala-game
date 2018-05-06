// import * as _ from 'lodash';

// import { MessageService } from '../../service/message.service';
// import { OutageService } from '../../service/outage.service';


// import Map from 'ol/map';
// import Proj from 'ol/proj';
// import View from 'ol/view';
// import Feature from 'ol/feature';
// import Overlay from 'ol/overlay';
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

// export class MapPopupHelper {
//     constructor(
//         private map: Map,
//         private popups: any,
//         private outageService: OutageService
//     ) { }

//     popupOverlay;
//     popupContent;

//     initPopup() {
//         this.popupContent = document.getElementById('popup-content');
//         const popupContainer = document.getElementById('popup');
//         const closer = document.getElementById('popup-closer');

//         const popupOverlay = new Overlay({
//             element: popupContainer,
//             autoPan: true,
//             autoPanAnimation: {
//                 duration: 250
//             }
//         });
//         this.map.addOverlay(popupOverlay);

//         closer.onclick = function () {
//             popupOverlay.setPosition(undefined);
//             closer.blur();
//             return false;
//         };

//         this.popupOverlay = popupOverlay;
//     }

//     createPopup(feature) {
//         const elem = <any>{};

//         const construct = (() => {
//             elem.id = feature.get('id');
//             elem.name = feature.get('name');
//             elem.type = feature.get('type');
//             elem.voltageLevel = feature.get('voltageLevel');

//             switch (feature.get('type')) {
//                 case FeatureType.outage:
//                     {
//                         // elem.id = 'outage';
//                         break;
//                     }

//                 case FeatureType.line:
//                     {
//                         // elem.id = 'line';
//                         break;
//                     }
//                 case FeatureType.transformer:
//                     {
//                         // elem.id = 'transformer';
//                         break;
//                     }
//                 case FeatureType.load:
//                     {
//                         // elem.id = 'load';
//                         break;
//                     }
//                 case FeatureType.breaker:
//                     {
//                         // elem.id = 'breaker';
//                         elem.state = feature.get('state');
//                         break;
//                     }
//                 default:
//                     {
//                         console.log('Unknown popup type for feature: ' + feature.get('type'));
//                     }
//             }

//             this.popupContent.innerHTML = this.createHTMLTemplate(elem);
//         })();

//         return this.popupOverlay;
//     }

//     createHTMLTemplate = (elem) => {

//         switch (elem.type) {
//             case FeatureType.outage:
//                 {
//                     return `
//                     <div>
//                         <div><span> Id: ${elem.id}</span></div>
//                         <div><span> Type: ${_.startCase(elem.type)}</span></div>
//                         <div><span> Name: ${elem.name}</span></div>
//                         <div><span> Voltage Level : ${elem.voltageLevel}</span></div>
//                     </div>
//                     `;
//                 }
//             case FeatureType.transformer:
//                 {
//                     return `
//                     <div>
//                         <div><span> Id: ${elem.id}</span></div>
//                         <div><span> Type: ${_.startCase(elem.type)}</span></div>
//                         <div><span> Name: ${elem.name}</span></div>
//                         <div><span> Voltage Level : ${elem.voltageLevel}</span></div>
//                     </div>
//                     `;
//                 }
//             case FeatureType.line:
//                 {
//                     return `
//                     <div>
//                         <div><span> Id: ${elem.id}</span></div>
//                         <div><span> Type: ${_.startCase(elem.type)}</span></div>
//                         <div><span> Name: ${elem.name}</span></div>
//                         <div><span> Voltage Level : ${elem.voltageLevel}</span></div>
//                     </div>
//                     `;
//                 }
//             case FeatureType.load:
//                 {
//                     return `
//                     <div>
//                         <div><span> Id: ${elem.id}</span></div>
//                         <div><span> Type: ${_.startCase(elem.type)}</span></div>
//                         <div><span> Name: ${elem.name}</span></div>
//                         <div><span> Voltage Level : ${elem.voltageLevel}</span></div>
//                     </div>
//                     `;
//                 }
//             case FeatureType.breaker:
//                 {
//                     return `
//                     <div>
//                         <div><span> Id: ${elem.id}</span></div>
//                         <div><span> Type: ${_.startCase(elem.type)}</span></div>
//                         <div><span> Name: ${elem.name}</span></div>
//                         <div><span> State : ${elem.state ? 'Close' : 'Open'}</span></div>
//                     </div>
//                     `;
//                 }
//             default:
//                 {
//                     console.log('Unknown popup type for feature: ' + elem.type);
//                 }
//         }

//         return `
//         <div>
//             <div><span> Unknown feature type </span></div>
//         </div>
//         `;
//     }

//     hidePopup() {
//         this.popupOverlay.setPosition(undefined);
//     }

// }
