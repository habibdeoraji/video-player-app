$(function () {


    // Right Section
    $.get("https://6075a1380baf7c0017fa69e8.mockapi.io/habib/videoplayer", function (videoThumnailList) {

        for (var i = 0; i < videoThumnailList.length; i++) {
            videoCardRendered(videoThumnailList[i], i)
        }

    })


    // Left Section
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/video", function (videoDetailsList) {
        iframeCardPlayer(videoDetailsList, 1)

    })


    function videoCardRendered(cardDetails, position) {
        var videoCard = $("<div>");
        videoCard.addClass('video-card');
        if (position === 0) {
            videoCard.addClass('video-card active')
        }

        var videoId = cardDetails.id;

        var videoThumbnail = $("<img>").attr("src", cardDetails.thumbnail);

        videoThumbnail.addClass('video-thumnail');

        var videoTitle = $("<p>").text(cardDetails.title)
        videoTitle.addClass('video-title');

        videoCard.append(videoThumbnail, videoTitle);

        $('#right-section').append(videoCard);


        // Event
        videoCard.click(function () {

            $('.video-card').removeClass('active')
            videoCard.addClass('video-card active');
            $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/video", function (videoDetailsList) {
                console.log($('#video-card-wrapper'))
                $('#video-card-wrapper').html('')
                $('.video-title-description').html('')
                iframeCardPlayer(videoDetailsList, videoId)
            })
        })
    }


    function iframeCardPlayer(videoDetailsList, id) {

        var pos = id - 1;

        var videoCardWrapper = $("#video-card-wrapper");

        var videoCardIframe = $('<iframe>').attr({
            "src": "https://player.vimeo.com/video/" + videoDetailsList[pos].vimeoId,
            "frameborder": "0",
            "width": "100%",
            "height": "400px"
        });

        var videoCardContentWrapper = $("<div>");
        videoCardContentWrapper.addClass('video-card-content-wrapper');

        var videoViews = $("<span>");
        var views=(videoDetailsList[pos].views)/1000;
        if (views>999){
            views=(views/1000).toFixed(2);
            views=views+"m"
        }else{
            views=views+"k"
        }
        videoViews.text(views+" views");
        videoViews.addClass('video-views')

        var isVideoLike = $('<li>');
        isVideoLike.addClass("fas fa-heart is-video-like");
        if (videoDetailsList[pos].isLiked === "true" || videoDetailsList[pos].isLiked === true) {
            isVideoLike.css("color", "#fad745")
        }else{
            isVideoLike.css("color", "#ccc")

        }


        // video like Dislike
        isVideoLike.click(function(){
            console.log(videoDetailsList[pos].isLiked)
            console.log("Like button clicked")
            if(videoDetailsList[pos].isLiked==="true"){
                videoDetailsList[pos].isLiked="false";
                isVideoLike.css("color", "#ccc")
            }else{
                videoDetailsList[pos].isLiked="true";
             isVideoLike.css("color", "#fad745")

            }
        })


        var isVideoBookmark = $('<li>');
        isVideoBookmark.addClass("fas fa-bookmark is-video-bookmark");
        if (videoDetailsList[pos].isSaved === "true" ||videoDetailsList[pos].isSaved === true ) {
            isVideoBookmark.css("color", "#fad745")
        }else{
            videoDetailsList[pos].isSaved="true";
         isVideoBookmark.css("color", "#ccc")

        }



        // isVideo bookmarked
        isVideoBookmark.click(function(){
            console.log(videoDetailsList[pos].isLiked)
            console.log("Like button clicked")
            if(videoDetailsList[pos].isLiked==="true"){
                videoDetailsList[pos].isLiked="false";
                isVideoBookmark.css("color", "#ccc")
            }else{
                videoDetailsList[pos].isLiked="true";
             isVideoBookmark.css("color", "#fad745")

            }
        })

        var likeBookmarkWrapper = $('<div>');
        likeBookmarkWrapper.addClass('like-bookmark-wrapper')

        likeBookmarkWrapper.append(isVideoLike, isVideoBookmark)

        videoCardContentWrapper.append(videoViews, likeBookmarkWrapper)

        videoCardWrapper.append(videoCardIframe, videoCardContentWrapper)
        $('#left-section').append(videoCardWrapper)

        var videoTitleDescription = $('<div>');
        videoTitleDescription.addClass('video-title-description');

        var videoTitle = $("<h1>");
        videoTitle.text(videoDetailsList[pos].title);

        var videoDescription = $('<p>');
        videoDescription.text(videoDetailsList[pos].description);

        videoTitleDescription.append(videoTitle, videoDescription)

        $("#left-section").append(videoTitleDescription)
    }

})