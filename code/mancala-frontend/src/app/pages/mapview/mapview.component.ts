import * as _ from 'lodash';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../../service/message.service';
import { GameService } from '../../service/game.service';

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
        private gameService: GameService,
    ) { }

    // map
    map: Map;
    contextMenu;
    boardLayer;
    boardSource;

    playerIndex;
    playerId;
    gameId;
    isYourTurn: boolean;

    board = {
        player1:
        {
            kalah:
            {
                'owner': 1, 'coord': [35.500040, 38.699970], 'count': 6
            },
            pits: [
                { 'owner': 1, num: 1, 'coord': [35.500350, 38.700000], 'count': 6 },
                { 'owner': 1, num: 2, 'coord': [35.500300, 38.700000], 'count': 6 },
                { 'owner': 1, num: 3, 'coord': [35.500250, 38.700000], 'count': 6 },
                { 'owner': 1, num: 4, 'coord': [35.500200, 38.700000], 'count': 6 },
                { 'owner': 1, num: 5, 'coord': [35.500150, 38.700000], 'count': 6 },
                { 'owner': 1, num: 6, 'coord': [35.500100, 38.700000], 'count': 6 }
            ]
        },
        player2:
        {
            kalah:
            {
                'owner': 2, 'coord': [35.500410, 38.699970], 'count': 6
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

    startGame(evt) {
        this.gameService.joinGame()
            .subscribe(res => {
                this.playerId = res.playerId;
                this.gameId = res.gameId;
                this.playerIndex = res.playerIndex;

                console.log('Game Connected:');
                console.log('Game Id: ' + this.gameId);
                console.log('Player Id: ' + this.playerId);
                console.log('Player Index: ' + this.playerIndex);
            });

        setInterval(() => {
            this.refreshGameStatus();
        }, 5000);
    }

    makeMove(pitNum) {
        console.log('Move: ' + pitNum);

        this.isYourTurn = false;
        this.gameService.sendMove(this.playerId, this.gameId, pitNum)
            .subscribe(res => {
                this.updateBoardData(res);
                this.refreshMapSource();
            });
    }

    refreshGameStatus() {
        this.gameService.getGameStatus(this.gameId)
            .subscribe(res => {
                this.updateBoardData(res);
                this.refreshMapSource();

                this.isYourTurn = (res.activePlayerId === this.playerId);
            });
    }

    updateBoardData(data) {
        this.board.player1.kalah.count = data.board.playerKalahs[0];
        this.board.player2.kalah.count = data.board.playerKalahs[1];

        const pl1Pits = data.board.playerPits[0];
        for (let i = 0; i < pl1Pits.length; i++) {
            this.board.player1.pits[i].count = pl1Pits[i];
        }
        const pl2Pits = data.board.playerPits[1];
        for (let i = 0; i < pl2Pits.length; i++) {
            this.board.player2.pits[i].count = pl2Pits[i];
        }
    }


    initializeMap() {
        this.map = new Map({
            target: 'map',
            layers: [],
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
            defaultItems: true, // defaultItems are (for now) Zoom In/Zoom Out
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

        this.boardSource = new SourceVector();
        this.boardLayer = new LayerVector({
            source: this.boardSource,
            style: styleFunct
        });

        this.map.addLayer(this.boardLayer);
    }

    refreshMapSource() {
        this.boardSource.clear();

        this.boardSource.addFeature(new Feature({
            owner: this.board.player1.kalah.owner,
            count: this.board.player1.kalah.count,
            geometry: new GeomCircle(Proj.fromLonLat(this.board.player1.kalah.coord), 3)
        }));
        this.board.player1.pits.forEach(pit => {
            this.boardSource.addFeature(new Feature({
                owner: pit.owner, num: pit.num, count: pit.count, geometry: new GeomCircle(Proj.fromLonLat(pit.coord), 2)
            }));
        });
        this.boardSource.addFeature(new Feature({
            owner: this.board.player2.kalah.owner,
            count: this.board.player2.kalah.count,
            geometry: new GeomCircle(Proj.fromLonLat(this.board.player2.kalah.coord), 3)
        }));
        this.board.player2.pits.forEach(pit => {
            this.boardSource.addFeature(new Feature({
                owner: pit.owner, num: pit.num, count: pit.count, geometry: new GeomCircle(Proj.fromLonLat(pit.coord), 2)
            }));
        });
    }

    registerEvents() {
        this.contextMenu.on('beforeopen', evt => {
            const featureFound = this.map.forEachFeatureAtPixel(evt.pixel, ft => ft);
            if (featureFound.get('owner') === this.playerIndex && featureFound.get('num') && this.isYourTurn) {
                this.contextMenu.enable();
            } else {
                this.contextMenu.disable();
            }
        });

        this.contextMenu.on('open', evt => {
            const feature = this.map.forEachFeatureAtPixel(evt.pixel, ft => ft);

            if (feature.get('owner') === this.playerIndex && feature.get('num') && this.isYourTurn) {
                this.contextMenu.clear();

                this.contextMenu.extend([{
                    text: 'Play',
                    classname: 'bold',
                    callback: () => {
                        this.makeMove(feature.get('num'));
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
        this.refreshMapSource();
        this.registerEvents();
    }
}
