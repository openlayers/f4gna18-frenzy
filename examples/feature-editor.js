import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {XYZ as XYZSource, Vector as VectorSource} from 'ol/source';
import View from 'ol/View';
import sync from 'ol-hashed';
import dataURL from './data/nc-districts.geojson';
import {fromLonLat} from 'ol/proj';
import {Draw, Modify, Snap} from 'ol/interaction';
import {Style, Stroke} from 'ol/style';

const source =        new VectorSource({
  format: new GeoJSON(),
  url: dataURL
});

const map = new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new XYZSource({
        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
      })
    }),
    new VectorLayer({
      source: source,
      style: new Style({
        stroke: new Stroke({
          color: [0, 153, 255, 1]
        })
      })
    })
  ],
  view: new View({
    center: fromLonLat([-78.6555, 35.7938]),
    zoom: 10.5
  })
});

map.addInteraction(new Modify({source: source}));
map.addInteraction(new Draw({type: 'Polygon', source: source}));
map.addInteraction(new Snap({source: source}));

sync(map);
