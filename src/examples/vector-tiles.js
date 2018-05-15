import 'ol/ol.css';
import bright from './data/bright.json';
import {apply} from 'ol-mapbox-style';
import VectorTileLayer from 'ol/layer/VectorTile';
import dragdrop from 'drag-drop/buffer';

const map = apply('map-container', bright);

function declutter(declutter) {
  const layer = map.getLayers().item(0);
  map.removeLayer(layer);
  map.addLayer(new VectorTileLayer({
    source: layer.getSource(),
    style: layer.getStyle(),
    declutter: declutter
  }));
}

document.getElementById('clutter').addEventListener('click', function() {
  declutter(false);
});
document.getElementById('declutter').addEventListener('click', function() {
  declutter(true);
});


dragdrop('#map-container', function(files) {
  map.getLayers().clear();
  const style = files[0].toString().replace('{key}', 'ER67WIiPdCQvhgsUjoWK');
  apply(map, JSON.parse(style));
});
