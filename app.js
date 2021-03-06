Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOWMwMzY1Ni1hZDJjLTRlYjItYjgyMC02YjE0YjNkODQ4MTAiLCJpZCI6MzU0NzYsImlhdCI6MTYwMjA4NjkwNX0.kU1NnJChdVVnD4DJ_fjpcdSzg5kXjxSmnl-2751af2k';

var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false, // ปิดการแสดงผล timeline ด้านล่าง
    animation: false,
    shadows: true,
});

// ปิดการแสดงผล logo Cesium
viewer._cesiumWidget._creditContainer.style.display = "none";

scene = viewer.scene;

// ปรับมุมกล้องเริ่มต้น
var camPos = {
    lng: parseFloat(100.5242447),
    lat: parseFloat(13.7258539),
    h: parseInt(653),
    heading: parseFloat(21.27879878293835),
    pitch: parseFloat(-21.34390550872461),
    roll: parseFloat(0.0716951918898415)
}
scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(camPos.lng, camPos.lat, camPos.h),
    orientation: new Cesium.HeadingPitchRoll.fromDegrees(camPos.heading, camPos.pitch, camPos.roll),
    endTransform: Cesium.Matrix4.IDENTITY,
});

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

// let bld = [];
let energy_value = [];
for (var i = 4; i < 248; i++) {
    if (
        i == 227 || i == 210 || i == 214 || i == 222 || i == 219 || i == 155 || i == 95 || i == 228 || i == 123 || i == 58 || i == 96 ||
        i == 216 || i == 215 || i == 211 || i == 217 || i == 184 || i == 60 || i == 46 || i == 221 || i == 223 || i == 226 || i == 220 ||
        i == 29 || i == 170 || i == 30 || i == 171 || i == 180 || i == 91 || i == 154 || i == 86 || i == 87 || i == 174 || i == 175 ||
        i == 178 || i == 152 || i == 201 || i == 116 || i == 59 || i == 234 || i == 93 || i == 205 || i == 79 || i == 209 || i == 229 ||
        i == 230 || i == 67 || i == 232 || i == 159 || i == 68 || i == 84 || i == 213 || i == 145 || i == 197 || i == 207 || i == 206 ||
        i == 194 || i == 160 || i == 195 || i == 196 || i == 161 || i == 203 || i == 54 || i == 142 || i == 43 || i == 158 || i == 112 ||
        i == 162 || i == 153 || i == 6 || i == 33 || i == 165 || i == 163 || i == 7 || i == 45 || i == 117 || i == 190 || i == 113 ||
        i == 166 || i == 106 || i == 32 || i == 13 || i == 204 || i == 63 || i == 64 || i == 77 || i == 187 || i == 27 || i == 44 ||
        i == 49 || i == 47 || i == 124 || i == 51 || i == 50 || i == 52 || i == 15 || i == 173 || i == 78 || i == 176 || i == 10 ||
        i == 185 || i == 186 || i == 72 || i == 139 || i == 177 || i == 114 || i == 53 || i == 56 || i == 167 || i == 82 || i == 16 ||
        i == 151 || i == 198 || i == 181 || i == 25 || i == 26 || i == 28 || i == 183 || i == 182 || i == 107 || i == 122 || i == 92 ||
        i == 9 || i == 119 || i == 208 || i == 65 || i == 40 || i == 17 || i == 121 || i == 36 || i == 37 || i == 57 || i == 18 ||
        i == 105 || i == 19 || i == 22 || i == 20 || i == 48 || i == 100 || i == 101 || i == 102 || i == 110 || i == 21 || i == 148 ||
        i == 237 || i == 109 || i == 11 || i == 41 || i == 169 || i == 168 || i == 83 || i == 90 || i == 88 || i == 55 || i == 188 ||
        i == 225 || i == 39 || i == 199 || i == 233 || i == 231 || i == 99 || i == 70 || i == 108 || i == 200 || i == 224 || i == 193 ||
        i == 150 || i == 120 || i == 38
    ) {
        var url = 'http://94.74.116.125:9000/api/v1/node/' + i + '/usage_profile/day/energy';
        var json_obj = JSON.parse(Get(url));
        // let name = `${json_obj.data['name']}`
        let energy = `${json_obj.data['energy']}`
        // bld.push(name);
        energy_value.push(parseFloat(energy));
    }
}

let en_order = [
    159, 144, 147, 154, 151, 98, 66, 160, 87, 43, 67, 149, 148, 145, 150, 122, 45, 31, 153, 155, 158, 152, 18, 110, 19, 111, 118, 63, 97,
    59, 113, 114, 117, 95, 136, 81, 44, 166, 65, 139, 55, 143, 161, 162, 49, 164, 100, 50, 58, 146, 91, 132, 141, 140, 129, 101, 130, 131,
    102, 137, 39, 90, 28, 99, 78, 103, 96, 0, 21, 105, 104, 1, 30, 82, 127, 79, 106, 73, 20, 5, 138, 46, 47, 53, 125, 16, 60, 29, 34, 32,
    88, 36, 35, 37, 6, 112, 54, 115, 3, 123, 124, 52, 89, 116, 80, 38, 41, 107, 56, 7, 94, 133, 119, 14, 15, 17, 121, 120, 74, 86, 64, 2,
    83, 142, 48, 26, 8, 85, 22, 23, 42, 9, 72, 10, 13, 11, 33, 69, 70, 71, 77, 12, 92, 167, 76, 4, 27, 109, 108, 57, 62, 61, 40, 126, 157,
    25, 134, 165, 163, 68, 51, 75, 135, 156, 128, 93, 84, 24
];

// var name_order = [];
var energy_order = [];
// en_order.forEach(i => name_order.push(bld[i]));
en_order.forEach(i => energy_order.push(energy_value[i]));

// var building_list = [];
// var energy_list = []
var energy_json = JSON.parse(Get('SampleData/geojson/polygon_bldg_energy.geojson'));
for (var i = 0; i < energy_json.features.length; i++) {
    // building_list.push(energy_json.features[i].properties.bld_name);
    energy_json.features[i].properties.energy += energy_order[i];
    // energy_list.push(energy_json.features[i].properties.energy)
}

var promise1 = Cesium.GeoJsonDataSource.load("SampleData/geojson/polygon_bldg_buff.geojson");
var promise2 = Cesium.GeoJsonDataSource.load("SampleData/geojson/polygon_bldg_buff.geojson");
var promise3 = Cesium.GeoJsonDataSource.load("SampleData/geojson/polygon_bldg_buff.geojson");
var promise4 = Cesium.GeoJsonDataSource.load("SampleData/geojson/polygon_bldg_buff.geojson");
var en_polygon = Cesium.GeoJsonDataSource.load(energy_json);
var electric_pole = Cesium.IonResource.fromAssetId(167335);
var fire_hydrant = Cesium.IonResource.fromAssetId(164759);
var heightdetail = document.getElementById("heightdetail");
var authodetail = document.getElementById("authodetail");
var zonedetail = document.getElementById("zonedetail");
var energydetail = document.getElementById("energydetail");
var fire_hydrant = Cesium.IonResource.fromAssetId(164759)
var electric_pole = Cesium.IonResource.fromAssetId(167335)

fire_hydrant.then(function (resource) {
    $.getJSON('SampleData/geojson/fire_hydrant.geojson', function (data) {
        for (let i = 0; i < data.features.length; i++) {
            let coordinates = data.features[i].geometry.coordinates
            //console.log( data.features[i].properties.heading )
            let coord = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 0.0);
            let hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(data.features[i].properties.heading + 90), 0, 0);
            viewer.entities.add({
                position: coord,
                orientation: Cesium.Transforms.headingPitchRollQuaternion(coord, hpr),
                model: {
                    uri: resource,
                    show: 'True',
                    shadows: 'enabled',
                    scale: 1.5
                }
            });
        }
    })
});

electric_pole.then(function (resource) {
    $.getJSON('SampleData/geojson/electric_pole_point.geojson', function (data) {
        for (let i = 0; i < data.features.length; i++) {
            let coordinates = data.features[i].geometry.coordinates
            //console.log( data.features[i].properties.heading )
            let coord = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 0.0);
            let hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(data.features[i].properties.heading + 90), 0, 0);
            viewer.entities.add({
                position: coord,
                orientation: Cesium.Transforms.headingPitchRollQuaternion(coord, hpr),
                model: {
                    uri: resource,
                    show: 'True',
                    shadows: 'enabled',
                    scale: 1.0
                }
            });
        }
    })
});

$(document).ready(function () {
    $('input:radio[name="search_type"]').change(function () {
        if ($(this).val() == 'Buildings') {
            promise1.then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var height = entity.properties.heigth_m;
                    color = Cesium.Color.fromAlpha(Cesium.Color.TRANSPARENT, 0.01);
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })

            building = viewer.scene.primitives.add(
                new Cesium.Cesium3DTileset({
                    url: Cesium.IonResource.fromAssetId(800167)
                })
            );

            heightdetail.style.display = "none";
            authodetail.style.display = "none";
            zonedetail.style.display = "none";
            energydetail.style.display = "none";
            promise2.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise3.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise4.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            en_polygon.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
        }
        if ($(this).val() == 'Height') {
            promise2.then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var height = entity.properties.heigth_m;
                    if (height <= 20) {
                        color = Cesium.Color.fromCssColorString('#5813fc');
                    }
                    else if (height <= 40) {
                        color = Cesium.Color.fromCssColorString('#1cc2fd');
                    }
                    else if (height <= 60) {
                        color = Cesium.Color.fromCssColorString('#7dfd94');
                    }
                    else if (height <= 80) {
                        color = Cesium.Color.fromCssColorString('#f5c926');
                    }
                    else {
                        color = Cesium.Color.fromCssColorString('#ff2b18');
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })
            heightdetail.style.display = "block";
            authodetail.style.display = "none";
            zonedetail.style.display = "none";
            energydetail.style.display = "none";
            promise1.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise3.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise4.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            en_polygon.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            viewer.scene.primitives.remove(building);
        }
        if ($(this).val() == 'Autho') {
            promise3.then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var height = entity.properties.heigth_m;
                    var autho = entity.properties.autho;
                    if (autho == 'PMCU') {
                        color = Cesium.Color.fromCssColorString('#ff8cd9');
                    }
                    else if (autho == 'PRM') {
                        color = Cesium.Color.fromCssColorString('#67e6d1');
                    }
                    else {
                        color = Cesium.Color.fromCssColorString('#e65154');
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })
            authodetail.style.display = "block";
            heightdetail.style.display = "none";
            zonedetail.style.display = "none";
            energydetail.style.display = "none";
            promise1.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise2.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise4.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            en_polygon.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            viewer.scene.primitives.remove(building);
        }
        if ($(this).val() == 'Zone') {
            promise4.then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var height = entity.properties.heigth_m;
                    var permit_area = entity.properties.permit_area;
                    if (permit_area == 'สถานศึกษา') {
                        color = Cesium.Color.fromCssColorString('#e60049');
                    }
                    else if (permit_area == 'พาณิชย์') {
                        color = Cesium.Color.fromCssColorString('#0bb4ff');
                    }
                    else {
                        color = Cesium.Color.fromCssColorString('#50e991');
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })
            zonedetail.style.display = "block";
            heightdetail.style.display = "none";
            authodetail.style.display = "none";
            energydetail.style.display = "none";
            promise1.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise2.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise3.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            en_polygon.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            viewer.scene.primitives.remove(building);
        }
        if ($(this).val() == 'energy') {
            en_polygon.then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var height = entity.properties.heigth_m;
                    var energy = entity.properties.energy;
                    if (energy < 0) {
                        color = Cesium.Color.fromCssColorString('#3288bd');
                    }
                    else if (energy <= 250) {
                        color = Cesium.Color.fromCssColorString('#66c2a5');
                    }
                    else if (energy <= 500) {
                        color = Cesium.Color.fromCssColorString('#abdda4');
                    }
                    else if (energy <= 750) {
                        color = Cesium.Color.fromCssColorString('#e6f598');
                    }
                    else if (energy <= 1000) {
                        color = Cesium.Color.fromCssColorString('#fee08b');
                    }
                    else if (energy <= 1250) {
                        color = Cesium.Color.fromCssColorString('#fdae61');
                    }
                    else if (energy <= 1500) {
                        color = Cesium.Color.fromCssColorString('#f46d43');
                    }
                    else {
                        color = Cesium.Color.fromCssColorString('#d53e4f');
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })
            energydetail.style.display = "block";
            zonedetail.style.display = "none";
            heightdetail.style.display = "none";
            authodetail.style.display = "none";
            promise1.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise2.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise3.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise4.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            viewer.scene.primitives.remove(building);
        }
    });
});

// นำเข้า logo pin ของแต่ละข้อมูลเพื่อแสดงผล
var pinBuilder = new Cesium.PinBuilder();

var billboards = scene.primitives.add(new Cesium.BillboardCollection());
billboards.add({
    image: 'assets/image/LOGO_legend/ICON_muvmi_pin.svg',
    scale: 0.25,
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
});

billboards.add({
    image: 'assets/image/LOGO_legend/ICON_CCTV_map_pin.svg',
    scale: 0.25,
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
});

billboards.add({
    image: 'assets/image/LOGO_legend/ICON_shbus_pin.svg',
    scale: 0.25,
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
});

billboards.add({
    image: pinBuilder.fromColor(Cesium.Color.fromAlpha(Cesium.Color.TRANSPARENT, 0.01), 72).toDataURL(),
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    eyeOffset: new Cesium.Cartesian3(0, 0, -45),
});

// var cu_muvmi = Cesium.GeoJsonDataSource.load("SampleData/geojson/cu_muvmi_point_sta.geojson");
var cu_muvmi = Cesium.GeoJsonDataSource.load("https://infraplus-dev.org/geoserver/prmdb_2020/wms?service=WMS&version=1.1.0&request=GetMap&layers=prmdb_2020%3Acu_muvmi_point_sta&bbox=100.521583557129%2C13.7299499511719%2C100.537933349609%2C13.7467241287231&width=748&height=768&srs=EPSG%3A4326&styles=&format=geojson");

// แสดงจุดบริการ MuvMi
function MuvMi() {
    var checkBox = document.getElementById("MuvMi");
    if (checkBox.checked == true) {
        cu_muvmi.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                entity.billboard = billboards.get(0)
            }
        });
    }
    else {
        cu_muvmi.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
        });
    }
}

var cu_cctv = Cesium.GeoJsonDataSource.load("SampleData/geojson/cu_cctv.geojson");

// แสดงตำแหน่งกล้องวงจรปิด
function CCTV() {
    var checkBox = document.getElementById("CCTV");
    if (checkBox.checked == true) {
        cu_cctv.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                entity.billboard = billboards.get(1);
            }
        });
    }
    else {
        cu_cctv.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
        });
    }
}

// แสดงจุดจอดรถโดยสารและเส้นเดินรถ CU shuttle bus
var bus_point_sta = Cesium.GeoJsonDataSource.load("SampleData/geojson/bus_point_sta.geojson");
var bus_line;
function shbus() {
    var checkBox = document.getElementById("shbus");
    var shbusdetail = document.getElementById("shbusdetail");
    if (checkBox.checked == true) {
        bus_point_sta.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                entity.billboard = billboards.get(2);
            }
        })
        var imageryLayers = viewer.imageryLayers;
        bus_line = imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
                url:
                    "https://infraplus-dev.org/geoserver/prmdb_2020/wms",
                layers: "bus_line",
                parameters: {
                    transparent: true,
                    format: "image/png",
                },
            })
        );
        shbusdetail.style.display = "block";
    }
    else {
        bus_point_sta.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
        });
        viewer.imageryLayers.remove(bus_line);
        shbusdetail.style.display = "none";
    }
}

var road_line;
function road() {
    var checkBox = document.getElementById("road");
    var roaddetail = document.getElementById("roaddetail");
    if (checkBox.checked == true) {
        var imageryLayers = viewer.imageryLayers;
        road_line = imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
                url:
                    "https://infraplus-dev.org/geoserver/prmdb_2020/wms",
                layers: "road_line",
                parameters: {
                    transparent: true,
                    format: "image/png",
                },
            })
        );
        roaddetail.style.display = "block";
    }
    else {
        viewer.imageryLayers.remove(road_line);
        roaddetail.style.display = "none";
    }
}

var drain_pipe_line;
function pipe() {
    var checkBox = document.getElementById("pipe");
    var pipedetail = document.getElementById("pipedetail");
    if (checkBox.checked == true) {
        var imageryLayers = viewer.imageryLayers;
        drain_pipe_line = imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
                url:
                    "https://infraplus-dev.org/geoserver/prmdb_2020/wms",
                layers: "drain_pipe_line",
                parameters: {
                    transparent: true,
                    format: "image/png",
                },
            })
        );
        pipedetail.style.display = "block";
    }
    else {
        viewer.imageryLayers.remove(drain_pipe_line);
        pipedetail.style.display = "none";
    }
}

var gutter_line;
function gutter() {
    var checkBox = document.getElementById("gutter");
    var gutterdetail = document.getElementById("gutterdetail");
    if (checkBox.checked == true) {
        var imageryLayers = viewer.imageryLayers;
        gutter_line = imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
                url:
                    "https://infraplus-dev.org/geoserver/prmdb_2020/wms",
                layers: "gutter_line",
                parameters: {
                    transparent: true,
                    format: "image/png",
                },
            })
        );
        gutterdetail.style.display = "block";
    }
    else {
        viewer.imageryLayers.remove(gutter_line);
        gutterdetail.style.display = "none";
    }
}

var sidewalk_area = Cesium.GeoJsonDataSource.load('SampleData/geojson/sidewalk_area.geojson')
function sidewalk() {
    var checkBox = document.getElementById("sidewalk");
    if (checkBox.checked == true) {
        sidewalk_area.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                color = Cesium.Color.GREY;
                entity.polygon.material = color;
                entity.polygon.outline = false;
                entity.polygon.extrudedHeight = 0.2;
            }
        })
    }
    else {
        sidewalk_area.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
        });
    }
}

function tree() {
    var checkBox = document.getElementById("tree");
    if (checkBox.checked == true) {
        tree_model = viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(476068)
            })
        );
    }
    else {
        viewer.scene.primitives.remove(tree_model);
    }
}

var json_obj = JSON.parse(Get('http://159.138.252.132:9000/api/v1/pm_sensor/data'));
let sensor_name = [];
let pm_value = [];
for (var i in json_obj.data) {
    let pm25 = `${json_obj.data[i]["pm2.5"]}`
    let sensor = `${json_obj.data[i]["name"]}`
    pm_value.push(parseFloat(pm25));
    sensor_name.push(sensor);
}

var notnull_value = [];
var notnull_name = [];
for (var i in pm_value) {
    if (isNaN(pm_value[i])) { }
    else {
        notnull_value.push(pm_value[i]);
        notnull_name.push(sensor_name[i]);
    }
}

// คำนวณค่าเฉลี่ย pm 2.5
let avg = notnull_value.reduce((acc, n) => acc + n) / notnull_value.length

document.getElementById("avg").innerHTML = avg.toFixed(3);

// นำเข้า logo การแบ่งเกณฑ์คุณภาพอากาศ
var blue_img = '<img src="SVG/excellent.svg" height="40px">';
var green_img = '<img src="SVG/good.svg" height="40px">';
var yellow_img = '<img src="SVG/moderate.svg" height="40px">';
var orange_img = '<img src="SVG/bad.svg" height="40px">';
var red_img = '<img src="SVG/unhealthy.svg" height="40px">';

// กำหนดเงื่อนไขการแสดงผล logo การแบ่งเกณฑ์คุณภาพอากาศ และสีของ font ตามค่าเฉลี่ย pm 2.5 ที่ได้คำนวณแล้ว
var avgcolor = function () {
    if (avg <= 25) {
        document.getElementById("avg").style.color = '#00C9FF';
        document.getElementById("image").innerHTML = blue_img;
    }
    else if (avg <= 50) {
        document.getElementById("avg").style.color = '#83E702';
        document.getElementById("image").innerHTML = green_img;
    }
    else if (avg <= 100) {
        document.getElementById("avg").style.color = '#F6FF36';
        document.getElementById("image").innerHTML = yellow_img;
    }
    else if (avg <= 200) {
        document.getElementById("avg").style.color = '#F93';
        document.getElementById("image").innerHTML = orange_img;
    }
    else if (avg > 200) {
        document.getElementById("avg").style.color = '#F33';
        document.getElementById("image").innerHTML = red_img;
    }
    else {
        document.getElementById("avg").style.color = '#4C4C4C';
    }
}
avgcolor();

let pm_order = [
    3, 4, 22, 17, 14, 24, 19, 15, 6, 29, 12, 8, 1, 21, 13, 0, 2, 5, 27, 25, 28, 32, 7, 23, 48,
    20, 31, 10, 11, 9, 36, 16, 18, 30, 26, 34, 37, 38, 39, 40, 41, 42, 35, 43, 44, 45, 46, 49, 47, 33
]

// var sensor_order = [];
var value_order = [];
// pm_order.forEach(i => sensor_order.push(sensor_name[i]));
pm_order.forEach(i => value_order.push(pm_value[i]));

let bounds = {
    west: 100.5232007,
    east: 100.5364466,
    south: 13.7329829,
    north: 13.74409429,
};

// init heatmap
let heatMap = CesiumHeatmap.create(
    viewer, // your cesium viewer
    bounds, // bounds for heatmap layer
    {
        // heatmap.js options go here
        // maxOpacity: 0.3
    }
);

const x = [];
const y = [];

var pm_geojson = JSON.parse(Get('SampleData/geojson/pm_data.geojson'));
for (var i = 0; i < pm_geojson.features.length; i++) {
    x.push(pm_geojson.features[i].properties.x)
    y.push(pm_geojson.features[i].properties.y)
    pm_geojson.features[i].properties.pm += value_order[i]
}

let data = [];
for (var i = 0; i < value_order.length; i++) {
    var data_value = { x: x[i], y: y[i], value: value_order[i] };
    data.push(data_value);
}

let valueMin = Math.min.apply(Math, notnull_value);
let valueMax = Math.max.apply(Math, notnull_value);

var pm = Cesium.GeoJsonDataSource.load(pm_geojson);

// แสดง heatmap ของ pm 2.5
function PM() {
    var checkBox = document.getElementById("PM2.5");
    if (checkBox.checked == true) {
        heatMap.setWGS84Data(valueMin, valueMax, data);
        pm.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var value = entity.properties.pm;
                entity.label = {
                    fillColor: Cesium.Color.BLACK,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 6,
                    font: "400 16px CHULALONGKORN",
                    pixelOffset: new Cesium.Cartesian2(0, -35),
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    text: "" + Math.round(value),
                    showBackground: true,
                    backgroundColor: Cesium.Color.TRANSPARENT,
                }
                if (isNaN(value)) {
                    entity.billboard = {
                        image: 'assets/svg/location-gray.svg',
                        scale: 0.4,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    }
                    entity.label = {
                        fillColor: Cesium.Color.BLACK,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 8,
                        font: "400 16px CHULALONGKORN",
                        pixelOffset: new Cesium.Cartesian2(0, -35),
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        text: "N/A",
                        showBackground: true,
                        backgroundColor: Cesium.Color.TRANSPARENT,
                    }
                }
                else if (value <= 25) {
                    entity.billboard = {
                        image: 'assets/svg/location-blue.svg',
                        scale: 0.4,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    }
                }
                else if (value <= 50) {
                    entity.billboard = {
                        image: 'assets/svg/location-green.svg',
                        scale: 0.4,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    }
                }
                else if (value <= 100) {
                    entity.billboard = {
                        image: 'assets/svg/location-yellow.svg',
                        scale: 0.4,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    }
                }
                else if (value <= 200) {
                    entity.billboard = {
                        image: 'assets/svg/location-orange.svg',
                        scale: 0.4,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    }
                }
                else if (value > 200) {
                    entity.billboard = {
                        image: 'assets/svg/location-red.svg',
                        scale: 0.4,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    }
                }
            }
        })
    }
    else {
        pm.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
            heatMap.removeLayer();
        })
    }
}

// // กำหนดค่าที่จะแสดงผลในแกน x, y ของ bar chart และสีของ bar chart
var xValues = notnull_name;
var yValues = notnull_value;
var barColors = "#de5b8d";

// map ค่าในแกน x และ y เข้าด้วยกัน
let merged = xValues.map((bar, i) => {
    return {
        "datapoint": yValues[i],
        "label": xValues[i]
    }
})

// จัดเรียง bar chart จากค่ามากไปน้อย
const dataSort = merged.sort(function (b, a) {
    return a.datapoint - b.datapoint
});

const dp = [];
const lab = [];
for (i = 0; i < dataSort.length; i++) {
    dp.push(dataSort[i].datapoint);
    lab.push(dataSort[i].label);
}

// กำหนดตัวแปรที่ใช้ในการแสดงผล bar chart
const barchartData = {
    labels: lab,
    datasets: [{
        backgroundColor: barColors,
        data: dp,
        footerFontColor: '#fff'
    }]
};

const barchartconfig = {
    type: "bar",
    data: barchartData,
    options: {
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
            display: true,
            text: 'ข้อมูล PM 2.5 รายวัน'
        }
    }
}

// แสดง bar chart ของค่า pm 2.5
function barChart() {
    var checkBox = document.getElementById("bar");
    var barChart = document.getElementById("barchart");
    if (checkBox.checked == true) {
        barChart.style.display = "block";
        new Chart("myBarChart", barchartconfig);
    } else {
        barChart.style.display = "none";
    }
}

// แสดง pie chart การ classify ความสูงของอาคาร
function pieChart() {
    var checkBox = document.getElementById("pie");
    var pieChart = document.getElementById("piechart");
    if (checkBox.checked == true) {
        pieChart.style.display = "block";
        var xValues = ["1 - 20 เมตร", "21 - 40 เมตร", "41 - 60 เมตร", "61 - 80 เมตร", "มากกว่า 80 เมตร"];
        var yValues = [2252, 103, 32, 14, 8];
        var barColors = [
            "#5813fc",
            "#1cc2fd",
            "#7dfd94",
            "#f5c926",
            "#ff2b18"
        ];

        var piechartData = {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                borderWidth: 1,
                data: yValues,
            }]
        };

        var piechartconfig = {
            type: "pie",
            data: piechartData,
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'ความสูงอาคาร'
                }
            }
        }
        new Chart("myPieChart", piechartconfig);
    } else {
        pieChart.style.display = "none";
    }
}

// แสดง pie chart การ classify หน่วยงานของอาคาร
function pieChart2() {
    var checkBox = document.getElementById("pie2");
    var pieChart = document.getElementById("piechart2");
    if (checkBox.checked == true) {
        pieChart.style.display = "block";
        var xValues = ["PMCU", "PRM", "อื่นๆ"];
        var yValues = [2104, 218, 87];
        var barColors = [
            "#ff8cd9",
            "#67e6d1",
            "#e65154"
        ];

        var piechartData = {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                borderWidth: 1,
                data: yValues,
            }]
        };

        var piechartconfig = {
            type: "pie",
            data: piechartData,
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'หน่วยงาน'
                }
            }
        }
        new Chart("myPieChart2", piechartconfig);
    } else {
        pieChart.style.display = "none";
    }
}

// แสดง pie chart การแบ่งพื้นที่
function pieChart3() {
    var checkBox = document.getElementById("pie3");
    var pieChart = document.getElementById("piechart3");
    if (checkBox.checked == true) {
        pieChart.style.display = "block";
        var xValues = ["พื้นที่การศึกษา", "พื้นที่พาณิชยกรรม", "พื้นที่ให้ส่วนราชการเช่าใช้"];
        var yValues = [251, 2094, 64];
        var barColors = [
            "#e60049",
            "#0bb4ff",
            "#50e991"
        ];

        var piechartData = {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                borderWidth: 1,
                data: yValues,
            }]
        };

        var piechartconfig = {
            type: "pie",
            data: piechartData,
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'การแบ่งพื้นที่'
                }
            }
        }
        new Chart("myPieChart3", piechartconfig);
    } else {
        pieChart.style.display = "none";
    }
}

// แสดง pie chart การใช้พลังงานไฟฟ้า
function pieChart4() {
    var checkBox = document.getElementById("pie4");
    var pieChart = document.getElementById("piechart4");
    if (checkBox.checked == true) {
        pieChart.style.display = "block";
        var xValues = ["น้อยกว่า 0 จูล", "0 - 250 จูล", "251 - 500 จูล", "501 - 750 จูล", "751 - 1000 จูล", "1001 - 1250 จูล", "1251 - 1500 จูล", "มากกว่า 1500 จูล"];
        var yValues = [
            energy_order.filter(x => x < 0).length,
            energy_order.filter(x => x <= 250).length,
            energy_order.filter(x => x <= 500).length,
            energy_order.filter(x => x <= 750).length,
            energy_order.filter(x => x <= 1000).length,
            energy_order.filter(x => x <= 1250).length,
            energy_order.filter(x => x <= 1500).length,
            energy_order.filter(x => x > 1500).length
        ];
        var barColors = [
            "#3288bd",
            "#66c2a5",
            "#abdda4",
            "#e6f598",
            "#fee08b",
            "#fdae61",
            "#f46d43",
            "#d53e4f"
        ];

        var piechartData = {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                borderWidth: 1,
                data: yValues,
            }]
        };

        var piechartconfig = {
            type: "pie",
            data: piechartData,
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'การใช้พลังงานไฟฟ้า'
                }
            }
        }
        new Chart("myPieChart4", piechartconfig);
    } else {
        pieChart.style.display = "none";
    }
}