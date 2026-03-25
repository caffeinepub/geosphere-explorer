import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MonumentData {
    latitude: number;
    country: string;
    city: string;
    name: string;
    description: string;
    history: string;
    imageUrl: string;
    longitude: number;
    category: string;
}
export interface backendInterface {
    getAllMonuments(): Promise<Array<MonumentData>>;
    getMonumentById(id: bigint): Promise<MonumentData>;
    getMonumentsNear(lat: number, lon: number, radiusKm: number): Promise<Array<MonumentData>>;
    searchMonuments(searchText: string): Promise<Array<MonumentData>>;
}
