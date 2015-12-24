$(document).ready(function() {

    // Show/hide main nav
    $('.nav-trigger').click(function() {
        $(this).toggleClass('nav-trigger-a');
        $('.nav ul').toggleClass('nav-visible').slideToggle();
    })

    // Slideshow initialization
    $('.slideshow').cycle({
        autoHeight: 'container',
        slides: '> div',
        timeout: 0
    });

    // Hover replacement for mobile devices
    $('.touch .works .item').click(function() {
        $(this).addClass('hover').siblings().removeClass('hover');
    });

    // Form validation
    $(".contact-form").validate({
        errorClass: "inp-error",
        validClass: "inp-success",
        rules: {
            email: {
                email: true
            }
        }
    });

    // Form submit
    var mesShowDelay = 5000;
    $(".contact-form").submit(function(e){
        $('.message', this).remove();
        if($(".contact-form").valid()){
            e.preventDefault();
            $(this).prepend('<div class="loading"></div>');
            dataString = $(".contact-form").serialize();
            $.ajax({
                type: "POST",
                url: "send.php",
                data: dataString,
                success: function(data) {
                    $('.contact-form .loading').remove();
                    $('.contact-form').prepend('<div class="message message-ok">Your message was sent successfully!</div>').find('.message').fadeIn().delay(mesShowDelay).fadeOut();
                },
                error: function(data) {
                    $('.contact-form .loading').remove();
                    $('.contact-form').prepend('<div class="message message-error">Your message wasn\'t sent,<br> please try again.</div>').find('.message').fadeIn().delay(mesShowDelay).fadeOut();
                }
            });
        }
    });

    // Popup initialization
    $('.zoom-btn').magnificPopup({
        gallery: {
            // options for gallery
            enabled: true
        },
        type:'image',
        titleSrc: 'title'
    });

    // Placeholders polyfill
    $('.inp-text, textarea').placeholder();

    // Media query event handler
    if (matchMedia) {
        var mq = window.matchMedia("(max-width: 940px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    function WidthChange(mq) {
        if (mq.matches) {
            $('.nav a').removeClass('active');
            $('.nav a').unbind('click').click();
        }
        else {

            // Scrollbars initialization
            $('.scroll-b').mCustomScrollbar({
                scrollInertia:500,
                advanced:{
                    updateOnContentResize: true
                }
            });

            $('.nav li:not(.ext)').click(function(e) {
                e.preventDefault();
                var targetSecIndex = $(this).index('li:not(.ext)');
                $('.nav a').removeClass('active');
                $('a', this).addClass('active');
                $('.main-sec-b, .aside-sec-b, .secondary-aside-sec-b').removeClass('inactive-sec');
                $('.active-sec').removeClass('active-sec').addClass('inactive-sec');
                $('.first-sec').removeClass('first-sec').addClass('inactive-sec');
                $('.main-sec-b').eq(targetSecIndex).addClass('active-sec');
                $('.aside-sec-b').eq(targetSecIndex).addClass('active-sec');
                $('.secondary-aside-sec-b').eq(targetSecIndex).addClass('active-sec');
            });

        }
    }

    var mapSet = (function() {

        // Google map setup
        // Create an array of styles.
        var stylesArray = [
            {
                stylers: [
                    { saturation: -100 }
                ]
            },{
                featureType: 'road',
                elementType: 'labels',
                stylers: [
                    { visibility: 'off' }
                ]
            }
        ],

        // Latitude and longitude for your location goes here
        lat = 41.8987,
        lng = 12.481813,

        // Create a new StyledMapType object, passing it the array of styles,
        // as well as the name to be displayed on the map type control.
        customMap = new google.maps.StyledMapType(stylesArray,
        {name: 'Styled Map'}),

        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng( lat, lng ),
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP]
            }
        },
        map = new google.maps.Map(document.getElementById('map'), mapOptions),
        myLatlng = new google.maps.LatLng( lat, lng ),

        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: "assets/img/marker.png"
        });
            
        // Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', customMap);
        map.setMapTypeId('map_style');

    })();

});