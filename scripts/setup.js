var input1 = '<input type="text" id="';
var input2 = '" class="form-control" placeholder="Dán thẻ input vào đây !!" style="margin-top:10px"  >';
var subject = [];
var openFile = function () {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        var tmp=text.split('\n');
        console.log(tmp);
        subject = [];
        $('#form-setup').empty();
        for (i = 0; i < tmp.length; i++) {
            $('#form-setup').append(input1 + subject.length + input2);
            $('#' + subject.length).change(addinput);
            $('#' + i).val(tmp[i]);
            let tmp2=tmp[i].split('|');
            showNotify('Auto Subject',`Thêm thành công \n ${tmp2[2]}\n Nhóm: ${tmp2[3]}`,i);
            subject.push(tmp[i]);
        }
    };
    reader.readAsText(input.files[0]);
};

function addinput() {
    var tag = $(this);

    if (tag.attr('id') == subject.length) {
        subject.push(tag.val());
        $('#form-setup').append(input1 + subject.length + input2);
        $('#' + subject.length).change(addinput);
    }
    else {
        subject[Number(tag.attr('id'))] = tag.val();
    }
}
function showNotify(title,message,index) {
    if(Notification.permission!='granted')
    {
        requestNotificationPermission();
    }
    let notifi=  new Notification(
        title, // Tiêu đề thông báo
        {
            body: message, // Nội dung thông báo
            icon: 'images/icon.png',
            timeout: 2000
        }
    );
    notifi.onshow=function () {
        setTimeout(function () {
            notifi.close();
        },index?index*3000:3000);
    }
}
$(document).ready(function () {
    $('#form-setup').append(input1 + subject.length + input2);
    var tmp = $('#' + subject.length);
    tmp.change(addinput);
    //
    //
    chrome.storage.sync.get('setupSubject', function (data) {
        if (data.setupSubject && data.setupSubject.length > 0) {
            for (i = 0; i < data.setupSubject.length; i++) {
                $('#' + i).val(data.setupSubject[i]);
                subject.push(data.setupSubject[i]);
                $('#form-setup').append(input1 + subject.length + input2);
                $('#' + subject.length).change(addinput);
            }
        }
    })
    //
    $('#customFile').change(openFile)
    $('#btnSave').click(function () {
        chrome.storage.sync.set({'setupSubject': subject}, function () {
            showNotify('Auto Subject','Lưu Thành công');
        });
    })
    $('#btnClear').click(function () {
        chrome.storage.sync.remove('setupSubject', function () {
            subject = [];
            $('#form-setup').empty();
            $('#form-setup').append(input1 + subject.length + input2);
            $('#' + subject.length).change(addinput);
            showNotify('Auto Subject','Xóa Thành công');
        })
    })
});