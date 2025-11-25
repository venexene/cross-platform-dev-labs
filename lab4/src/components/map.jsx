import * as d3 from "d3";
import * as Geo from "../geo.json";
import { useRef, useEffect, useCallback } from "react";

export function Map({ launchPads, selectedLaunchpad }) {
    const svgRef = useRef();
    const zoomRef = useRef();
    const projectionRef = useRef();

    const width = 1000;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 100 };

    const initializeMap = useCallback(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg.attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        projectionRef.current = d3.geoMercator()
            .scale(70)
            .center([0, 20])
            .translate([width / 2 - margin.left, height / 2 - margin.top]);

        g.selectAll(".country")
            .data(Geo.features)
            .enter()
            .append("path")
            .attr("class", "topo")
            .attr("d", d3.geoPath().projection(projectionRef.current));

        g.selectAll(".launchpad")
            .data(launchPads.features)
            .enter()
            .append("path")
            .attr("id", d => `pad-${d.properties.id}`) // Добавляем префикс для валидного селектора
            .attr("class", "launchpad")
            .attr("d", d3.geoPath()
                .projection(projectionRef.current)
                .pointRadius(5)
            );

        zoomRef.current = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoomRef.current);
    }, [width, height, margin, launchPads]);

    const calculateDistance = (coord1, coord2) => {
        const dx = coord1[0] - coord2[0];
        const dy = coord1[1] - coord2[1];
        return Math.sqrt(dx * dx + dy * dy);
    };

    const updateLaunchpadColors = useCallback(() => {
        if (!selectedLaunchpad) {
            d3.select(svgRef.current)
                .selectAll(".launchpad")
                .attr("class", "launchpad");
            return;
        }

        const launchPadsGroup = d3.select(svgRef.current)
            .select("g")
            .selectAll(".launchpad");

        const selectedPadData = launchPads.features.find(f => f.properties.id === selectedLaunchpad);
        if (!selectedPadData) return;

        const selectedCoords = selectedPadData.geometry.coordinates;

        launchPadsGroup.attr("class", function(lp) {
            if (lp.properties.id === selectedLaunchpad) {
                return "launchpad selected";
            }
            
            const distance = calculateDistance(lp.geometry.coordinates, selectedCoords);
            return distance < 0.1 ? "launchpad transparent" : "launchpad";
        });
    }, [selectedLaunchpad, launchPads]);

    useEffect(() => {
        if (launchPads.features.length > 0) {
            initializeMap();
        }
    }, [initializeMap, launchPads]);

    useEffect(() => {
        updateLaunchpadColors();
    }, [updateLaunchpadColors]);

    return (
        <div className="map-container">
            <svg ref={svgRef} />
        </div>
    );
}