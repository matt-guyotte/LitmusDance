function ytLinkChange() {
    var youTubeLinkCont = document.getElementById('youtube-update-link');
    var youtubeLink = youTubeLinkCont.value;
    console.log(youtubeLink);
    fetch('/youtubelink/?link=' + youtubeLink)
}

var youTubeSubmit = document.getElementById("youtube-update-submit");
youTubeSubmit.addEventListener('click', () => {ytLinkChange()})


