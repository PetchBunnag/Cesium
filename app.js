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

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var json_obj = JSON.parse(Get('http://159.138.252.132:9000/api/v1/pm_sensor/data'));
let sensor_name = []
let pm_value = []
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
    var data_value = {x: x[i], y: y[i], value: value_order[i]};
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

// กำหนดค่าที่จะแสดงผลในแกน x, y ของ bar chart และสีของ bar chart
// var xValues = ["อาคารจามจุรี 2", "อาคารจามจุรี 9", "อาคารจุฬานิวาส", "อาคารไชยยศสมบัติ", "อาคารนารถ โพธิประสาท", "อาคารวิศิษฐ์ ประจวบเหมาะ", "อาคารเศรษฐศาสตร์", "อาคารสมเด็จย่า 93", "อาคารสำราญราษฎร์บริรักษ์", "อาคารอนุสรณ์ 50 ปี", "อาคารมหาจักรีสิรินธร", "อาคารมหามกุฎ"];
// var yValues = [value[0].toFixed(3), value[1].toFixed(3), value[2].toFixed(3), value[3].toFixed(3), value[4].toFixed(3), value[5].toFixed(3), value[6].toFixed(3), value[7].toFixed(3), value[8].toFixed(3), value[9].toFixed(3), value[10].toFixed(3), value[11].toFixed(3)];
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