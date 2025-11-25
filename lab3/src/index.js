import { SpaceX } from "./api/spacex.js";
import * as d3 from "d3";
import * as Geo from './geo.json' assert { type: 'json' };

class LaunchVisualizer {
    constructor() {
        this.spaceX = new SpaceX();
        this.launchpadMap = new Map();
        this.mapSvg = null;
        this.projection = null;
    }

    async initialize() {
        await this.loadLaunches();
        await this.loadLaunchpads();
        this.initializeMap();
    }

    async loadLaunches() {
        const launches = await this.spaceX.launches();
        this.renderLaunchesList(launches);
    }

    async loadLaunchpads() {
        const launchpads = await this.spaceX.launchpads();
        this.launchpadData = launchpads;
    }

    renderLaunchesList(launches) {
        const listContainer = document.getElementById("listContainer");
        const listItems = launches.map(launch => {
            const item = document.createElement("li");
            item.textContent = launch.name;
            item.dataset.launchpadId = launch.launchpad;
            
            item.addEventListener("mouseenter", () => 
                this.highlightLaunchpad(launch.launchpad)
            );
            item.addEventListener("mouseleave", () => 
                this.resetLaunchpad(launch.launchpad)
            );

            return item;
        });

        const list = document.createElement("ul");
        list.append(...listItems);
        listContainer.replaceChildren(list);
    }

    initializeMap() {
        const width = 640;
        const height = 480;
        const margin = { top: 20, right: 10, bottom: 40, left: 100 };

        this.projection = d3.geoMercator()
            .scale(70)
            .center([0, 20])
            .translate([width / 2 - margin.left, height / 2]);

        this.mapSvg = d3.select('#map')
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        this.renderWorldMap();
        this.renderLaunchpads();
    }

    renderWorldMap() {
        this.mapSvg.append("g")
            .selectAll("path")
            .data(Geo.features)
            .enter()
            .append("path")
            .attr("class", "topo")
            .attr("d", d3.geoPath().projection(this.projection))
            .style("opacity", 0.7);
    }

    renderLaunchpads() {
        const launchpadPoints = this.launchpadData.map(pad => ({
            type: "Feature",
            id: pad.id,
            geometry: {
                type: "Point",
                coordinates: [pad.longitude, pad.latitude]
            }
        }));

        this.mapSvg.append("g")
            .selectAll("path")
            .data(launchpadPoints)
            .enter()
            .append("path")
            .attr("class", "launchpad-point")
            .attr("d", d3.geoPath().projection(this.projection))
            .attr("id", d => d.id);
    }

    highlightLaunchpad(launchpadId) {
        const element = document.getElementById(launchpadId);
        if (element) element.setAttribute("fill", "red");
    }

    resetLaunchpad(launchpadId) {
        const element = document.getElementById(launchpadId);
        if (element) element.setAttribute("fill", "black");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const visualizer = new LaunchVisualizer();
        await visualizer.initialize();
    } catch (error) {
        console.error("Failed to initialize launch visualizer:", error);
    }
});