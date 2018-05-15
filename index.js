$(function () {
    
$('body').click(function(event){
  console.log(event);
})

function loadDataCat(){
$.get('http://localhost:2403/categories/',function(data){
    categories=data;
    // очистка таблицы
    $('tbody#catTable').html('');
    $('#selectCat').html('');
    // очистка поля
    $('input#inpCat').val('');
    //data[1].name;
    for(let i =0; i < data.length; i++){
        let numProd = i +1;
        $('tbody#catTable').append('<tr data-id="'+data[i].id+'"><td>' + numProd +'</td>\
        <td class="editTd">'+ data[i].name +'</td>\
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
        //console.log(category);
        
        $('tbody#prodTable').append('\
                <tr data-id="' +product.id + ' ">\
                <td>'+  i +'</td>\
                <td>' + products[i].name +'</td>\
                <td>'+ products[i].price +'</td>\
                <td>'+  products[i].description +'</td>\
                <td>'+ category.name +'</td>\
                <td>\
                <button class="btn btn-danger deleteTr" >DELETE</button>\
                <button class="btn btn-default editTr" >EDIT</button>\
                </td>\
                </tr>' )
            
              //  category.name 
    }
    // console.log(category.name);

})

}

loadDataCat();




    $("#formCat").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        let dataVal = $('input#inpCat').val();
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
    $('a.nav-link.active.productsLink').click(function(){
        $('.categories').hide();
        $('.products').show();
    })
    $('a.nav-link.categoriesLink').click(function(){
        $('.categories').show();
        $('.products').hide();
    })
})

})