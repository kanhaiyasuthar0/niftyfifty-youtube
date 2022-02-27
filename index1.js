// `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${input.value}&type=video&key=AIzaSyBPo8ftIoPViBJeLeAgOLS0sZXDq0l-IMA`
//  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=trending&type=video&key=AIzaSyBPo8ftIoPViBJeLeAgOLS0sZXDq0l-IMA`;
//api key--> AIzaSyBPo8ftIoPViBJeLeAgOLS0sZXDq0l-IMA
// AIzaSyBEDJodNTah5jNOEaKc2OEWlb1K8g0MNFw

//GET https://youtube.googleapis.com/youtube/v3/search?part=string&maxResults=50&q=ICN%20Studio&type=video&key=[YOUR_API_KEY] HTTP/1.1

let btn = document.querySelector("#btn");
let right = document.querySelector(".right");
let logo = document.getElementById("logo");
// let localid = document.querySelector("id");
let localid = localStorage.getItem("id");
let call = JSON.parse(localStorage.getItem("call"));

// console.log(localid)
let url;

//when user searched for any inputs
btn.addEventListener("click", () => {
  let input = document.getElementById("input");
  url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${input.value}&type=video&key=AIzaSyDV4mL7oAMtNA6aIF_WM_o_VYZzrv_xKyQ`;
  getdata(url);
});


//when localstorage id is empty;
if (localid == null) {
  url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=javascript&type=video&key=AIzaSyDV4mL7oAMtNA6aIF_WM_o_VYZzrv_xKyQ`;
  getdata(url);
}

// fetching req as per url
async function getdata(url) {
  try {
    let data1 = await fetch(url);
    let res1 = await data1.json();
    displaydata(res1.items);
  } catch (error) {
    console.log(error);
  }
}

//displaying mainpage with results as per videos
function displaydata(videos) {
  // console.log(videos)
  right.innerHTML = "";
  videos.forEach((video) => {
    let {
      id: { videoId },
      snippet: {
        channelId,
        channelTitle,
        description,
        thumbnails: {
          default: { url },
        },
      },
    } = video;
    // console.log(videoId)
    let vdiv = document.createElement("div");
    vdiv.setAttribute("class", "vcard");
    vdiv.innerHTML = `<div id="vthumb"><img src=${url} alt=""></div>
        <div class="vfoot">
            <h3 id="vtitle">${channelTitle}</h3>
        </div>`;

    vdiv.onclick = function () {
      setId(video);
    };

    //final append
    right.append(vdiv);
  });
}

// routing and saving the
function setId(video) {
  localStorage.setItem("id", JSON.stringify(video));

  location.href = "/clicked.html";
}
