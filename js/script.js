
$(function(){
  // current navigation highlighting
  var current=window.location.pathname.split('/').pop()||'index.html';
  $('.navbar-nav .nav-link').each(function(){if($(this).attr('href')===current){$(this).addClass('active');}});

  // Bootstrap gallery modal
  $('.gallery-item').on('click',function(){$('#modalGalleryImage').attr('src',$(this).data('img'));});

  // Tournament search + level filtering
  function filterEvents(){var q=($('#eventSearch').val()||'').toLowerCase();var level=$('#eventLevel').val();$('.event-card-wrap').each(function(){var text=$(this).text().toLowerCase();var okText=text.indexOf(q)>-1;var okLevel=level==='all'||$(this).data('level')===level;$(this).toggle(okText&&okLevel);});}
  $('#eventSearch,#eventLevel').on('input change',filterEvents);

  // Coupon claim using localStorage
  function renderCoupons(){var codes=JSON.parse(localStorage.getItem('splashesCoupons')||'[]');if($('#claimedCoupons').length){$('#claimedCoupons').text(codes.length?'Claimed coupons: '+codes.join(', '):'No coupons claimed yet.');}}
  $('.claim-coupon').on('click',function(){var code=$(this).data('code');var codes=JSON.parse(localStorage.getItem('splashesCoupons')||'[]');if(codes.indexOf(code)===-1){codes.push(code);localStorage.setItem('splashesCoupons',JSON.stringify(codes));}$(this).text('Claimed ✓').prop('disabled',true);renderCoupons();});
  renderCoupons();

  // Contact validation
  $('#contactForm').on('submit',function(e){e.preventDefault();if(this.checkValidity()===false){e.stopPropagation();$(this).addClass('was-validated');return;}$('#contactSuccess').removeClass('d-none');this.reset();$(this).removeClass('was-validated');});

  // Registration validation and demo persistence
  $('#registrationForm').on('submit',function(e){e.preventDefault();if(this.checkValidity()===false){e.stopPropagation();$(this).addClass('was-validated');return;}var record={firstName:$('#firstName').val(),lastName:$('#lastName').val(),level:$('#level').val(),email:$('#regEmail').val(),time:new Date().toISOString()};localStorage.setItem('splashesLastRegistration',JSON.stringify(record));$('#registrationSuccess').removeClass('d-none');this.reset();$(this).removeClass('was-validated');});

  // Copy coupon from claimed list if registration page opened
  if($('#couponCode').length){var codes=JSON.parse(localStorage.getItem('splashesCoupons')||'[]');if(codes.length){$('#couponCode').val(codes[codes.length-1]);}}
});
