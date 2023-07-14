// вау эффекты

new WOW().init();

//отвряй бургерную
document.getElementById("burger").onclick = function() {
    document.getElementById("menu").classList.add("open");
};
document.querySelectorAll("#menu *").forEach(
    (item) =>
    (item.onclick = () => {
        document.getElementById("menu").classList.remove("open");
    })
);

//бесим всех попапом скидки
document.getElementById("daiskidka").onclick = function() {
    document.getElementById("skidka").style.display = "flex";
};
document.getElementById("skidka").onclick = function() {
    document.getElementById("skidka").style.display = "none";
};

//попап записи
var elements = document.getElementsByClassName("rest");
var targetElement = document.getElementById("popup-first");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
        targetElement.style.display = "flex";
        document.getElementById("carusel-bl").style.display = "none";
        document.getElementById("content").style.display = "none";
        document.getElementById("arrows").style.display = "none";

    });
}

document.getElementById("close-popup").onclick = function() {
    document.getElementById("carusel-bl").style.display = "block";
    document.getElementById("content").style.display = "flex";
    document.getElementById("arrows").style.display = "flex";
    document.getElementById("popup-first").style.display = "none";
};
document.getElementById("close-pop-2").onclick = function() {
    document.getElementById("carusel-bl").style.display = "block";
    document.getElementById("popup-second").style.display = "none";
};



$("#submit").click(function() {

})

$(document).ready(function() {
    $(".slider").slick({
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        // autoplay: true,
        autoplaySpeed: 2000,
        waitForAnimate: false,
        centerMode: true,
        //       variableWidth: true,

        appendDots: $('.dots'),
        appendArrows: $('.arrows'),
    });
})

$("#submit").click(function() {
    let inputName = $("#inputName");
    let inputPhone = $("#inputPhone");
    let selectMaster = $("#selectMaster");
    let selectService = $("#selectService");
    let inputTime = $("#inputTime");
    let inputDate = $('#inputDate');
    let hasError = false;
    $(".error-input").hide();
    if (!inputTime.val()) {
        inputTime.css('border', '2px solid red');
        inputTime.next().show();
        hasError = true;
    }
    if (inputTime.val()) {
        inputTime.css('border', '2px solid rgb(174, 137, 89)');
    }
    if (!inputDate.val()) {
        inputDate.css('border', '2px solid red');
        inputDate.next().show();
        hasError = true;
    }
    if (inputDate.val()) {
        inputDate.css('border', '2px solid rgb(174, 137, 89)');
    }
    if (!selectMaster.val()) {
        selectMaster.css('border', '2px solid red');
        selectMaster.next().show();
        hasError = true;
    }
    if (!selectService.val()) {
        selectService.css('border', '2px solid red');
        selectSome.next().show();
        hasError = true;
    }
    if (!inputName.val()) {
        inputName.css('border', '2px solid red');
        inputName.next().show();
        hasError = true;
    }
    if (inputName.val()) {
        inputName.css('border', '2px solid rgb(174, 137, 89)');
    }
    if (!inputPhone.val()) {
        inputPhone.css('border', '2px solid red');
        inputPhone.next().show();
        hasError = true;
    }
    if (inputPhone.val()) {
        inputPhone.css('border', '2px solid rgb(174, 137, 89)');
    }
    if (!hasError) {
        $.ajax({
            method: "POST",
            url: "http://testologia.site/checkout",
            data: { name: inputName.val(), phone: inputPhone.val() },
        }).done(function(msg) {
            loader.hide()
            if (msg.success == 1) {
                $('.popup-first').hide()
                $('.popup-second').show()
            } else {
                alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
            };
        });
    }
});