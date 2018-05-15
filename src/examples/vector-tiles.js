import 'ol/ol.css';
import bright from './bright.json';
import {apply} from 'ol-mapbox-style';
import VectorTileLayer from 'ol/layer/VectorTile';

const map = apply('map-container', bright);

let declutter = true;
document.getElementById('declutter').addEventListener('click', function() {
  const layer = map.getLayers().item(0);
  map.removeLayer(layer);
  declutter = !declutter;
  map.addLayer(new VectorTileLayer({
    source: layer.getSource(),
    style: layer.getStyle(),
    declutter: declutter
  }));
});
