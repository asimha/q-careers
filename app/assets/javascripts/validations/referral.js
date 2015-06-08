function validateReferralForm() {

    $('#form_referral').validate({
      debug: true,
      rules: {
        "candidate[name]": {
            required: true,
            minlength: 3,
            maxlength: 255
        },
        "candidate[email]": "required",
        "candidate[phone]": {
            required: true,
            minlength: 15,
            maxlength: 15
        },
        "candidate[current_city]": "required",
        "candidate[native_city]": "required",
        "candidate[candidate][referral[year_of_passing]]": "required",
        "candidate[resume]": {
          "required": {
            "depends": function(element){
              if( $("#form_referral #referral_id").size() == 0){
                var req = true;
              } else {
                var req = false;
              }
              return req;
             }
          }
        }
      },
      errorElement: "span",
      errorClass: "help-block",
      messages: {
        "candidate[name]": "This field is required.",
        "candidate[email]": "This field is required.",
        "candidate[phone]": {
          required: "This field is required.",
          minlength: "10 digits required (mobile phone preferred)",
          maxlength: "10 digits required (mobile phone preferred)"
        },
        "candidate[current_city]": "This field is required.",
        "candidate[native_city]": "This field is required.",
        "candidate[candidate][referral[year_of_passing]]": "This field is required.",
        "candidate[resume]": "This field is required."
      },
      highlight: function(element) {
          $(element).parent().parent().addClass("has-error");
      },
      unhighlight: function(element) {
          $(element).parent().parent().removeClass("has-error");
      },
      invalidHandler: function(referral, validator) {
        // 'this' refers to the form
        var errors = validator.numberOfInvalids();
        if (errors) {

          // Populating error message
          var errorMessage = errors == 1
            ? 'You missed 1 field. It has been highlighted'
            : 'You missed ' + errors + ' fields. They have been highlighted';

          // Removing the form error if it already exists
          var errorHtml = "<div class=\"alert alert-danger\" data-alert=\"alert\" style=\"margin-bottom:5px;\">"+ errorMessage +"</div>"
          $("#referral_form_error").html(errorHtml);

          // Show error labels
          $("div.error").show();

        } else {
          // Hide error labels
          $("div.error").hide();

          // Removing the error message
          $("#referral_form_error").remove();
        }
      },
      submitHandler: function(form) {
        if ($(form).valid())
          form.submit();
        return false; // prevent normal form posting
      }

    });

}
