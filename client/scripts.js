var $chirpButton = $('#chirp-btn');
var $chirpField = $('#chirp-field');
var $chirpList = $('#chirp-list');

$chirpField.on('input', function () {
    var isEmpty = $chirpField.val().length === 0;
//     if (isEmpty) {
//         $chirpButton.prop('disabled', true);
//     } else {
//         $chirpButton.prop('disabled', false);
//     }
$chirpButton.prop('disabled', isEmpty);
})
$chirpButton.click(postChirp);


function postChirp() {
    var chirp = {
        message: $chirpField.val(),
        user: 'Josh',
        timeStamp: new Date().toISOString()
    };
    $.ajax({
        method: 'POST',
        url: '/api/chirps',
        contentType: 'applications/json',
        data: JSON.stringify(chirp)
    }).then(function(success) {
        //successfully POSTed new data to the server
        getChirps();
        $chirpField.val('');
        $chirpButton.prop('disabled', true);
    }, function(err) {
        // an error occurrred
        console.log(err);
    });
}

function getChirps() {
    $.ajax({
        method: 'GET',
        url: '/api/chirps'
    }).then(function(chirps) {
        $chirpList.empty();
        for (var i = 0; i < chirps.length; i++) {
            var $chirpDiv = $('<div class="chirp"></div>');
            var $message = $('<p></p>');
            var $user = $('<h4></h4>');
            var $timeStamp = $('<h5></h5>');

            $message.text(chirps[i].message);
            $user.text(chirps[i].user);
            $timeStamp.text(new Date (chirps[i].timestamp).toLocaleString());

            $message.appendTo($chirpDiv);
            $user.appendTo($chirpDiv);

            $chirpDiv.appendTo($chirpList)
        }
    }), function(err) {
        console.log(err);
    }
}
getChirps();