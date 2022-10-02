const input = document.querySelector("#input");
const searchBtn = document.querySelector(".fa-magnifying-glass");



//Result Vars
const ipSpan = document.querySelector(".ipSpan");
const locationSpan = document.querySelector(".locationSpan");
const zoneSpan = document.querySelector(".zoneSpan");
const ISPSpan = document.querySelector(".ISPSpan");


// https://ipapi.co/{ip}/json/

window.addEventListener("load",function(e){
     Swal.fire({
        allowOutsideClick : false,
        title : 'Welcome to the Ip Address Tracker',
        text: 'Enjoy finding ip locations!',
        icon: 'info',
      });
    
      Swal.fire({
        title: 'Welcome to the Ip Address Tracker',
        text: "",
        html: "<li>Enjoy tracking ips!</li><br><li>You may not see the marker first. Please scroll a bit to see the marker.</li><br><li>Please report to me if you find any bugs.</li>",
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Lets start with your ip!',
            '',
            'success'
          )
        }
      })
    axios.get("https://ipapi.co/ip")
    .then(res => {getClientIp(res) });
    // console.log(val);
    // input.value = axios("https://ipapi.co/ip")
})

function getClientIp(d){
    const ip = d.data;
    input.value = ip;
    searchBtn.click();
    input.value = "";
}

let reg = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/

searchBtn.addEventListener("click",function(e){
    if (reg.test(input.value)){
        const ip = input.value;
        const link = `https://ipapi.co/${ip}/json/`
        fetch(link)
        .then(res => res.json())
        .then(data => {
            useData(data);
        })
    }else{
        alert("Not valid try again!")
    }
})


var map = L.map('map').setView([40.52, 34.34], 2);

    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // var marker = L.marker([51.5, -0.09]).addTo(map);

function useData(d){
    const { ip , city , region , country ,latitude, longitude, utc_offset, org} = d
    ipSpan.innerText =ip;
    locationSpan.innerText = `${city},${region}/${country}`
    zoneSpan.innerText = `UTC ${utc_offset.slice(0,3)}`;
    ISPSpan.innerText = org;
    // map.off();
    //  var map = L.map('map').setView([latitude, longitude], 13);
    //  var marker = L.marker([latitude, longitude]).addTo(map);
    map.setView([latitude,longitude],13);
    L.marker([latitude,longitude]).addTo(map);
    // L.popup()
    // .setLatLng([latitude, longitude])
    // .setContent(`${ip}`)
    // .openOn(map);
    input.value = "";
}


