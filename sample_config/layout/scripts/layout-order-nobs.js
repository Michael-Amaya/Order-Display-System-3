const orderMain = document.getElementById('order-main');
const orderSideImage = document.getElementById('side-image');
const orderDescription = document.getElementById('description');
const orderSubTotal = document.getElementById('subtotal');
const orderTax = document.getElementById('tax');
const orderTotal = document.getElementById('total');
const subTotalText = document.getElementById('subtotaltext');
const taxText = document.getElementById('taxtext');
const totalText = document.getElementById('totaltext');

const setOrder = order => {
    orderMain.innerHTML = order;
}

const setSideImage = image => {
    orderSideImage.src = image;
}

const setDescription = description => {
    orderDescription.innerHTML = description;
}

const setSubTotal = subTotal => {
    orderSubTotal.innerHTML = subTotal;
}

const setTax = tax => {
    orderTax.innerHTML = tax;
}

const setTotal = total => {
    orderTotal.innerHTML = total;
}

const updateScroll = () => {
    orderMain.scrollTop = orderMain.scrollHeight;
}

const updateOrderFontSize = size => {
    orderMain.style.fontSize = size;
}

const updateTotalsFontSize = size => {
    orderSubTotal.style.fontSize = size;
    orderTax.style.fontSize = size;
    orderTotal.style.fontSize = size;

    subTotalText.style.fontSize = size;
    taxText.style.fontSize = size;
    totalText.style.fontSize = size;
}

const updateDescriptionFontSize = size => {
    orderDescription.style.fontSize = size;
}

setInterval(updateScroll,100);