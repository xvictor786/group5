$(function () {
    if (!sessionStorage.ttoken || sessionStorage.ttoken === null) {
        location.href = "login.html";
    }

    document.getElementById("idSpan").innerHTML = sessionStorage.ttoken;



    $(".navbar-collapse li").removeClass("active");
    $(".navbar-collapse li a[href='#contacts']").parent().addClass("active");
    var email = sessionStorage.ttoken;
    var datalist = "email=" + email;
    $.ajax({
        type: "post",
        url: "http://192.168.1.17:8080/group5/getContactData",
        data: datalist,
        cache: false,
        success: function (mydata) {
            var myData = JSON.parse(mydata);
            var lastIndex = myData.length - 1;
            var htmlText = "";
            if (myData[lastIndex].status === 1) {
                for (var i = 0; i < lastIndex; i++) {
                    htmlText = htmlText +

                        "<div class='box-header with-border'>"
                        + "<div class='box-title'>"
                        + "<h4 ><a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion2' href='#collapse" + myData[i].id + "'>"
                        + myData[i].tittle
                        + "</a></h4>"
                        + "</div>" //box-title'
                        + "</div>"
                        + "<div class='box-body collapse' id='collapse" + myData[i].id + "' aria-labelledby='heading" + myData[i].id + "' data-parent='#accordionExample'>"
                        + "<div class='row'>"
                        + "<div class='col-xs-12 col-sm-6 col-md-8'>"
                        + "<p>Nama Pengguna: <strong>" + myData[i].user_name + "</strong></p>"
                        + "<br><p>Pass Pengguna :<strong> " + myData[i].user_password + "</strong></p>"
                        + "</div>" //close col xs 12
                        + "<div class='col-xs-6 col-md-4'>"
                        + "<div class='box-tools pull-right'>"
                        + "<h4><a href='#viewcontact/" + myData[i].id + "'><span  class='glyphicon glyphicon-edit' data-contactid=" + myData[i].id + "></span></a> "
                        + "&nbsp&nbsp&nbsp<a href='#delcontact'><span id='delete' class='glyphicon glyphicon-trash' data-contactid=" 
                        + myData[i].id 
                        + "></span></a></h4>"
                        + "</div>"//closer col-xs-6
                        + "</div>"//close row
                        + "</div>"//close box body
                        + "</div>";//close box header
                }
                $("#accordionExample").html(htmlText);
            }
        },
        error: function () {

        }
    });

    var link1 = crossroads.addRoute("/logout", function () {
        sessionStorage.clear();
        location.href = "login.html";
    });

    var linkGoEditForm = crossroads.addRoute("/viewcontact/{id}", function (id) {


        var datalist = "id=" + id;
        $.ajax({
            type: "post",
            url: "http://192.168.1.17:8080/group5/GetContactDataByID",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);

                if (myData.status === 1) {
                    document.getElementById("tittle100").value = myData.tittle;
                    document.getElementById("uname100").value = myData.user_name;
                    document.getElementById("upassword100").value = myData.user_password;
                    document.getElementById("contactid").value = myData.id;
                }
                $("#divContact").hide();
                $("#divEditContact").show();

            },
            error: function () {

            }
        });
    });

    $('#frmAddRecord').on('submit', function (event) {

        var tittle = $("#tittle").val();
        var uname = $("#uname").val();
        var upassword = $("#upassword").val();


        var datalist = "tittle=" + tittle + "&uname=" + uname +
            "&upassword=" + upassword + "&owner=" + sessionStorage.ttoken;

        $.ajax({
            type: "post",
            url: "http://192.168.1.17:8080/group5/AddContact",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Add Contact Success");
                    location.href = "index.html";
                }
                else {
                    alert("Add Contact fail");

                }

            },
            Error: function () {
                console.log("ajax error!");
                alert("Please contect admin!");
            }

        });
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
    })

    $("#frmEditRecord").submit(function (e) {

        e.preventDefault();
        e.stopPropagation();

        var tittle = $("#tittle100").val();
        var user_name = $("#uname100").val();
        var user_password = $("#upassword100").val();
        var contactid = $("#contactid").val();

        var datalist = "tittle=" + tittle + "&user_name=" + user_name
            + "&user_password=" + user_password + "&contactid=" + contactid;

        $.ajax({
            type: "post",
            url: "http://192.168.1.17:8080/group5/UpdateContactById",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Update Contact Success");
                    $("#divEditContact").hide();
                    location.href = "index.html";
                }
                else {
                    alert("Update Contact fi");
                }

            },
            Error: function () {
                console.log("ajax error!");
                alert("Please contect admin!");
            }

        });
    });

    $("#accordionExample").on("click","#delete",function(){
        var contactid=$(this).data("contactid")
        //Bootbox.alert("delete process" + "contactid");
        datalist="contactid="+contactid;
        var parentTR = $(this).parent().parent().parent();
        var result = confirm("Are You sure to delete this info?");
          if(result) {
            $.ajax({
                type: "post",
                url: "http://192.168.1.17:8080/group5/DelContactById",
                data: datalist,
                cache: false,
                success: function (mydata) {
                    var myData = JSON.parse(mydata);
                    if (myData.status === 1) {
                        alert("Delete info SuccessFull!");
                        $(parentTR).fadeOut("slow","swing",function(){
                            $(parentTR).remove();
                        });
                        location.href = "index.html";
                    }
                    else {
                        alert("Delete Contact Failed");
                    }
                },
                error: function () {
                    console.log("ajax error!");
                    alert("Please contact admin!");
                }
            });
          } 
          else{
              Bootbox.alert("Delete Canceled!");
          }
        
    });

    function parseHash(newHash, oldHash) {
        crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

});