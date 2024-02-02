export class Marker {
  constructor(lat, lon) {
    this.name = "GeoMarker"
    this.lat = parseFloat(lat)
    this.lon = parseFloat(lon)
  }
  equals(m) {
    return this.lat == m.lat && this.lon == m.lon
  }
}

export class Network {
  constructor(name, authMode, firstSeen) {
    this.name = name
    this.authMode = authMode
    this.firstSeen = firstSeen
    this.seenAt = []
    this.knownMACs = []
  }
  addLocation(l) {
    this.seenAt = this.seenAt.concat(l)
  }
  addMAC(m) {
    this.knownMACs = this.knownMACs.concat(m)
  }
}

export class LocationData {
  // ? include source (MAC address)
  constructor(lat, lon, alt, strength) {
    this.name = "LocationData"
    this.lat = parseFloat(lat)
    this.lon = parseFloat(lon)
    this.alt = parseFloat(alt)
    this.strength = parseInt(strength)
  }
  getMarker() {
    return new Marker(this.lat, this.lon)
  }
}

