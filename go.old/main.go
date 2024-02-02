package main

import (
	"encoding/csv"
	"log"
	"os"
)

// type Record struct {
// 	MAC              string
// 	SSID             string
// 	AuthMode         string
// 	FirstSeen        time.Time
// 	Channel          int
// 	RSSI             int
// 	CurrentLatitude  float32
// 	CurrentLongitude float32
// 	AltitudeMeters   float32
// 	AccuracyMeters   float32
// 	Type             string
// }

func main() {
	f, err := os.Open("../data.csv")
	if err != nil {
		log.Fatal(err)
	}

	reader := csv.NewReader(f)
	rawData, err := reader.ReadAll()
	defer f.Close()
	if err != nil {
		log.Fatal(err)
	}

	data := processData(rawData)
	println(data[0])
}

func processData(rawData [][]string) []map[string]string {
	var data []map[string]string
	headers := rawData[1]

	println(headers)

	for i, line := range rawData {
		if i > 1 {
			m := make(map[string]string)
			for j, value := range line {
				m[headers[j]] = value
				println(headers)
				println(value)
			}
			data = append(data, m)
		}
	}

	return data
}
