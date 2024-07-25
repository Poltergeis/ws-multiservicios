import GPSService from "../GPSService";

const limite: [number, number][][] = [
    [
        [0, 0],
        [0, 10],
        [10, 10],
        [10, 0],
        [0, 0]
    ]
];

const gpsService = new GPSService(limite);

function simulateCoordinates(coords: number[]) {
    gpsService.setUbicacionActual(coords);
    const dentro = gpsService.estaDentro();
    console.log(`Coordenadas: ${coords} -> Dentro del límite: ${dentro}`);
}

simulateCoordinates([9, 1]);
simulateCoordinates([1, 15]);
simulateCoordinates([3, 3]);
simulateCoordinates([5, 25]);