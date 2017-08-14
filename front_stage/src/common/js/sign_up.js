$(function() {
    const SUCCESS_CODE = 1;

    function checkMobile(telephone) {
        var isMatch = false;
        if ((/^1[3|4|5|8][0-9]\d{4,8}$/.test(telephone))) {
            isMatch = true;
        }
        return isMatch;
    }

    $('#btn-signup').on('click', function() {
        var username = $('#inputName').val();
        var password = $('#inputPassword').val();
        var againPassword = $('#againPassword').val();
        var telephone = $('#inputTelephone').val();
        var head = $('#selectHead').val();
        var isValidate = false;

        if (username && password && againPassword && telephone && head) {
            isValidate = true;
        }

        if (!isValidate) {
            $('.input-item').each(function(index, ele) {
                var _this = $(ele);
                if (_this.find('input').val() === '') {
                    _this.children('.warn-text').css('visibility', 'visible');
                }
            });
        } else {
            var isTelphone = checkMobile(telephone);
            var isMatch = againPassword === password;
            var status = isTelphone && isMatch;

            if (!isTelphone) {
                $('.tel').css('visibility', 'visible').text('格式错误');
            } else {
                $('.tel').css('visibility', 'hidden').text('不能为空');
            }

            if (!isMatch) {
                $('.pwd').css('visibility', 'visible').text('输入不同');
            } else {
                $('.pwd').css('visibility', 'hidden').text('不能为空');
            }

            if(status) {
                $.ajax({
                    url: '/user/isExist/',
                    method: 'GET',
                    data: {
                        username: username
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.dataCode === SUCCESS_CODE) {
                            $('#user-info').submit();
                        } else {
                            $('.user-warn').text(data.msg).css('visibility', 'visible');
                        }
                    }
                });
            }
        }
    });
});
