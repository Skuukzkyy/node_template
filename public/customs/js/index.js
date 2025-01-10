$(document).ready(function() {
    $("#products-container")
        .on("click", ".decrease-qty-btn, .increase-qty-btn", handleChangeQuantity)
        .on("submit", ".add-to-cart-form", handleClickAddToCart)
});

function handleClickAddToCart(){
    const add_to_cart_form = $(this);
    const quantity_input_field = add_to_cart_form.find("input[name='quantity']");
    const quantity = parseInt(quantity_input_field.val());

    quantity_input_field.val(quantity > 0 ? quantity : 1);

    $.post(add_to_cart_form.attr("action"), add_to_cart_form.serialize(), (result) => {
        alert(result.message);
        result.status && add_to_cart_form.find("input[name='quantity']").val(1);
    });

    return false;
}

function handleChangeQuantity(){
    const change_quantity_button = $(this);    
    const quantity_input = change_quantity_button.siblings("input[name='quantity']");
    const is_increase = change_quantity_button.hasClass("increase-qty-btn");
    const current_quantity = quantity_input.val();
    
    if(is_increase){
        quantity_input.val(parseInt(quantity_input.val()) + 1);
    }
    /* If minus, add checking to avoid 0 or negative quantity. */
    else if(!is_increase && current_quantity > 1){
        quantity_input.val(parseInt(quantity_input.val()) - 1);
    }
}