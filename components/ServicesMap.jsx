"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "./LanguageProvider";
import { ui } from "@/lib/ui-strings";
import { fetchMarkers, categoryColour, MARKER_CATEGORIES } from "@/lib/markers";

const UK = { center: [54.0, -2.5], zoom: 6 };

export default function ServicesMap() {
  const { lang } = useLanguage();
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState([]);

  // init map once
  useEffect(() => {
    if (mapRef.current || !mapEl.current) return;
    const map = L.map(mapEl.current, { scrollWheelZoom: false }).setView(UK.center, UK.zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors", maxZoom: 18,
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // load markers
  useEffect(() => {
    fetchMarkers().then((m) => { setMarkers(m); setLoaded(true); });
  }, []);

  // only the categories that actually appear in the data (in defined order)
  const presentCats = MARKER_CATEGORIES.filter((c) => markers.some((m) => m.category === c.id));
  const showFilters = presentCats.length >= 2;

  // default every present category to "on" whenever the data changes
  useEffect(() => {
    setActiveCats(presentCats.map((c) => c.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  const toggleCat = (id) =>
    setActiveCats((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const q = query.trim().toLowerCase();
  const visible = markers.filter(
    (m) =>
      (!showFilters || activeCats.includes(m.category)) &&
      (!q || `${m.name || ""} ${m.address || ""}`.toLowerCase().includes(q))
  );

  // redraw + refit whenever data, language, search or filters change
  useEffect(() => {
    const map = mapRef.current, layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    visible.forEach((m) => {
      const note = (m.note && m.note[lang]) || "";
      const finder = m.officialFinderUrl
        ? `<br><a href="${m.officialFinderUrl}" target="_blank" rel="noopener">${ui.mapOfficialFinder[lang]} \u2197</a>` : "";
      const html =
        `<strong>${m.name || ""}</strong>` +
        (m.address ? `<br><span class="mp-addr">${m.address}</span>` : "") +
        (note ? `<br><span class="mp-note">${note}</span>` : "") + finder;
      L.circleMarker([m.lat, m.lng], {
        radius: 8, weight: 2, color: categoryColour(m.category),
        fillColor: categoryColour(m.category), fillOpacity: 0.55,
      }).bindPopup(html).addTo(layer);
    });
    if (visible.length === 1) map.setView([visible[0].lat, visible[0].lng], 13);
    else if (visible.length > 1) map.fitBounds(visible.map((m) => [m.lat, m.lng]), { padding: [40, 40] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, lang, query, activeCats]);

  return (
    <div className="services-map-wrap">
      {loaded && markers.length > 0 && (
        <div className="map-controls">
          <input
            className="map-search" type="search"
            placeholder={ui.mapSearch[lang]}
            value={query} onChange={(e) => setQuery(e.target.value)}
          />
          {showFilters && (
            <div className="map-filters">
              {presentCats.map((c) => {
                const on = activeCats.includes(c.id);
                return (
                  <button
                    key={c.id} type="button" className="map-filter" aria-pressed={on}
                    onClick={() => toggleCat(c.id)}
                    style={{
                      background: "#fff",
                      borderColor: on ? c.colour : "var(--line)",
                      color: on ? c.colour : "var(--muted)",
                      opacity: on ? 1 : 0.6,
                    }}
                  >
                    <span className="map-dot" style={{ background: on ? c.colour : "#c4c6d4" }} />
                    {ui[c.labelKey][lang]}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div ref={mapEl} className="services-map" />
      {loaded && visible.length === 0 && (
        <p className="muted">{markers.length === 0 ? ui.mapEmpty[lang] : ui.mapNoMatch[lang]}</p>
      )}
      <p className="muted map-disclaimer">{ui.mapDisclaimer[lang]}</p>
    </div>
  );
}
