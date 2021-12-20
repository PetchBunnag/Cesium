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

var promise = Cesium.GeoJsonDataSource.load("polygon_bldg_buff.geojson");

// แสดงอาคาร
function Buildings() {
    var checkBox = document.getElementById("Buildings");
    if (checkBox.checked == true) {
        promise.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            var colorHash = {};
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var id = entity.properties.id;
                // if (id == 69) {
                //     entity.description = '<img src="https://static.posttoday.com/media/content/2019/09/20/886EF6988A6044CB8DFDAFC870997CE2.jpg" style="display: block; width: 50%; margin-left: auto; margin-right: auto;">'
                //         + '<p>สามย่านมิตรทาวน์ (Samyan Mitrtown) เป็นโครงการพัฒนาพื้นที่เชิงพาณิชยกรรมแบบผสมบริเวณหัวมุมตะวันตกเฉียงเหนือของสี่แยกสามย่าน ระหว่างถนนพระรามที่ 4 และถนนพญาไท โดยบริษัท เกษมทรัพย์ภักดี จำกัด (มหาชน) ได้ทำสัญญาเช่าที่ดินจำนวน 13 ไร่จากจุฬาลงกรณ์มหาวิทยาลัย เป็นระยะเวลา 30 ปี ภายในโครงการประกอบด้วยพื้นที่ค้าปลีก ที่อยู่อาศัย และอาคารสำนักงาน พื้นที่รวม 222,000 ตร.ม. ก่อสร้างตามแนวคิดห้องสมุดแห่งชีวิตของคนเมือง (Urban Life Library) ภายใต้งบลงทุนรวม 9,000 ล้านบาท พัฒนาโครงการโดย บริษัท แผ่นดินทอง พร็อพเพอร์ตี้ ดีเวลลอปเม้นท์ จำกัด (มหาชน) หรือ โกลเด้นแลนด์ และบริหารศูนย์การค้าโดย บริษัท เกษมทรัพย์ภักดี จำกัด ซึ่งเกิดขึ้นจากการร่วมทุนของบริษัท ทีซีซี แอสเซ็ทส์ (ไทยแลนด์) จำกัด และบริษัท โกลเด้น พร็อพเพอร์ตี้ เซอร์วิสเซส จำกัด</p>'
                //         + '<p>ที่มา: <a href="http://th.wikipedia.org/wiki/สามย่านมิตรทาวน์">Wikipedia</a></p>';
                // };
                var height = entity.properties.heigth_m;
                var color = colorHash[id];
                color = Cesium.Color.fromAlpha(Cesium.Color.TRANSPARENT, 0.01);
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
    }
    else {
        promise.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
        });
        viewer.scene.primitives.remove(building);
    }
}
Buildings();

// แสดงการ classify ความสูงของอาคาร
function Height() {
    var checkBox = document.getElementById("Height");
    var heightdetail = document.getElementById("heightdetail");
    if (checkBox.checked == true) {
        promise.then(function (dataSource) {
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
    }
    else {
        promise.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
        });
        heightdetail.style.display = "none";
    }
}

// แสดงการ classify หน่วยงานของอาคาร
function Autho() {
    var checkBox = document.getElementById("Autho");
    var authodetail = document.getElementById("authodetail");
    if (checkBox.checked == true) {
        promise.then(function (dataSource) {
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
    }
    else {
        promise.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
        });
        authodetail.style.display = "none";
    }
}

function Zone() {
    var checkBox = document.getElementById("Zone");
    var zonedetail = document.getElementById("zonedetail");
    if (checkBox.checked == true) {
        promise.then(function (dataSource) {
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
    }
    else {
        promise.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
        });
        zonedetail.style.display = "none";
    }
}

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

cu_muvmi = Cesium.GeoJsonDataSource.load("cu_muvmi_point_sta.geojson");

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

cu_cctv = Cesium.GeoJsonDataSource.load("cu_cctv.geojson");

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

bus_point_sta = Cesium.GeoJsonDataSource.load("bus_point_sta.geojson");

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

pm = Cesium.GeoJsonDataSource.load("pm_data.geojson");

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

const x = [100.52589, 100.52606, 100.53004, 100.53316, 100.53399, 100.53158, 100.53229, 100.52838, 100.5295, 100.53415, 100.5325]
const y = [13.73597, 13.74154, 13.73411, 13.73471, 13.73934, 13.73432, 13.73519, 13.73691, 13.73391, 13.74243, 13.73418]

let data = [
    { x: x[0], y: y[0], value: value[0] },
    { x: x[1], y: y[1], value: value[1] },
    { x: x[2], y: y[2], value: value[2] },
    { x: x[3], y: y[3], value: value[3] },
    { x: x[4], y: y[4], value: value[4] },
    { x: x[5], y: y[5], value: value[5] },
    { x: x[6], y: y[6], value: value[6] },
    { x: x[7], y: y[7], value: value[7] },
    { x: x[8], y: y[8], value: value[8] },
    { x: x[9], y: y[9], value: value[9] },
    { x: x[10], y: y[10], value: value[10] },
];
let valueMin = 0;
let valueMax = 20;

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
const pixelOffset = new Cesium.Cartesian2(0, -45)

// แสดง heatmap ของ pm 2.5
function PM() {
    var checkBox = document.getElementById("PM2.5");
    var pmdetail = document.getElementById("pm2.5detail");
    if (checkBox.checked == true) {
        // add data to heatmap
        heatMap.setWGS84Data(valueMin, valueMax, data);
        pm.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var id = entity.properties.id;
                entity.billboard = billboards.get(3);
                if (id = 10) {
                    var j = 0;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 11) {
                    var j = 1;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 18) {
                    var j = 2;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 19) {
                    var j = 3;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 24) {
                    var j = 4;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 26) {
                    var j = 5;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 28) {
                    var j = 6;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 32) {
                    var j = 7;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 33) {
                    var j = 8;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: "N/A", font,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 38) {
                    var j = 9;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                if (id = 64) {
                    var j = 10;
                    if (value[j] == 0) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_gray,
                                scale: 0.5,
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
                    else if (value[j] <= 25) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_blue,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 37) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_green,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 50) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_yellow,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else if (value[j] <= 90) {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_orange,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
                    else {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(x[j], y[j]),
                            billboard: {
                                image: location_red,
                                scale: 0.5,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            },
                            label: {
                                text: textName + value[j].toFixed(3),
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
            pmdetail.style.display = "block";
        });
    }
    else {
        pm.then(function (dataSource) {
            viewer.dataSources.remove(dataSource);
            viewer.entities.removeAll();
            pmdetail.style.display = "none";
        })
    }
}

// คำนวณค่าเฉลี่ย pm 2.5
let avg = (value[0] + value[1] + value[2] + value[3] + value[4] + value[5] + value[6] + value[7] + value[8] + value[9] + value[10]) / 11

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
    else if (avg <= 37) {
        document.getElementById("avg").style.color = '#83E702';
        document.getElementById("image").innerHTML = green_img;
    }
    else if (avg <= 50) {
        document.getElementById("avg").style.color = '#F6FF36';
        document.getElementById("image").innerHTML = yellow_img;
    }
    else if (avg <= 90) {
        document.getElementById("avg").style.color = '#F93';
        document.getElementById("image").innerHTML = orange_img;
    }
    else if (avg > 90) {
        document.getElementById("avg").style.color = '#F33';
        document.getElementById("image").innerHTML = red_img;
    }
    else {
        document.getElementById("avg").style.color = '#4C4C4C';
    }
}
avgcolor();

// กำหนดค่าที่จะแสดงผลในแกน x, y ของ bar chart และสีของ bar chart
var xValues = ["อาคารจามจุรี 9", "อาคารจุฬานิวาส", "อาคารชัยยศสมบัติ", "อาคารสำราญราษฎร์บริรักษ์", "อาคารมหาจักรีสิรินธร", "อาคารเศรษฐศาสตร์", "อาคารเปรมบุรฉัตร", "อาคารพูนทรัพย์ นพวงศ์ ณ อยุธยา", "อาคารอนุสรณ์ 50 ปี", "อาคารสัตววิทยวิจักษ์", "อาคารวิศิษฐ์ ประจวบเหมาะ"];
var yValues = [value[0].toFixed(3), value[1].toFixed(3), value[2].toFixed(3), value[3].toFixed(3), value[4].toFixed(3), value[5].toFixed(3), value[6].toFixed(3), value[7].toFixed(3), value[8].toFixed(3), value[9].toFixed(3), value[10].toFixed(3)];
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