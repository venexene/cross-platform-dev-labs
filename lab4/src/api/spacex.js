class SpaceX {
    constructor(baseUrl = "https://api.spacexdata.com/v4/") {
        this.baseUrl = baseUrl;
    }

    async launches() {
        const response = await fetch(`${this.baseUrl}launches`);
        return response.json();
    }

    #convertToGeoJSON(launchpads) {
        return {
            type: "FeatureCollection",
            features: launchpads.map(pad => ({
                type: "Feature",
                properties: {
                    id: pad.id,
                    name: pad.name
                },
                geometry: {
                    type: "Point",
                    coordinates: [pad.longitude, pad.latitude]
                }
            }))
        };
    }

    async launchpads(geo = false) {
        const response = await fetch(`${this.baseUrl}launchpads`);
        const data = await response.json();
        return geo ? this.#convertToGeoJSON(data) : data;
    }

    async launchpad(id) {
        const response = await fetch(`${this.baseUrl}launchpads/${id}`);
        return response.json();
    }

    async starlinks() {
        const response = await fetch(`${this.baseUrl}starlink`);
        return response.json();
    }
}

export { SpaceX };
