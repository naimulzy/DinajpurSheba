//For Image upload form

$(document).ready( function() {
    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
    }); 	
});
$(document).ready(function () {
    $imgSrc = $('#imgProfile').attr('src');
    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imgProfile').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#btnChangePicture').on('click', function () {
        // document.getElementById('profilePicture').click();
        if (!$('#btnChangePicture').hasClass('changing')) {
            $('#profilePicture').click();
        }
        else {
            // change
        }
    });
    $('#profilePicture').on('change', function () {
        readURL(this);
        $('#btnChangePicture').addClass('changing');
        $('#btnChangePicture').attr('value', 'Confirm');
        $('#btnDiscard').removeClass('d-none');
        // $('#imgProfile').attr('src', '');
    });
  
});

jQuery(document).ready(function($) {

var sitePlusMinus = function() {
    $('.js-btn-minus').on('click', function(e){
        e.preventDefault();
        
        if ( $(this).closest('.input-group').find('.quantity').val()  >1  ) {
            $(this).closest('.input-group').find('.quantity').val(parseInt($(this).closest('.input-group').find('.quantity').val()) - 1);
        } else {
            $(this).closest('.input-group').find('quantity').val(parseInt(1));
        }
        

    });
    $('.js-btn-plus').on('click', function(e){
        e.preventDefault();
        var max = parseInt($(this).closest('.input-group').find('.quantity').attr('max'));
        
        if ( $(this).closest('.input-group').find('.quantity').val() < max  ) {
            $(this).closest('.input-group').find('.quantity').val(parseInt($(this).closest('.input-group').find('.quantity').val()) + 1);
        } else {
            $(this).closest('.input-group').find('quantity').val(max);
        }
        //var qua = $('#orderquantity').val();
        //var prod = $("#product_id").val();
        //$("#orderbutton").attr("href", "/order/"+prod+"/"+qua);
        //$('#aaa').text("/order/"+prod+"/"+qua);
    });
    $('#orderbutton').on('click', function(e){
        e.preventDefault();
        var qua = $('#orderquantity').val();
        var prod = $("#product_id").val();
        $("#orderbutton").attr("href", "/order/"+prod+"/"+qua);
        document.location.href = "/order/"+prod+"/"+qua;
    });
    $('.quantity').change(function() {
        var mx = parseInt( $(this).closest('.input-group').find('.quantity').attr('max') );
        
        if ( $(this).closest('.input-group').find('.quantity').val() > mx  ) {
            $(this).closest('.input-group').find('.quantity').val(mx);
        }
        if ( $(this).closest('.input-group').find('.quantity').val() <1  ) {
            $(this).closest('.input-group').find('.quantity').val(parseInt(1));
        }
        
    });
    $('.quantity').keypress()(function() {
        var mx = parseInt( $(this).closest('.input-group').find('.quantity').attr('max') );
        
        if ( $(this).closest('.input-group').find('.quantity').val() > mx  ) {
            $(this).closest('.input-group').find('.quanti   ty').val(mx);
        }
        if ( $(this).closest('.input-group').find('.quantity').val() <1  ) {
            $(this).closest('.input-group').find('.quantity').val(parseInt(1));
        }
        
    });

    
};
sitePlusMinus();
});
