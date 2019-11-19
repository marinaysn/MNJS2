const deleteProduct =(btn) => {
    console.log('clicked!')

    const prodID = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
//btn.parentNode.querySelector('name=productId')
}