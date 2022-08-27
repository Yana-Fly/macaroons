// мобильное меню

const burgerButton = document.getElementById('burger');
const mobileMenu = document.getElementById('menu');
const menuList = document.querySelectorAll('#menu *');

burgerButton.onclick = function () {
    mobileMenu.classList.add('open');
}

menuList.forEach((item) => {
    item.onclick = () => {
        mobileMenu.classList.remove('open');
    }
})

// маска ввода телефона
const phone = $('#phone');
phone.mask('+375 (00) 000 - 00 - 00');

// валидация формы

const formContent = $('.order__content-form');
const product = $('#product');
const name = $('#name');
const errors = $('.error-message');
const buttonSendForm = $('#submit');
const formSuccess = $('#form-success');
let loader = $('.loader');
let hasError = false;

// функция добавления ошибки к незаполненному полю формы
function addError (element) {
    element.next().show();
    element.addClass('order__input_error');
    loader.hide();
    hasError = true;
}

buttonSendForm.click(() => {
    loader.css('display', 'flex');
    errors.hide();
    hasError = false;

    if (!product.val()) {
        addError (product);
    } else {
        product.removeClass('order__input_error');
    }
    if (!name.val()) {
        addError (name);
    } else {
        name.removeClass('order__input_error');
    }
    if (!phone.val()) {
        addError (phone);
    } else {
        phone.removeClass('order__input_error');
    }

    if (!hasError) {
        $.ajax({
            method: 'POST',
            url: 'https://testologia.site/checkout',
            data: {product: product.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (message) {
                loader.hide();
                if (message.success) {
                    formContent.hide();
                    formSuccess.show();
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            })
    }
});

// Плавный скролл перехода по кнопке Выбрать макарун

$('#choose-macaroon').click(function () {
    $('#products')[0].scrollIntoView({behavior: 'smooth'});
});

// Добавление продукта в корзину

$('.product__button').click((e) => {
    $('#product').val($(e.target).parents('.product').find('.product__name').text());
    $('.order')[0].scrollIntoView({behavior: 'smooth'});
});
