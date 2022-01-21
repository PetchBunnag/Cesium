Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOWMwMzY1Ni1hZDJjLTRlYjItYjgyMC02YjE0YjNkODQ4MTAiLCJpZCI6MzU0NzYsImlhdCI6MTYwMjA4NjkwNX0.kU1NnJChdVVnD4DJ_fjpcdSzg5kXjxSmnl-2751af2k';

var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false, // ปิดการแสดงผล timeline ด้านล่าง
    animation: false,
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

var promise1 = Cesium.GeoJsonDataSource.load("SampleData/geojson/polygon_bldg_buff.geojson");
var promise2 = Cesium.GeoJsonDataSource.load("SampleData/geojson/polygon_bldg_buff.geojson");
var promise3 = Cesium.GeoJsonDataSource.load("SampleData/geojson/polygon_bldg_buff.geojson");
var promise4 = Cesium.GeoJsonDataSource.load("SampleData/geojson/polygon_bldg_buff.geojson");
var electric_pole = Cesium.IonResource.fromAssetId(167335);
var fire_hydrant = Cesium.IonResource.fromAssetId(164759);
var heightdetail = document.getElementById("heightdetail");
var authodetail = document.getElementById("authodetail");
var zonedetail = document.getElementById("zonedetail");
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
                var colorHash = {};
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var id = entity.properties.id;
                    var zone = entity.properties.zone;
                    var height = entity.properties.heigth_m;
                    var color = colorHash[id];
                    if (zone == 'A') {
                        color = Cesium.Color.fromAlpha(Cesium.Color.TRANSPARENT, 0.01);
                    }
                    else {
                        color = Cesium.Color.WHITE;
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })

            building = viewer.scene.primitives.add(
                new Cesium.Cesium3DTileset({
                    url: Cesium.IonResource.fromAssetId(698805)
                })
            );
            heightdetail.style.display = "none";
            authodetail.style.display = "none";
            zonedetail.style.display = "none";
            promise2.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise3.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise4.then(function (dataSource) {
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
                        color = Cesium.Color.BLUE;
                    }
                    else if (height <= 40) {
                        color = Cesium.Color.GREEN;
                    }
                    else if (height <= 60) {
                        color = Cesium.Color.YELLOW;
                    }
                    else if (height <= 80) {
                        color = Cesium.Color.ORANGE;
                    }
                    else {
                        color = Cesium.Color.RED;
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })
            heightdetail.style.display = "block";
            authodetail.style.display = "none";
            zonedetail.style.display = "none";
            promise1.then(function (dataSource) {
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
        if ($(this).val() == 'Autho') {
            promise3.then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var height = entity.properties.heigth_m;
                    var autho = entity.properties.autho;
                    if (autho == 'PMCU') {
                        color = Cesium.Color.GOLD;
                    }
                    else if (autho == 'PRM') {
                        color = Cesium.Color.HOTPINK;
                    }
                    else {
                        color = Cesium.Color.GREENYELLOW;
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })
            authodetail.style.display = "block";
            heightdetail.style.display = "none";
            zonedetail.style.display = "none";
            promise1.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise2.then(function (dataSource) {
                viewer.dataSources.remove(dataSource);
            });
            promise4.then(function (dataSource) {
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
                        color = Cesium.Color.SKYBLUE;
                    }
                    else if (permit_area == 'พาณิชย์') {
                        color = Cesium.Color.MEDIUMPURPLE;
                    }
                    else {
                        color = Cesium.Color.TOMATO;
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = height;
                }
            })
            zonedetail.style.display = "block";
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

cu_muvmi = Cesium.GeoJsonDataSource.load("SampleData/geojson/cu_muvmi_point_sta.geojson");

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

cu_cctv = Cesium.GeoJsonDataSource.load("SampleData/geojson/cu_cctv.geojson");

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

bus_point_sta = Cesium.GeoJsonDataSource.load("SampleData/geojson/bus_point_sta.geojson");

var bus_line;

// แสดงจุดจอดรถโดยสารและเส้นเดินรถ CU shuttle bus
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

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
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

// console.log(pm_value);

let order = [33, 5, 20, 27, 7, 31, 3, 4, 34, 15, 2, 14, 24, 17, 42, 9, 48, 18, 29, 16, 8, 22, 19, 43, 6, 10, 13, 28, 12, 1]
var value_order = [];
var name_order = [];
order.forEach(i => value_order.push(pm_value[i]));
order.forEach(i => name_order.push(sensor_name[i]));

// console.log(value_order);
// console.log(name_order);

var float_value_order = [];
var notnull_name_order = [];
for (var i in value_order) {
    let float_pm = value_order[i];
    let notnull_name = name_order[i];
    if (isNaN(float_pm)) {
    }
    else {
        float_value_order.push(float_pm);
        notnull_name_order.push(notnull_name);
    }
}

// console.log(float_value_order);
// console.log(notnull_name_order);

// คำนวณค่าเฉลี่ย pm 2.5
let avg = float_value_order.reduce((acc, n) => acc + n) / float_value_order.length

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

pm = Cesium.GeoJsonDataSource.load("SampleData/geojson/pm_data.geojson");

let bounds = {
    west: 100.5214395,
    east: 100.5384419,
    south: 13.732283788,
    north: 13.7472399,
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

const x = [
    100.52827082672026,
    100.530735495,
    100.53336099529372,
    100.53362132126873,
    100.52897664922266,
    100.5284448830326,
    100.52588761057089,
    100.52607772349693,
    100.52562212138446,
    100.5300350645523,
    100.53118969990342,
    100.52616823237871,
    100.5286910343361,
    100.52703400403058,
    100.53281971020373,
    100.52671494523415,
    100.52701860241476,
    100.53394516877444,
    100.53251041021073,
    100.53158436137483,
    100.53273926491897,
    100.53499334013432,
    100.5341594851453,
    100.53329814373315,
    100.53644656463388,
    100.52949799535911,
    100.52525116850217,
    100.53399404795518,
    100.53052842650057
]
const y = [
    13.73437807782637,
    13.744031875,
    13.742478828746677,
    13.734059158066245,
    13.738528542783136,
    13.738921753681495,
    13.735983793168788,
    13.741653209543246,
    13.744094289184645,
    13.734078441238907,
    13.73984616064568,
    13.74106230509176,
    13.737779598190468,
    13.740753337701406,
    13.73571061680461,
    13.737808937330932,
    13.74212954226,
    13.736336927303764,
    13.734159929929644,
    13.734335392970877,
    13.742677621881011,
    13.743392578426702,
    13.742488536798245,
    13.73471079449726,
    13.733036368027712,
    13.733937403248515,
    13.737400789545548,
    13.739344281202982,
    13.735987139477658
]

let data = [];
for (var i = 0; i < value_order.length; i++) {
    var data_value = { x: x[i], y: y[i], value: value_order[i] };
    data.push(data_value);
}

let valueMin = 0;
let valueMax = 51;

// นำเข้า logo pin pm 2.5 แต่ละสี และกำหนดตัวแปรที่จะแสดงผลที่แต่ละจุด
const location_gray = 'assets/svg/location-gray.svg'
const location_blue = 'assets/svg/location-blue.svg'
const location_green = 'assets/svg/location-green.svg'
const location_yellow = 'assets/svg/location-yellow.svg'
const location_orange = 'assets/svg/location-orange.svg'
const location_red = 'assets/svg/location-red.svg'
const textName = ""
const font = "400 16px CHULALONGKORN"
const backgroundColor = Cesium.Color.TRANSPARENT
const showBackground = true
const fillColor = Cesium.Color.BLACK
const outlineColor = Cesium.Color.WHITE
const outlineWidth = 2
const style = Cesium.LabelStyle.FILL_AND_OUTLINE
const pixelOffset = new Cesium.Cartesian2(0, -35)


// แสดง heatmap ของ pm 2.5
function PM() {
    var checkBox = document.getElementById("PM2.5");
    var pmdetail = document.getElementById("pm2.5detail");
    if (checkBox.checked == true) {
        heatMap.setWGS84Data(valueMin, valueMax, data);
        pm.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                entity.description = '<span style="font-weight: bold;"> PM 2.5: </span>' + value_order[i].toFixed(3) + ' µg/m<sup>3</sup>'
                entity.billboard = billboards.get(3);
                for (j in value_order) {
                    if (isNaN(value_order[j])) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.4,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: "N/A",
                                font,
                                backgroundColor,
                                showBackground,
                                fillColor,
                                outlineColor,
                                outlineWidth,
                                style,
                                pixelOffset,
                            },
                        });
                    }
                    else if (value_order[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.4,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + Math.round(value_order[j]),
                                font,
                                backgroundColor,
                                showBackground,
                                fillColor,
                                outlineColor,
                                outlineWidth,
                                style,
                                pixelOffset,
                            },
                        });
                    }
                    else if (value_order[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.4,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + Math.round(value_order[j]),
                                font,
                                backgroundColor,
                                showBackground,
                                fillColor,
                                outlineColor,
                                outlineWidth,
                                style,
                                pixelOffset,
                            },
                        });
                    }
                    else if (value_order[j] <= 100) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.4,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + Math.round(value_order[j]),
                                font,
                                backgroundColor,
                                showBackground,
                                fillColor,
                                outlineColor,
                                outlineWidth,
                                style,
                                pixelOffset,
                            },
                        });
                    }
                    else if (value_order[j] <= 200) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.4,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + Math.round(value_order[j]),
                                font,
                                backgroundColor,
                                showBackground,
                                fillColor,
                                outlineColor,
                                outlineWidth,
                                style,
                                pixelOffset,
                            },
                        });
                    }
                    else if (value_order[j] > 200) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.4,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + Math.round(value_order[j]),
                                font,
                                backgroundColor,
                                showBackground,
                                fillColor,
                                outlineColor,
                                outlineWidth,
                                style,
                                pixelOffset,
                            },
                        });
                    }
                }
            }
        })
    }
    else {
        pm.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
            viewer.entities.removeAll();
            pmdetail.style.display = "none";
        })
    }
}

// let bld_name = [];
// let power_value = [];
// for (var i = 4; i < 248; i++) {
//     if (i == 5 || i == 8 || i == 12 || i == 23 || i == 34 || i == 61 || i == 69 || i == 73 || i == 74 || i == 75 || i == 76 || i == 80 ||
//         i == 103 || i == 132 || i == 133 || i == 134 || i == 135 || i == 143 || i == 146 || i == 164 ||
//         i == 238 || i == 239 || i == 240 || i == 241 || i == 242) { continue; }
//     var url = 'http://94.74.116.125:9000/api/v1/node/' + i + '/usage_profile/day/power';
//     var json_obj_1 = JSON.parse(Get(url));
//     let name = `${json_obj_1.data['name']}`
//     let power = `${json_obj_1.data['power']}`
//     bld_name.push(name);
//     power_value.push(parseFloat(power));
// }

// // console.log(bld_name);
// // console.log(power_value);

// // กำหนดค่าที่จะแสดงผลในแกน x, y ของ bar chart และสีของ bar chart
var xValues = notnull_name_order;
var yValues = float_value_order;
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

// // กำหนดค่าที่จะแสดงผลในแกน x, y ของ bar chart
// var xValues2 = bld_name;
// var yValues2 = power_value;

// // map ค่าในแกน x และ y เข้าด้วยกัน
// let merged2 = xValues2.map((bar, i) => {
//     return {
//         "datapoint": yValues2[i],
//         "label": xValues2[i]
//     }
// })

// // จัดเรียง bar chart จากค่ามากไปน้อย
// const dataSort2 = merged2.sort(function (b, a) {
//     return a.datapoint - b.datapoint
// });

// const dp2 = [];
// const lab2 = [];
// for (i = 0; i < dataSort2.length; i++) {
//     dp2.push(dataSort2[i].datapoint);
//     lab2.push(dataSort2[i].label);
// }

// // กำหนดตัวแปรที่ใช้ในการแสดงผล bar chart
// const barchartData2 = {
//     labels: lab2,
//     datasets: [{
//         backgroundColor: barColors,
//         data: dp2,
//         footerFontColor: '#fff'
//     }]
// };

// const barchartconfig2 = {
//     type: "bar",
//     data: barchartData2,
//     options: {
//         maintainAspectRatio: false,
//         legend: { display: false },
//         title: {
//             display: true,
//             text: 'ข้อมูลการใช้พลังงานเฉลี่ยรายอาคาร'
//         }
//     }
// }

// // แสดง bar chart ของการใช้พลังงาน
// function barChart2() {
//     var checkBox = document.getElementById("bar2");
//     var barChart = document.getElementById("barchart2");
//     if (checkBox.checked == true) {
//         barChart.style.display = "block";
//         new Chart("myBarChart2", barchartconfig2);
//     } else {
//         barChart.style.display = "none";
//     }
// }

// แสดง pie chart การ classify ความสูงของอาคาร
function pieChart() {
    var checkBox = document.getElementById("pie");
    var pieChart = document.getElementById("piechart");
    if (checkBox.checked == true) {
        pieChart.style.display = "block";
        var xValues = ["0 - 20 เมตร", "21 - 40 เมตร", "41 - 60 เมตร", "61 - 80 เมตร", "มากกว่า 80 เมตร"];
        var yValues = [2252, 103, 32, 14, 8];
        var barColors = [
            "blue",
            "green",
            "yellow",
            "orange",
            "red"
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
            "gold",
            "hotpink",
            "greenyellow"
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
            "skyblue",
            "mediumpurple",
            "tomato"
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

