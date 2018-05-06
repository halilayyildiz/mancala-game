import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import * as ol from 'openlayers/dist/ol-debug';
import {HttpClient} from "@angular/common/http";
import {MapRightBarComponent} from "../../component/map-right-bar/map-right-bar.component";
import {GisElement} from "../../model/gis-element";
import {ServiceConstant} from "../../../../config/service.constant";
import {Subscription} from "rxjs/Subscription";
import {NotificationsService} from "../../../../core/service/notifications.service";
import {GisConstant} from "../../../../config/gis.constant";
import {GisService} from "../../../../core/service/api/gis.service";
import {GisFacility} from "../../model/gis-facility";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  providers: []
})
export class MapsComponent implements OnInit, OnDestroy {
  zoomLevel = 11.35;
  gisElementList: GisElement[] = [];
  subscriptionLayerSelection: Subscription;
  subscriptionLayerUnSelection: Subscription;
  subscriptionOnDmaDetailsDialogShow: Subscription;
  gisFacilityForDetails: GisFacility;
  gisFacilityDetailsVisible: boolean = false;

  @ViewChild('gisListContainer') public gisListViewContainer: any;
  @ViewChild('gisListContent') public gisListViewContent: any;
  @ViewChild('gisListCloser') public gisListViewCloser: any;
  @ViewChild('rightBar') public rightBarView: MapRightBarComponent;

  selectSingleClick: ol.interaction.Select;

  pipeVectorLayer: ol.layer.Vector;
  valveVectorLayer: ol.layer.Vector;
  waterTankVectorLayer: ol.layer.Vector;
  hydrantVectorLayer: ol.layer.Vector;
  facilityVectorLayer: ol.layer.Vector;
  pipeListWithFacilityMap = {};
  hitTolerance: number = 1;

  dmaSelected: boolean = false;
  waterTankSelected: boolean = false;

  constructor(private http: HttpClient,
              private notificationsService: NotificationsService,
              private gisService: GisService) {
  }

  ngOnInit(): void {
    this.gisFacilityDetailsVisible = false;
    let me = this;
    let map = this.createInitialMap();
    const overlay = this.createInfoOverlay(map, me);
    this.addMapControls(map);

    this.createPipeVector(map);

    this.selectSingleClick = new ol.interaction.Select({multi: true, hitTolerance: this.hitTolerance});
    map.addInteraction(this.selectSingleClick);

    map.on('click', function (e) {
      me.handleMapClick(me, map, e, overlay);
    });

    this.subscribeToNotifications(map);
  }

  styleFunction(me: this) {
    return (feature, resolution): [ol.style.Style] => {
      //  console.log(this.pipeListWithFacilityMap);
      let style;
      let inTextYn;
      let intextDetailYn;
      resolution < 0.5 ? inTextYn = 'Y' : inTextYn = 'N';
      resolution < 0.1 ? intextDetailYn = 'Y' : intextDetailYn = 'N';
      switch (feature.getGeometry().getType()) {
        case 'LineString' : {
          let gisPipe = me.pipeListWithFacilityMap[feature.getProperties().ID];
          if (gisPipe) {
            style = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: '#' + gisPipe.gisFacility.id.substring(0, 6),
                width: 6
              }),
              text: me.createTextStyle(feature, 'white', '2', inTextYn, intextDetailYn)
            });
          }
          break;
        }
        case 'MultiLineString' : {
          let gisPipe = me.pipeListWithFacilityMap[feature.getProperties().ID];
          if (gisPipe) {
            style = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: '#' + gisPipe.gisFacility.id.substring(0, 6),
                width: 6
              }),
              text: me.createTextStyle(feature, 'BLACK', '2', inTextYn, intextDetailYn)
            });
          }
          else {
            style = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 255, 1.0)',
                width: 2
              }),
              text: me.createTextStyle(feature, 'BLACK', '1', inTextYn, intextDetailYn)
            })
          }
          break;
        }
        //todo if we have to do this
        case 'Polygon' : {
          /*resolution < 5 ? inTextYn = textYn : inTextYn = 'N';
          style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: strokeColor,
              width: strokeWidth
            }),
            text: me.createTextStyle(feature, textColor, textWidth, inTextYn, 'N')
          });*/
          break;
        }
        //todo if we have to do this
        case 'Point' : {
          /*if (typeof feature.get('elementTypeId') !== 'undefined')
          {
            style = new ol.style.Style({
              text: me.createTextStyle(feature, textColor, textWidth, inTextYn, 'N'),
              image: new ol.style.Icon({
                scale : resolution >  1  ? 1/(resolution): 1,
                src: getImageUrl(feature.get('elementTypeId'), feature.get('elementSubTypeId')),
                rotation: (feature.get('elementTypeId') === 2 || feature.get('elementTypeId') === 3) ? feature.get('styleAngle') * 0.0174532925 : 0
              })
            });
          }*/
          break;
        }
      }
      return [style];
    };
  }

  createTextStyle(feature, color, width, textYn, textDetailYn) {
    let style = null;
    let desc;
    if (feature) {
      if (typeof feature.get('DIAMETER') === 'undefined' &&
        typeof feature.get('SHORT_NAME') === 'undefined' &&
        typeof feature.get('LENGTH') === 'undefined')
        desc = '';
      else
        desc = feature.get('DIAMETER') + 'Ø ' + feature.get('SHORT_NAME') + ' ';
      style = new ol.style.Text({
        textAlign: 'left',
        offsetX: 10,
        offsetY: 10,
        rotateWithView: true,
        font: '12px Arial',
        text: (textYn === 'Y' ? desc : '') + (textDetailYn === 'Y' ? (feature.get('LENGTH') + 'M') : ''),
        fill: new ol.style.Fill({color: color, width: width}),
        stroke: new ol.style.Stroke({color: 'white', width: 1})
      });
    }
    return style;
  }

  subscribeToNotifications(map) {
    this.subscriptionLayerSelection = this.notificationsService.notificationLayerSelected
      .subscribe((id: string) => {
        map.addLayer(this.getLayerById(id));
      });

    this.subscriptionLayerUnSelection = this.notificationsService.notificationLayerUnSelected
      .subscribe((id: string) => {
        map.removeLayer(this.getLayerById(id));
      });

    this.subscriptionOnDmaDetailsDialogShow = this.notificationsService.notificationOnDmaDetailsDialogShow.subscribe((gisFacility: GisFacility) => {
      this.gisFacilityForDetails = gisFacility;
      this.gisFacilityDetailsVisible = true;
    });
  }

  getLayerById(id: string) {
    switch (id) {
      case 'PIPE_LAYER' : {
        return this.pipeVectorLayer;
      }
      case 'VALVE_LAYER' : {
        return this.valveVectorLayer;
      }
      case 'WATER_TANK_LAYER' : {
        return this.waterTankVectorLayer;
      }
      case 'HYDRANT_LAYER' : {
        return this.hydrantVectorLayer;
      }
      case 'FACILITY_LAYER' : {
        return this.facilityVectorLayer;
      }
    }
  }

  ngOnDestroy() {
    this.subscriptionLayerSelection.unsubscribe();
    this.subscriptionLayerUnSelection.unsubscribe();
  }

  createPipeVector(map): void {
    const me = this;

    const pipeVectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON,
      projection: 'EPSG:3857',

      loader: function (extent, resolution, projection) {
        const f = ol.format.filter;
        console.log('loading ' + map.getView().getZoom());
        let query;
        let bbox = f.bbox('GEOM', extent, 'urn:ogc:def:crs:EPSG::3857');
        if (map.getView().getZoom() < 16) {
          query = f.and(
            bbox,
            f.or(f.equalTo(GisConstant.PIPE_TYPE_COLUMN_NAME, 'FORCE_MAIN_PIPE'),
              f.equalTo(GisConstant.PIPE_TYPE_COLUMN_NAME, 'TRANSMISSION_PIPE'),
              f.equalTo(GisConstant.PIPE_TYPE_COLUMN_NAME, 'SUPPLY_PIPE'))
          );
        }
        else if (map.getView().getZoom() >= 16 && map.getView().getZoom() < 19) {
          query = f.and(
            bbox,
            f.notEqualTo(GisConstant.PIPE_TYPE_COLUMN_NAME, 'SUBSCRIBER_PIPE')
          );
        }
        else {
          query = bbox;
        }

        const request = new ol.format.WFS().writeGetFeature({
          srsName: 'urn:ogc:def:crs:EPSG::3857',
          featureNS: 'http://openstreetmap.org',
          featurePrefix: ServiceConstant.GEOSERVER_FEATURE_PREFIX,
          featureTypes: ['GIS_PIPE'],
          outputFormat: 'application/json',
          filter: query
        });
        me.http.post(ServiceConstant.GEOSERVER_URL + '/ibys/ows',
          new XMLSerializer().serializeToString(request))
          .subscribe(data => {
              const features = new ol.format.GeoJSON().readFeatures(data);
              pipeVectorSource.addFeatures(features);
            },
            err => {
              console.log(err);
            });
      },
      strategy: ol.loadingstrategy.bbox
    });

    const valveVectorSource = this.createVectorSource(map, me, 'GIS_VALVE', 16);
    const waterTankVectorSource = this.createVectorSource(map, me, 'GIS_WATERTANK', 10);
    const hydrantVectorSource = this.createVectorSource(map, me, 'GIS_HYDRANT', 16);
    const facilityVectorSource = this.createVectorSource(map, me, 'GIS_FACILITY', 10);

    this.pipeVectorLayer = new ol.layer.Vector({
      source: pipeVectorSource,
      name: 'PIPE_LAYER',
      style: me.styleFunction(me)
    });

    this.valveVectorLayer = new ol.layer.Vector({
      source: valveVectorSource,
      name: 'VALVE_LAYER',
      style: function (feature, resolution) {
        return new ol.style.Style({
          image: new ol.style.Icon({
            scale: resolution > 1 ? 1 / (resolution) : 1,
            src: '/assets/images/valve.png'
          })
        })
      }
    });

    this.waterTankVectorLayer = new ol.layer.Vector({
      source: waterTankVectorSource,
      name: 'WATER_TANK_LAYER'
    });

    this.hydrantVectorLayer = new ol.layer.Vector({
      source: hydrantVectorSource,
      name: 'HYDRANT_LAYER',
      style: function (feature, resolution) {
        return new ol.style.Style({
          image: new ol.style.Icon({
            scale: resolution > 1 ? 1 / (resolution) : 1,
            src: '/assets/images/hydrant.png'
          })
        })
      }
    });

    this.facilityVectorLayer = new ol.layer.Vector({
      source: facilityVectorSource,
      name: 'FACILITY_LAYER'
    });

    function onMoveEnd() {
      if (map.getView().getZoom() != me.zoomLevel) {
        me.zoomLevel = map.getView().getZoom();
        if (me.zoomLevel > 11 && me.zoomLevel <= 13) {
          me.hitTolerance = 2;
        }
        else if (me.zoomLevel > 13 && me.zoomLevel <= 15) {
          me.hitTolerance = 4;
        }
        else if (me.zoomLevel > 15 && me.zoomLevel <= 17) {
          me.hitTolerance = 6;
        }
        else {
          me.hitTolerance = 10;
        }
        me.selectSingleClick.setHitTolerance(me.hitTolerance);

        pipeVectorSource.clear(true);
        valveVectorSource.clear(true);
        waterTankVectorSource.clear(true);
        hydrantVectorSource.clear(true);
        facilityVectorSource.clear(true);
      }
    }

    map.on('moveend', onMoveEnd);
  }

  onGisElementSelected(event: any) {
    this.openRightBar(event.data);
  }

  openRightBar(data: GisElement) {
    if (data.type === 'facility') {
      this.gisService.getPipesWithFacilityId(data.id).subscribe((res) => {
        if (res.status == 200) {
          for (let obj of res.body) {
            this.pipeListWithFacilityMap[obj.id] = obj;
          }
          this.pipeVectorLayer.getSource().clear();
        }
      }, (error) => {
        console.log(error);
      });
      this.dmaSelected = true;
    } else if (data.type === 'waterTank') {
      this.gisService.getPipesWithWaterTankId(data.id).subscribe((res) => {
        if (res.status == 200) {
          for (let obj of res.body) {
            this.pipeListWithFacilityMap[obj.id] = obj;
          }
          this.pipeVectorLayer.getSource().clear();
        }
      }, (error) => {
        console.log(error);
      });
      this.waterTankSelected = true;
    }
    else {
      this.pipeListWithFacilityMap = {};
      this.dmaSelected = false;
      this.waterTankSelected = false;
    }
    this.selectSingleClick.getFeatures().clear();
    this.rightBarView.displayGisElement(data);
    this.selectSingleClick.getFeatures().push(data.feature);
  }

  handleMapClick(me: this, map: any, e: any, overlay: ol.Overlay) {
    me.gisElementList = [];
    me.pipeListWithFacilityMap = {};

    map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      if (layer && feature) {
        let element: GisElement = me.createGisElement(layer, feature);
        me.gisElementList.push(element);
        /*
                me.selectSingleClick.getFeatures().push(feature);*/
      }
    }, {
      hitTolerance: me.hitTolerance
    });

    if (me.gisElementList.length > 1) {
      const coordinate = e.coordinate;
      overlay.setPosition(coordinate);
    } else if (me.gisElementList.length === 1) {
      overlay.setPosition(undefined);
      this.openRightBar(me.gisElementList[0]);
    } else {
      overlay.setPosition(undefined);
      if (me.dmaSelected || me.waterTankSelected) {
        me.pipeVectorLayer.getSource().clear();
        me.dmaSelected = false;
        me.waterTankSelected = false;
      }
    }
  }

  private createGisElement(layer, feature) {
    let element: GisElement = {};
    switch (layer.get("name")) {
      case 'PIPE_LAYER' : {
        element.type = 'pipe';
        break;
      }
      case 'VALVE_LAYER' : {
        element.type = 'valve';
        break;
      }
      case 'WATER_TANK_LAYER' : {
        element.type = 'waterTank';
        break;
      }
      case 'HYDRANT_LAYER' : {
        element.type = 'hydrant';
        break;
      }
      case 'FACILITY_LAYER' : {
        element.type = 'facility';
        break;
      }
    }
    element.id = feature.get("ID");
    element.integrationId = feature.get("INTEGRATION_ID");
    element.feature = feature;
    return element;
  }

//creates initial map
  private createInitialMap() {
    let map = new ol.Map({
      target: 'map',
      view: new ol.View({
        center: ol.proj.fromLonLat([29.756, 40.7711737]),
        zoom: this.zoomLevel
      })
    });
    map.addLayer(new ol.layer.Tile({
      source: new ol.source.OSM()
    }));

    /* const kocaeliMapLayer = new ol.layer.Image({
       source: new ol.source.ImageWMS({
         ratio: 1,
         url: 'http://tileservices.kocaeli.bel.tr:80/geoserver/kbb/wms',
         params: {
           'FORMAT': 'image/png',
           'VERSION': '1.1.1',
           STYLES: '',
           LAYERS: 'kbb:hybrid_layer_group',
         }
       })
     });*/
    const buildingLayer = new ol.layer.Image({
      minResolution: 0,
      maxResolution: 0.5,
      source: new ol.source.ImageWMS({
        ratio: 1,
        url: ServiceConstant.GEOSERVER_URL + '/ibys/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.1.1',
          STYLES: '',
          LAYERS: 'ibys:izmit_bina',
        }
      })
    });
    // map.addLayer(kocaeliMapLayer);
    map.addLayer(buildingLayer);

    return map;
  }

  //creates info overlay for showing details of watertank, valve, pipe etc.
  private createInfoOverlay(map: any, me: this) {
    const overlay = new ol.Overlay({
      element: this.gisListViewContainer.nativeElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    map.addOverlay(overlay);

    this.gisListViewCloser.nativeElement.onclick = function () {
      overlay.setPosition(undefined);
      me.gisElementList = [];
      return false;
    };
    return overlay;
  }

  private addMapControls(map: any) {
    const zoomSlider = new ol.control.ZoomSlider();
    map.addControl(zoomSlider);
  }

  private createVectorSource(map: ol.Map, me, featuretype: string, zoomLevel: number) {
    const vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON,
      projection: 'EPSG:3857',

      loader: function (extent, resolution, projection) {
        if (map.getView().getZoom() > zoomLevel) {
          const f = ol.format.filter;
          const request = new ol.format.WFS().writeGetFeature({
            srsName: 'urn:ogc:def:crs:EPSG::3857',
            featureNS: 'http://openstreetmap.org',
            featurePrefix: ServiceConstant.GEOSERVER_FEATURE_PREFIX,
            featureTypes: [featuretype],
            outputFormat: 'application/json',
            filter: f.bbox('GEOM', extent, 'urn:ogc:def:crs:EPSG::3857')
          });
          me.http.post(ServiceConstant.GEOSERVER_URL + '/ibys/ows',
            new XMLSerializer().serializeToString(request))
            .subscribe(data => {
                const features = new ol.format.GeoJSON().readFeatures(data);
                vectorSource.addFeatures(features);
              },
              err => {
                console.log(err);
              });
        }
      },
      strategy: ol.loadingstrategy.bbox
    });
    return vectorSource;
  }

}
