$(function () {
    var id = $.getUrlPara('id') || '';
    var videoObj = {
        //15~30预计是新加的专家讲产品的视频 15是第十五期
        15: 'http://www.catwj.cn/videos/323story.mp4',
        16: 'http://www.catwj.cn/videos/323story.mp4',
        17: 'http://www.catwj.cn/videos/323story.mp4',
        18: 'http://www.catwj.cn/videos/323story.mp4',
        19: 'http://www.catwj.cn/videos/323story.mp4',
        20: 'http://www.catwj.cn/videos/323story.mp4',
        21: 'http://www.catwj.cn/videos/323story.mp4',
        22: 'http://www.catwj.cn/videos/323story.mp4',
        //41以后是同行谈心得的视频 41是第四十二期
        41: 'http://www.catwj.cn/videos/323story.mp4',
        42: 'http://www.catwj.cn/videos/320gcstory.mp4',
        43: 'http://www.catwj.cn/videos/320story.mp4',
        44: 'http://www.catwj.cn/videos/330gcstory.mp4',
        45: 'http://www.catwj.cn/videos/336gcstory.mp4', 
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