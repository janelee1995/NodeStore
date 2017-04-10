// Userlist data array for filling in info box
//var userListData = [];
//var paymentListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

   $('#btnViewPurchases').on('click', payments);
   $('#search-button').on('click', search);

});

// Functions =============================================================

function payments() {
   window.location.href = '/payments'
 }

 function search() {
   var name =  $('#searchbar').val();
    window.location.href = '/filterByName/'+name;
  }

 /*function populateTable() {

     // Empty content string
     var tableContent = '';

     // jQuery AJAX call for JSON
     $.getJSON( '/payments', function( data ) {
       // Stick our user data array into a userlist variable in the global object
        paymentListData = data;
         // For each item in our JSON, add a table row and cells to the content string
         $.each(data, function(){
             tableContent += '<tr>';
             //tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.name + '">' + this.name + '</a></td>';
             tableContent += '<td>' + this.name + '</td>';
             tableContent += '<td>' + this.amount + '</td>';
             tableContent += '<td>' + this.description + '</td>';
             tableContent += '<td>' + this.paidby + '</td>';
             //tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
             tableContent += '</tr>';
         });

         // Inject the whole content string into our existing HTML table
         $('#paymentsList table tbody').html(tableContent);
     });
 };*/
// Show User Info

/*function search(event){
      event.preventDefault();
      var searchKeyword = $('#searchbar').val();
      console.log(searchKeyword);
      $.ajax({
          type: 'GET',
          data: searchKeyword,
          url: '/main/searchQuery',
          dataType: 'JSON'
      }).done(function( response ) {

          // Check for successful (blank) response
          if (response.msg === '') {

          console.log('yes');
          }
          else {

              // If something goes wrong, alert the error message that our service returned
              alert('Error: ' + response.msg);

          }
      });
    }
*/




/*
   // Add product
function addProduct(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProduct input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newProduct = {
            'name': $('#addProduct fieldset input#inputProductName').val(),
            'description': $('#addProduct fieldset input#inputProductDescription').val(),
            'price': $('#addProduct fieldset input#inputProductPrice').val(),

        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newProduct,
            url: '/products/addproduct',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addProduct fieldset input').val('');

                // Update the table
                populateTableAll();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};



// Delete User
function deleteProduct(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/products/deleteproduct/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTableAll();
            populateTableUser();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};*/
