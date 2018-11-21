$(function () {
    var id = $.getUrlPara('id') || '';
    var videoObj = {
        41: 'http://www.catwj.cn/videos/323story.mp4',
        42: 'http://www.catwj.cn/videos/320gcstory.mp4',
        43: 'http://www.catwj.cn/videos/320story.mp4'
    };
    var videoUrl = videoObj[id];
    if (videoUrl){
        $('#player').attr('src', videoUrl);
        var player = document.getElementById('player');
        $('.cepingvideo').on('click', function () {
            $('.playerBox').show();
            $('body1').css({ 'overflow': 'hidden' })
            player.play();
        });
        $('.playerBox').on('click', function (e) {
            var target = e.target,
                $target = $(target);
            if ($target.closest('video').length) {
                if (player.paused) {
                    player.play();
                } else {
                    player.pause();
                }
            } else {
                player.pause();
                $('.playerBox').hide();
                $('body').css({ 'overflow': '' })
            }
        });
    }
});