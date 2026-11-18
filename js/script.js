$(function(){

    // Current navigation highlighting

    var current =
        window.location.pathname.split('/').pop()
        || 'index.html';


    $('.navbar-nav .nav-link').each(function(){

        if($(this).attr('href') === current){

            $(this).addClass('active');

        }

    });



    // Bootstrap gallery modal

    $('.gallery-item').on('click', function(){

        $('#modalGalleryImage').attr(
            'src',
            $(this).data('img')
        );

    });



    // Tournament search and level filtering

    function filterEvents(){

        var q =
            ($('#eventSearch').val() || '')
            .toLowerCase();


        var level =
            $('#eventLevel').val();


        $('.event-card-wrap').each(function(){

            var text =
                $(this).text().toLowerCase();


            var okText =
                text.indexOf(q) > -1;


            var okLevel =
                level === 'all'
                || $(this).data('level') === level;


            $(this).toggle(
                okText && okLevel
            );

        });

    }


    $('#eventSearch, #eventLevel').on(
        'input change',
        filterEvents
    );



    // jQuery AJAX
    // Loads tournament information from data/event.json

    if($('#ajaxEvents').length){

        $.ajax({

            url: 'data/event.json',

            dataType: 'json',

            success: function(events){

                var output = '';


                $.each(events, function(index, event){

                    output += `

                        <div class="col-md-4 mb-4">

                            <div class="ajax-event-card">

                                <span class="pill">
                                    ${event.level}
                                </span>


                                <h5 class="mt-3">
                                    ${event.name}
                                </h5>


                                <p class="mb-1">

                                    <strong>
                                        Date:
                                    </strong>

                                    ${event.date}

                                </p>


                                <p class="mb-0">

                                    <strong>
                                        Location:
                                    </strong>

                                    ${event.location}

                                </p>

                            </div>

                        </div>

                    `;

                });


                $('#ajaxEvents').html(output);

            },


            error: function(){

                $('#ajaxEvents').html(

                    '<div class="col-12">' +

                    '<div class="alert alert-warning">' +

                    'Unable to load tournament information.' +

                    '</div>' +

                    '</div>'

                );

            }

        });

    }



    // jQuery UI Component 1
    // Coaching FAQ Accordion

    if($('#swimAccordion').length){

        $('#swimAccordion').accordion({

            collapsible: true,

            heightStyle: 'content',

            active: false

        });

    }



    // jQuery UI Component 2
    // Registration Datepicker

    if($('#startDate').length){

        $('#startDate').datepicker({

            minDate: 0,

            dateFormat: 'mm/dd/yy'

        });

    }



    // Coupon claim using localStorage

    function renderCoupons(){

        var codes =
            JSON.parse(
                localStorage.getItem(
                    'splashesCoupons'
                ) || '[]'
            );


        if($('#claimedCoupons').length){

            $('#claimedCoupons').text(

                codes.length

                ? 'Claimed coupons: '
                  + codes.join(', ')

                : 'No coupons claimed yet.'

            );

        }

    }



    $('.claim-coupon').on('click', function(){

        var code =
            $(this).data('code');


        var codes =
            JSON.parse(
                localStorage.getItem(
                    'splashesCoupons'
                ) || '[]'
            );


        if(codes.indexOf(code) === -1){

            codes.push(code);


            localStorage.setItem(

                'splashesCoupons',

                JSON.stringify(codes)

            );

        }


        $(this)
            .text('Claimed ✓')
            .prop('disabled', true);


        renderCoupons();

    });


    renderCoupons();



    // Contact form validation

    $('#contactForm').on('submit', function(e){

        e.preventDefault();


        if(this.checkValidity() === false){

            e.stopPropagation();

            $(this).addClass(
                'was-validated'
            );

            return;

        }


        $('#contactSuccess')
            .removeClass('d-none');


        this.reset();


        $(this).removeClass(
            'was-validated'
        );

    });



    // Registration validation
    // and demo localStorage persistence

    $('#registrationForm').on('submit', function(e){

        e.preventDefault();


        if(this.checkValidity() === false){

            e.stopPropagation();

            $(this).addClass(
                'was-validated'
            );

            return;

        }


        var record = {

            firstName:
                $('#firstName').val(),

            lastName:
                $('#lastName').val(),

            age:
                $('#age').val(),

            level:
                $('#level').val(),

            interest:
                $('input[name="interest"]:checked')
                .next('label')
                .text()
                .trim(),

            startDate:
                $('#startDate').val(),

            email:
                $('#regEmail').val(),

            phone:
                $('#regPhone').val(),

            coupon:
                $('#couponCode').val(),

            time:
                new Date().toISOString()

        };


        localStorage.setItem(

            'splashesLastRegistration',

            JSON.stringify(record)

        );


        $('#registrationSuccess')
            .removeClass('d-none');


        this.reset();


        $(this).removeClass(
            'was-validated'
        );

    });



    // Copy most recently claimed coupon
    // into the registration form

    if($('#couponCode').length){

        var codes =
            JSON.parse(
                localStorage.getItem(
                    'splashesCoupons'
                ) || '[]'
            );


        if(codes.length){

            $('#couponCode').val(

                codes[
                    codes.length - 1
                ]

            );

        }

    }

});