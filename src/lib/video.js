let player;

const YT_VIDEO_ID = '-Pnbg-b44is';

const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';

const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.loadVideo = function () {
    player = new window.YT.Player(`player`, {
        videoId: YT_VIDEO_ID,
        events: {
            onReady: onPlayerReady,
        },
        playerVars: { rel: 0, showinfo: 0, origin: window.location.pathname, modestbranding: 1 },
    });
};

function onPlayerReady(event) {
    event.target.playVideo();
}

export function stopVideo() {
    player?.stopVideo();
}

export function pauseVideo() {
    player?.pauseVideo();
}
