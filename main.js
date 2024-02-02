import { getDistance } from './maths.js'
import { Marker, LocationData, Network } from './definitions.js'

let lines = []
let map
let networks
let markers

const input = document.querySelector('input[type="file"]')


const createMap = (points) => {
  // TODO average all points
  const avgMarkers = (a, b) => {
    return new Marker((a.lat + b.lat) / 2, (a.lon + b.lon) / 2)
  }
  let { lat, lon } = avgMarkers(...points)

  // TODO set initial zoom level based on path distance
  map = L.map('map').setView([lat, lon], 16)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

}

const drawPath = (data) => {
  // data.forEach(m => L.marker([m.lat, m.lon]).addTo(map))
  data.forEach((m, i, array) => {
    if (array[i - 1])
      L.polygon([[m.lat, m.lon], [array[i - 1].lat, array[i - 1].lon]]).addTo(map)
  })
}

const drawCircles = (network) => {
  network.seenAt.forEach(({ lat, lon, strength }) => {
    getDistance(strength).forEach(({ nWalls, meters }) => {
      L.circle([lat, lon], {
        color: 'teal',
        fillColor: 'cyan',
        fillOpacity: '0.2',
        radius: meters
      }).addTo(map)
    })
  })
}

const getNetworks = (data) => {
  const nets =
    data.map(n => new Network(n[1] || n[0], n[2], n[3]))
      .filter((value, index, self) =>
        index === self.findIndex((t) =>
          t.name == value.name
        ))

  data.forEach(n => {
    const name = n[1] || n[0]
    let net = nets?.filter(n => n.name == name)[0]
    let loc = new LocationData(n[6], n[7], n[8], n[5])
    net.addLocation(loc)
    if (net.knownMACs.filter(m => m == n[0]) == 0) {
      net.addMAC(n[0])
    }
  })

  return nets;
}

const getMarkers = (data) => {
  return data.map(m => new Marker(m[6], m[7]))
}

const loadData = () => {
  const reader = new FileReader()
  reader.onload = async () => {
    lines = reader.result.split('\n')
      .map(line => line.split(','))
  }
  reader.onloadend = async () => {
    lines = lines.slice(2, -1)
    networks = getNetworks(lines)
    markers = getMarkers(lines)
    let firstLast = [markers.slice(0, 1)[0], markers.slice(-1)[0]]
    createMap(firstLast)
    drawPath(markers)
    drawCircles(networks.find(n => n.name == "AUSARTA"))
    console.log(networks)
  }

  if (lines.length > 0) {
    alert("data is already loaded")
  } else if (input.files.length == 0) {
    alert("no file selected")
  } else {
    reader.readAsText(input.files[0])
  }
}

const button = document.getElementById("loadButton")
button.onclick = loadData

