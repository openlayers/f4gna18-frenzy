import 'ol/ol.css';
import {Draw, Modify, Snap} from 'ol/interaction';
import {fromLonLat} from 'ol/proj';
import {Style, Stroke} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {XYZ as XYZSource, Vector as VectorSource} from 'ol/source';
import dataURL from './data/north-carolina-districts.geojson';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import sync from 'ol-hashed';
import View from 'ol/View';

const source = new VectorSource({
  format: new GeoJSON(),
  url: dataURL
});

const map = new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new XYZSource({
        url: 'https://api.mapbox.com/styles/v1/tschaub/cjh7585xo2lcf2soz7wkbgkud/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHNjaGF1YiIsImEiOiJjaW5zYW5lNHkxMTNmdWttM3JyOHZtMmNtIn0.CDIBD8H-G2Gf-cPkIuWtRg'
      })
    }),
    new VectorLayer({
      source: source,
      style: [
        new Style({
          stroke: new Stroke({
            color: [255, 255, 255, 0.5],
            width: 6
          })
        }),
        new Style({
          stroke: new Stroke({
            color: [0, 153, 255, 1],
            width: 2
          })
        })
      ]
    }),
    new TileLayer({
      source: new XYZSource({
        url: 'https://api.mapbox.com/styles/v1/tschaub/cjh75hlvk00902rquajmff74y/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHNjaGF1YiIsImEiOiJjaW5zYW5lNHkxMTNmdWttM3JyOHZtMmNtIn0.CDIBD8H-G2Gf-cPkIuWtRg'
      })
    })
  ],
  view: new View({
    center: fromLonLat([-79.093, 35.224]),
    zoom: 7
  })
});

map.addInteraction(new Modify({source: source}));
map.addInteraction(new Draw({type: 'Polygon', source: source}));
map.addInteraction(new Snap({source: source}));

sync(map);
