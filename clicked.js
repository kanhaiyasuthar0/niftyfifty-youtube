let dataid = JSON.parse(localStorage.getItem("id"));
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let btn = document.querySelector("#btn");


btn.addEventListener("click", () => {
    let input = document.getElementById("input");
    let url1 = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${input.value}&type=video&key=AIzaSyDV4mL7oAMtNA6aIF_WM_o_VYZzrv_xKyQ`;
    
    
  });





let {id:{videoId},snippet:{channelId,channelTitle,description,thumbnails:{default:{url}},title } } = dataid;



// <iframe width="942" height="530" src="https://www.youtube.com/embed/Tdr_tBqfU9A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



// function toshow the main video

// curl \
//   'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=4&myRating=like&key=AIzaSyDV4mL7oAMtNA6aIF_WM_o_VYZzrv_xKyQ' \
//   --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
//   --header 'Accept: application/json' \
//   --compressed


if(videoId){
 let ldiv = document.createElement("div");
 ldiv.setAttribute("class", "video");
 
ldiv.innerHTML = `<iframe width="942" height="530" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<h2>${title}</h2>`

left.append(ldiv);
// console.log("left")
getdata();

}


// console.log(channelTitle)

async function getdata(){
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${channelTitle}&kind= youtubecommentThread&type=video&myRating=like&key=AIzaSyDV4mL7oAMtNA6aIF_WM_o_VYZzrv_xKyQ`;
    try {
        let data1 = await fetch(url);
        let res1 = await data1.json(); 
        console.log(res1.items)
        displaydata(res1.items);
    } catch (error) {
        console.log(error);
    }
}


function displaydata(videos){
    console.log("Yes")
    right.innerHTML = "";
    videos.forEach(video => {
       let {id:{videoId},snippet:{channelId,channelTitle,description,thumbnails:{default:{url}},title } } = video
        // console.log(videoId)
        let vdiv = document.createElement("div");
        vdiv.setAttribute("class", "vcard2");
        vdiv.innerHTML = `<div id="vthumb"><img src=${url} alt=""></div>
        <div class="vfoot">
            <h4 id="vtitle">${title}</h4>
        </div>`
        
        vdiv.onclick = function(){
            setId(video);
        }
            
            
            //final append
            right.append(vdiv);
        });
        // console.log("right")
        
    }

    function setId(video){
        localStorage.setItem("id", JSON.stringify(video));
        
    
        location.href = "/clicked.html";
    }

    async function word(){
        let wordh = document.querySelector(".wordh");
        try {
            let data2 = await fetch(`https://random-word-api.herokuapp.com/word?number=20`);
            let res2= await data2.json(); 
            // console.log(res2)
            // console.log("yes")
            // displaydata(res1.items);

            res2.forEach(Element=>{
                let div = document.createElement("div");
                div.setAttribute("class" , "word");
                div.innerText = Element;
                // console.log(Element)
                div.addEventListener("click" , async()=>{
                    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${Element}&type=video&myRating=like&key=AIzaSyDV4mL7oAMtNA6aIF_WM_o_VYZzrv_xKyQ`;
                    try {
                        let data1 = await fetch(url);
                        let res1 = await data1.json(); 
                        // console.log(res1.items)
                        displaydata(res1.items);
                    } catch (error) {
                        console.log(error);
                    }
                })
                wordh.append(div)
            })
            // right.append(wordh)
            // console.log("word")

            
        } catch (error) {
            console.log(error);
        }
        localStorage.removeItem("id");
        
    }
    word();