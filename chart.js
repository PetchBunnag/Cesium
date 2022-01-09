function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

let bld_name = [];
let power_value = [];
for (var i = 4; i < 248; i++) {
    if (i == 5 || i == 8 || i == 12 || i == 23 || i == 61 || i == 69 || i == 73 || i == 74 || i == 75 || i == 76 || i == 80 ||
        i == 103 || i == 132 || i == 133 || i == 134 || i == 135 || i == 143 || i == 146 || i == 164 ||
        i == 238 || i == 239 || i == 240 || i == 241 || i == 242) { continue; }
    var url = 'http://94.74.116.125:9000/api/v1/node/' + i + '/usage_profile/day/power';
    var json_obj_1 = JSON.parse(Get(url));
    let name = `${json_obj_1.data['name']}`
    let power = `${json_obj_1.data['power']}`
    bld_name.push(name);
    power_value.push(parseFloat(power));
}

// กำหนดค่าที่จะแสดงผลในแกน x, y ของ bar chart
var xValues = bld_name;
var yValues = power_value;
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
            text: 'ข้อมูลการใช้พลังงานเฉลี่ยรายอาคาร'
        }
    }
}

new Chart("myChart", barchartconfig);