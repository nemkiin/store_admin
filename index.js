$(function () {
    
$('body').click(function(event){
  console.log(event);
})

function loadDataCat(){
$.get('http://localhost:2403/categories/',function(data){
    categories=data;
    // очистка таблицы
    $('tbody#catTable').html('');
    // очистка поля
    $('input#inpCat').val('');
    //data[1].name;
    for(let i =0; i < data.length; i++){
        let numProd = i +1;
        $('tbody#catTable').append('<tr><td>' + numProd +'</td>\
        <td  class="editTd">'+ data[i].name +'</td>\
        <td><button class="btn btn-danger deleteTr" type="submit">DELETE</button>\
        <button class="btn btn-default editTr" type="submit">EDIT</button></td></tr>');
        $('#selectCat').append('<option value="'+data[i].id+'">'+ data[i].name +'</option>')
    }
})
$.get('http://localhost:2403/products/', function(products){
    $('tbody#prodTable').html('');
    //$('form#formProd').val('');
    for(let e =0; e< products.length; e++){
        // console.log(data[e].category);
        product=products[e];
        var category=categories.find(function(c){return c.id===product.category});
        $('tbody#prodTable').append('\
         <tr>\
        <td>'+  e +'</td>\
        <td>' + products[e].name +'</td>\
        <td>'+ products[e].price +'</td>\
        <td>'+  products[e].description +'</td>\
        <td>'+ category.name +'</td>\
        <td>' )
    }
})

}

loadDataCat();




    $("#formCat").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        let dataVal = $('input#inpCat').val();
        $.ajax({
                url: 'http://localhost:2403/categories/',
                type: 'post',
                data: {name : dataVal},
                success: function(data) {
                  loadDataCat();
                }
        });

    });

    $("#formProd").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        let dataName = $('input#nameProd').val();
        let dataPrice = $('input#priceProd').val();
        let dataDescrip = $('input#descripProd').val();
        let dataSelect = $('#selectCat').val();
        if(dataName.length>0){
            console.log(1);
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

//reloadCategory();

// $('button#addCat.btn.btn-default').click(function(a){
//     let countTr = $('table.table tr').length;
//     //console.log(countTr);
//     let valInput = $('input#inpCat.inpCategories').val();
//     //console.log(valInput);
//     if(valInput != ''){
//         $('tbody#catTable').append('<tr><td>' + countTr +'</td><td  class="editTd">'+ valInput +'</td><td><button class="btn btn-danger deleteTr" type="submit">DELETE</button><button class="btn btn-default editTr" type="submit">EDIT</button></td></tr>');
//         //$('input#inpCat.inpCategories').val('');
//     }
// })

// //delete button-------------
// $('body').on('click','button.deleteTr', function(event){
//     $(event.target).parents('tr').remove();
// })

// //edit button
// $('body').on('click', 'button.editTr',function(event){
//     console.log('edit');
//     $(event.target).find('td.editTd').addClass('test');
// })











})