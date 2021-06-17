async function callLink() {
    var videoLink = document.getElementById('video-canvas');

    let getLinkCall = await fetch('/getyoutubelink');
    let youtubeLink = await getLinkCall.json();

    console.log(youtubeLink);

    if(youtubeLink !== undefined && youtubeLink !== null && youtubeLink.hasOwnProperty('link') !== false) {
        videoLink.src = youtubeLink.link.link;
    }
}
callLink();