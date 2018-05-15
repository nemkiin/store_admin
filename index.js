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
        <button class="btn btn-default editTr">EDIT</button></td></tr>');
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

//function editing categories
$('body').on('click', '.editTr', function(e){
    let trId = $(e.target).parents('tr').data('id');
    $(e.target).parents('tr').html('<td></td><td><input class="1234"></td><td><button class="btn btn-danger deleteTr" >DELETE</button><button class="btn btn-success">Save</button></td>')
    //$('.1234').blur();
    console.log(trId);
    $.get('http://localhost:2403/categories/', function(product){
            console.log(product);
    })
    
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