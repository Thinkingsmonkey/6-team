// Angie

let AUTHORIZATION_KEY_Angie = "CWB-853455FC-DE79-4717-82CC-6670E26F3399";
const now = new Date();
const hours = now.getHours();
let time = "night"
if (hours>=6 && hours<18){
    time = "day";
}
const screenWidth = window.innerWidth;

const mapIconLocation = {
    "嘉義縣":"translate(360px,490px)",
    "新北市":"translate(460px,170px)",
    "嘉義市":"translate(250px,480px)",
    "新竹縣":"translate(450px,290px)",
    "新竹市":"translate(370px,250px)",
    "臺北市":"translate(510px,150px)",
    "臺南市":"translate(240px,540px)",
    "宜蘭縣":"translate(580px,250px)",
    "苗栗縣":"translate(340px,290px)",
    "雲林縣":"translate(250px,430px)",
    "花蓮縣":"translate(530px,450px)",
    "臺中市":"translate(320px,330px)",
    "臺東縣":"translate(470px,600px)",
    "桃園市":"translate(400px,190px)",
    "南投縣":"translate(420px,420px)",
    "高雄市":"translate(250px,600px)",
    "金門縣":"translate(200px,280px)",
    "屏東縣":"translate(300px,700px)",
    "基隆市":"translate(570px,170px)",
    "澎湖縣":"translate(180px,500px)",
    "彰化縣":"translate(280px,380px)",
    "連江縣":"translate(200px,20px)"
}

const mapIconLocationforSmallScreen = {
    "嘉義縣":"translate(250px,350px)",
    "新北市":"translate(300px,130px)",
    "嘉義市":"translate(160px,360px)",
    "新竹縣":"translate(300px,210px)",
    "新竹市":"translate(250px,180px)",
    "臺北市":"translate(340px,120px)",
    "臺南市":"translate(160px,400px)",
    "宜蘭縣":"translate(390px,200px)",
    "苗栗縣":"translate(220px,210px)",
    "雲林縣":"translate(170px,330px)",
    "花蓮縣":"translate(370px,300px)",
    "臺中市":"translate(200px,240px)",
    "臺東縣":"translate(330px,440px)",
    "桃園市":"translate(270px,150px)",
    "南投縣":"translate(280px,310px)",
    "高雄市":"translate(170px,450px)",
    "金門縣":"translate(150px,230px)",
    "屏東縣":"translate(200px,500px)",
    "基隆市":"translate(380px,130px)",
    "澎湖縣":"translate(120px,400px)",
    "彰化縣":"translate(180px,280px)",
    "連江縣":"translate(250px,50px)"
}


function loadMapData() {
    src = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization="+AUTHORIZATION_KEY_Angie+"&format=JSON&sort=time"
    fetch(src)
    .then((response) => response.json())
    .then(function(data) {
        const mapWeatherDataList = data["records"]["location"];
        mapWeatherDataList.forEach(function(e){
            const mapLocationName = e["locationName"];
            const mapWeatherElementParameterValue = e["weatherElement"][0]["time"][0]["parameter"]["parameterValue"];
            const [weatherType] = Object.entries(weatherTypes[time]).find(([weatherType, weatherCodes]) =>
                    weatherCodes.includes(Number(mapWeatherElementParameterValue)));
            mapElement = document.querySelector(".map__weather__icon");
            const img = document.createElement("img");
            img.src = `./icon/images/${weatherType}.svg`;
            img.style.width = "40px"
            img.style.position = 'absolute';
            img.style.top = "0px";
            img.style.cursor="pointer";
            img.style.filter = "drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.4))";
            renderInfor(mapLocationName, img);
            img.style.transform = mapIconLocation[mapLocationName];
            img.className=mapLocationName;
            if (screenWidth<=600){
                img.style.width = "20px"
                img.style.transform = mapIconLocationforSmallScreen[mapLocationName];
            }
            mapElement.appendChild(img);
        }
        );
    })
}

window.onload = loadMapData;
