$(function() {
    $('.login-btn').on('click', function() {
        var username = $('#inputName').val();
        var password = $('#inputPassword').val();
        $('.input-item').each(function(index, ele) {
            var _this = $(ele);
            if (_this.find('input').val() === '') {
                _this.children('.warn-text').css('visibility', 'visible');
            }
        });
        if (username != '' && password != '') {
            $.ajax({
                url: '/user/signin/?name=' + username + '&password=' + password,
                method: 'POST',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    var status = data.status;
                    if (!status) {
                        $('.password-warn').text(data.msg).css('visibility', 'visible');
                    } else {
                        window.location.href = data.url;
                    }
                },
                error: function() {
                    console.log('error');
                }
            })
        }
    });

    $('#inputName').change(function() {
        var username = $('#inputName').val();
        if (username == '') {
            $('.username-warn').css('visibility', 'visible');
        } else {
            $('.username-warn').css('visibility', 'hidden');
        }
    });

    $('#inputPassword').change(function() {
        var password = $('#inputPassword').val();
        if (password == '') {
            $('.password-warn').css('visibility', 'visible');
        } else {
            $('.password-warn').css('visibility', 'hidden');
        }
    });
});
