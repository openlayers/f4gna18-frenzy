import 'ol/ol.css';
import {fromLonLat} from 'ol/proj';
import {Style, Fill, Stroke} from 'ol/style';
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

const minSession = 108;
const maxSession = 112;
let selectedSession;

const output = document.getElementById('output');
for (let session = maxSession; session >= minSession; --session) {
  const anchor = document.createElement('a');
  anchor.innerHTML = session;
  anchor.dataset.session = session;
  anchor.addEventListener('mouseover', event => {
    selectedSession = event.target.dataset.session;
    source.changed();
  });
  anchor.addEventListener('mouseout', () => {
    selectedSession = '';
    source.changed();
  });
  output.appendChild(anchor);
}

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
      style: function(feature) {
        const member = feature.get('member');
        let r = 0;
        let d = 0;
        for (const session in member) {
          if (selectedSession && session !== selectedSession) {
            continue;
          }
          const lookup = member[session];
          for (const key in lookup) {
            const party = lookup[key].party;
            if (party === 'Democrat') {
              ++d;
            } else if (party === 'Republican') {
              ++r;
            }
          }
        }
        const t = r + d;
        return new Style({
          fill: new Fill({
            color: [r * 255 / t, 0, d * 255 / t, 0.5]
          }),
          stroke: new Stroke({
            color: [255, 255, 255, 0.6]
          })
        });
      }
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

sync(map);
