const orderSubTotal = document.getElementById('subtotal');
const orderTax = document.getElementById('tax');
const orderTotal = document.getElementById('total');

const setSubTotal = subTotal => {
    orderSubTotal.innerHTML = subTotal;
}

const setTax = tax => {
    orderTax.innerHTML = tax;
}

const setTotal = total => {
    orderTotal.innerHTML = total;
}