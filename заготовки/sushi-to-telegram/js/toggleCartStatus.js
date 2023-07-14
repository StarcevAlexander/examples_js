function toggleCartStatus() {

    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
    const orderForm = document.querySelector('#order-form');
    const cartIcon = document.querySelector('#cart-icon');

    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none');
        orderForm.classList.remove('none');
        cartIcon.classList.remove('none');
        document.getElementById('inputPhone').focus()
    } else {
        cartIcon.classList.add('none');
        cartEmptyBadge.classList.remove('none');
        orderForm.classList.add('none');
    }

}