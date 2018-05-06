import * as _ from 'lodash';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../../service/message.service';
import { OutageService } from '../../service/outage.service';

import * as ContextMenu from 'ol-contextmenu';
import Map from 'ol/map';
import Proj from 'ol/proj';
import View from 'ol/view';
import Feature from 'ol/feature';
import Control from 'ol/control/control';
import ControlOverviewMap from 'ol/control/overviewmap';
import ConntrolZoomSlider from 'ol/control/zoomslider';
import SourceBingMaps from 'ol/source/bingmaps';
import LayerTile from 'ol/layer/tile';
import SourceXYZ from 'ol/source/xyz';
import LayerVector from 'ol/layer/vector';
import SourceVector from 'ol/source/vector';
import GeomPoint from 'ol/geom/point';
import GeomCircle from 'ol/geom/circle';
import GeomLineString from 'ol/geom/linestring';
import StyleStyle from 'ol/style/style';
import StyleRegularShape from 'ol/style/regularshape';
import StyleIcon from 'ol/style/icon';
import StyleText from 'ol/style/text';
import StyleCircle from 'ol/style/circle';
import StyleFill from 'ol/style/fill';
import StyleStroke from 'ol/style/stroke';

import './../../../../node_modules/ol-contextmenu/dist/ol-contextmenu.css';

@Component({
    selector: 'noms-mapview',
    templateUrl: './mapview.component.html',
    styleUrls: ['./mapview.scss', './../../../../node_modules/ol-contextmenu/dist/ol-contextmenu.css']
})

export class MapviewComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private outageService: OutageService,
    ) { }

    // map
    map: Map;
    contextMenu;
    boardLayer;
    playerId = 1;

    board = {
        player1:
        {
            kalah:
            {
                'owner': 1, 'coord': [35.500040, 38.699970], 'count': 6
            },
            pits: [
                { 'owner': 1, num: 1, 'coord': [35.500100, 38.700000], 'count': 6 },
                { 'owner': 1, num: 2, 'coord': [35.500150, 38.700000], 'count': 6 },
                { 'owner': 1, num: 3, 'coord': [35.500200, 38.700000], 'count': 6 },
                { 'owner': 1, num: 4, 'coord': [35.500250, 38.700000], 'count': 6 },
                { 'owner': 1, num: 5, 'coord': [35.500300, 38.700000], 'count': 6 },
                { 'owner': 1, num: 6, 'coord': [35.500350, 38.700000], 'count': 6 }
            ]
        },
        player2:
        {
            kalah:
            {
                'owner': 2, 'coord': [35.500410, 38.699970],
                'count': 6
            },
            pits: [
                { 'owner': 2, num: 1, 'coord': [35.500100, 38.699950], 'count': 6 },
                { 'owner': 2, num: 2, 'coord': [35.500150, 38.699950], 'count': 6 },
                { 'owner': 2, num: 3, 'coord': [35.500200, 38.699950], 'count': 6 },
                { 'owner': 2, num: 4, 'coord': [35.500250, 38.699950], 'count': 6 },
                { 'owner': 2, num: 5, 'coord': [35.500300, 38.699950], 'count': 6 },
                { 'owner': 2, num: 6, 'coord': [35.500350, 38.699950], 'count': 6 }
            ]
        }
    };


    initializeMap() {
        const styles = [
        ];
        const layers = [];
        // let i, ii;
        // for (i = 0, ii = styles.length; i < ii; ++i) {
        //     layers.push(new LayerTile({
        //         preload: Infinity,
        //         source: new SourceBingMaps({
        //             key: 'AkS0TR-kj4QuraHNThgKOXWr9lZTq3CD32_AFT05mQfVqMvBQL7dYacpTCecYZPi',
        //             imagerySet: styles[i]
        //             // use maxZoom 19 to see stretched tiles instead of the BingMaps
        //             // "no photos at this zoom level" tiles
        //             // maxZoom: 19
        //         })
        //     }));
        // }

        // layers.push(new LayerTile({
        //     visible: false,
        //     source: new SourceXYZ({
        //         url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        //     })
        // }));

        this.map = new Map({
            target: 'map',
            layers: layers,
            view: new View({
                center: Proj.fromLonLat([35.500240, 38.699940]),
                zoom: 21.4,
                minZoom: 4,
                maxZoom: 22
            }),
            controls: []
        });

        this.contextMenu = new ContextMenu({
            width: 170,
            defaultItems: false, // defaultItems are (for now) Zoom In/Zoom Out
            items: []
        });
        this.map.addControl(this.contextMenu);

    }

    draw() {
        const styleFunct = (feature, resolution) => {
            return new StyleStyle({
                stroke: new StyleStroke({
                    color: feature.get('owner') === 1 ? '#0000FF' : '#FF0000',
                    width: 2
                }),
                text: new StyleText({
                    font: '16px helvetica,sans-serif',
                    text: feature.get('count') + '',
                    rotation: Math.PI * 2,
                    fill: new StyleFill({
                        color: '#000000'
                    }),
                    stroke: new StyleStroke({
                        color: '#FFFFFF',
                        width: 5
                    }),
                })
            });
        };

        const source = new SourceVector();
        this.boardLayer = new LayerVector({
            source: source,
            style: styleFunct
        });

        source.addFeature(new Feature({
            owner: this.board.player1.kalah.owner, count: this.board.player1.kalah.count,
            geometry: new GeomCircle(Proj.fromLonLat(this.board.player1.kalah.coord), 3)
        }));
        this.board.player1.pits.forEach(pit => {
            source.addFeature(new Feature({
                owner: pit.owner, num: pit.num, count: pit.count, geometry: new GeomCircle(Proj.fromLonLat(pit.coord), 2)
            }));
        });
        source.addFeature(new Feature({
            owner: this.board.player2.kalah.owner, count: this.board.player2.kalah.count,
            geometry: new GeomCircle(Proj.fromLonLat(this.board.player2.kalah.coord), 3)
        }));
        this.board.player2.pits.forEach(pit => {
            source.addFeature(new Feature({
                owner: pit.owner, num: pit.num, count: pit.count, geometry: new GeomCircle(Proj.fromLonLat(pit.coord), 2)
            }));
        });

        this.map.addLayer(this.boardLayer);

    }

    registerEvents() {
        this.contextMenu.on('beforeopen', evt => {
            const featureFound = this.map.forEachFeatureAtPixel(evt.pixel, ft => ft);
            if (featureFound.get('owner') === this.playerId && featureFound.get('num')) {
                this.contextMenu.enable();
            } else {
                this.contextMenu.disable();
            }
        });

        this.contextMenu.on('open', evt => {
            const feature = this.map.forEachFeatureAtPixel(evt.pixel, ft => ft);

            if (feature.get('owner') === this.playerId && feature.get('num')) {
                this.contextMenu.clear();

                this.contextMenu.extend([{
                    text: 'Play',
                    classname: 'bold',
                    callback: () => {
                        console.log(`Play: ${this.playerId} - ${feature.get('num')}`);
                    }
                }]);
            } else {
                this.contextMenu.clear();
            }
        });
    }

    ngOnInit() {
        this.initializeMap();
        this.draw();
        this.registerEvents();
    }
}
