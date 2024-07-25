import * as turf from "@turf/turf";

type Position = number[];
type Coord = Position | number[];
type Point = {
    type: "Point";
    coordinates: Coord;
};
type Polygon = {
    type: "Polygon";
    coordinates: Coord[][];
};
type Feature<T> = {
    type: "Feature";
    geometry: T;
    properties: { [name: string]: any };
};

export default class GPSService {
    private limite: Feature<Polygon>;
    private ubicacionActual: Feature<Point>;

    constructor(limite: [number,number][][]) {
        this.limite = turf.polygon(limite);
        this.ubicacionActual = turf.point([0,0]);
    }

    public setUbicacionActual(coords:number[]){
        this.ubicacionActual = turf.point(coords);
    }

    public estaDentro() {
        return turf.booleanPointInPolygon(this.ubicacionActual, this.limite);
    }
}