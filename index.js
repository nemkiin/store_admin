$(function () {
    
$('body').click(function(event){
  console.log(event);
})

function loadDataCat(){
$.get('http://localhost:2403/categories/',function(data){
    categories=data;
    // очистка таблицы
    $('#catTable').html('');
    $('#selectCat').html('');
    // очистка поля
    $('#inpCat').val('');
    $('#nameProd').val('');
    $('#priceProd').val('');
    $('#descripProd').val('');
    //data[1].name;
    
    for(let i =0; i < data.length; i++){
        let numProd = i +1;
        $('tbody#catTable').append('<tr data-id="'+data[i].id+'"><td>' + numProd +'</td>\
        <td class="editCatName">'+ data[i].name +'</td>\
        <td><button class="btn btn-danger deleteTr" >DELETE</button>\
        <button class="btn btn-default editTrCat">EDIT</button></td></tr>');
        $('#selectCat').append('<option value="'+data[i].id+'">'+ data[i].name +'</option>')
    }
})

$.get('http://localhost:2403/products/', function(products){
    $('#prodTable').html('');
    for(let i =0; i< products.length; i++){
        
        product=products[i];
        var category=categories.find(function(c){return c.id===product.category});
        
        // block button if product.category.id = category.id
        if(category){
            $('#catTable .deleteTr').attr('disabled',true);

        }
        let numberCat = i+1;
        $('#prodTable').append('\
                <tr data-id="' +product.id + ' ">\
                <td>'+  numberCat +'</td>\
                <td class="editProdName">' + products[i].name +'</td>\
                <td class="editProdPrice">'+ products[i].price +'</td>\
                <td class="editProdDesc">'+  products[i].description +'</td>\
                <td class="editProdCat">'+ category.name +'</td>\
                <td>\
                <button class="btn btn-danger deleteTr" >DELETE</button>\
                <button class="btn btn-default editTr" >EDIT</button>\
                </td>\
                </tr>' )             
            }
})

}
$('body').on('change', '.inputEditNew', function(e){

    let newValueInput= $('.inputEditNew').val();
    var trId = $('.inputEditNew').parents('tr').data('id');
    if(newValueInput.length>0){
        $.ajax({
            url: 'http://localhost:2403/categories/'+ trId,
            type: 'PUT',
            data: {name : newValueInput},
            success: function(){
                loadDataCat();
            }
        })
    }



//console.log(newValueInput);
})
//function editing categories
$('body').on('click', '.editTrCat', function(e){
    let trId = $(e.target).parents('tr').data('id');
    $.get('http://localhost:2403/categories/'+ trId, function(event){
            //console.log(event.name);
            $(e.target).parents('tr').html('<td></td>\
    <td><input class="inputEditNew" value="'+event.name+'"></td>\
    <td><button class="btn btn-danger deleteTr" >DELETE</button>\
    <button class="btn btn-success">Save</button></td>');  
    })  
})

//function editing product
$('body').on('click', '.editTr', function(e){
    let trId = $(e.target).parents('tr').data('id');
    let nameEdit = $(e.target).parents('tr').children('td').eq(1);
    let namePrice = $(e.target).parents('tr').children('td').eq(2);
    let nameDescription = $(e.target).parents('tr').children('td').eq(3);
    let nameCategories = $(e.target).parents('tr').children('td').eq(4);
    $(e.target).parents('tr').children('td').eq(5).html('<button class="btn btn-danger deleteTr" >DELETE</button>\
    <button class="btn btn-success">Save</button></td>'); 

    nameEdit.html( '<input value="'+ nameEdit.html() +'">');
    namePrice.html( '<input value="'+ namePrice.html() +'">');
    nameDescription.html( '<input value="'+ nameDescription.html() +'">');
    //nameCategories.html( '<input value="'+ nameCategories.html() +'">');

    // for(let i =0; i < categories.length; i++){
    //     let numProd = i +1;
        
    //     nameCategories.html('<option value="'+categories[i].id+'">'+ categories[i].name +'</option>')
    // }
    //console.log(trId);
    // $.get('http://localhost:2403/products/'+ trId, function(event){
    //     //console.log(event.name);
    // })
})

loadDataCat();




    $("#formCat").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        let dataVal = $('#inpCat').val();
        if(dataVal.length>0){
            $.ajax({
                url: 'http://localhost:2403/categories/',
                type: 'post',
                data: {name : dataVal},
                success: function(data) {
                  loadDataCat();
                }
        });
        }
       

    });

    $("#formProd").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        let dataName = $('#nameProd').val();
        let dataPrice = $('#priceProd').val();
        let dataDescrip = $('#descripProd').val();
        let dataSelect = $('#selectCat').val();
        if(dataName.length>0 && dataPrice.length>0){
            $.ajax({
                url: 'http://localhost:2403/products/',
                type: 'post',
                data: {name : dataName,
                        price:dataPrice,
                        description: dataDescrip,
                        category: dataSelect
                    },
                success: function(data) {
                    loadDataCat();
                }
        });
        }
    });


$('body').on('click','.deleteTr',(function(e){
    let trId = $(e.target).parents('tr').data('id');
    console.log(trId);
    $.ajax({
        url: 'http://localhost:2403/categories/'+ trId,
        type: 'DELETE',
        success: function(result){
            loadDataCat();
        }
    })
    $.ajax({
        url: 'http://localhost:2403/products/'+ trId,
        type: 'DELETE',
        success: function(result){
            loadDataCat();
        }
    })
}))






$(function reloadCategory(){
    $('.productsLink').click(function(){
        $('.categories').hide();
        $('.products').show();
    })
    $('.categoriesLink').click(function(){
        $('.categories').show();
        $('.products').hide();
    })
})

})