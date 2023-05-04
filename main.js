// import './style.css';
// import {Map, View} from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
//
// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2
//   })
// });


//====================================gpt 생성 코드=============================
// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import {fromLonLat} from 'ol/proj';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import Overlay from 'ol/Overlay';
// import {toStringXY} from 'ol/coordinate';
//
// const locations = [
//   {position: [127.1058349, 37.3599968], name: '서울'},
//   {position: [126.978426, 37.5666103], name: '서울역'},
//   {position: [126.9778688, 37.566425], name: '우리집'},
//   {position: [126.943807, 37.557678], name: '이대역'},
// ];
//
// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//   ],
//   view: new View({
//     center: fromLonLat([126.97794, 37.56624]),
//     zoom: 14,
//   }),
// });
//
// for (const location of locations) {
//   const marker = new Overlay({
//     position: fromLonLat(location.position),
//     positioning: 'center-center',
//     element: document.createElement('div'),
//   });
//
//   const content = document.createElement('div');
//   content.innerHTML = location.name;
//   marker.getElement().appendChild(content);
//   map.addOverlay(marker);
// }
//========================= gpt 222========================
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import {toStringXY} from 'ol/coordinate';

const locations = [
  {position: [127.1058349, 37.3599968], name: '서울', icon: 'https://openlayers.org/en/latest/examples/data/icon.png'},
  {position: [126.978426, 37.5666103], name: '서울역', icon: 'https://openlayers.org/en/latest/examples/data/icon.png'},
  {position: [126.9778688, 37.566425], name: '우리집',icon: 'https://openlayers.org/en/latest/examples/data/icon.png'},
  {position: [126.943807, 37.557678], name: '이대역',icon: 'https://openlayers.org/en/latest/examples/data/icon.png'},
];

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: fromLonLat([126.97794, 37.56624]),
    zoom: 14,
  }),
});

// for (const location of locations) {
//   const marker = new Overlay({
//     position: fromLonLat(location.position),
//     positioning: 'center-center',
//     element: document.createElement('div'),
//   });
for (const location of locations) {
  const marker = new Overlay({
    position: fromLonLat(location.position),
    positioning: 'center-bottom',
    element: document.createElement('img'),
  });


  // const content = document.createElement('div');
  // content.innerHTML = location.name;
  // marker.getElement().appendChild(content);
  // map.addOverlay(marker);
  const content = document.createElement('div');
  content.innerHTML = location.name;
  marker.getElement().setAttribute('src', location.icon);
  marker.getElement().setAttribute('class', 'marker');
  marker.getElement().appendChild(content);
  map.addOverlay(marker);




  // 클릭 이벤트 추가
  marker.getElement().addEventListener('click', (evt) => {
    console.log('marker click')
    const coordinate = marker.getPosition();
    const pixel = map.getPixelFromCoordinate(coordinate);
    const feature = map.forEachFeatureAtPixel(pixel, (feature) => {
      return feature;
    });
    alert(feature);

    if (feature) {
      const geometry = feature.getGeometry();
      const coord = geometry.getCoordinates();
      const hdms = toStringXY(coord, 2);
      alert(location.name + '\n' + hdms);
    }
  });
}
