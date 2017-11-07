$(function(){
    
    var modalImg = $('[data-remodal-id=modal-img]').remodal({
            modifier: 'with-red-theme',
            closeOnEscape: true,
            closeOnOutsideClick: true
        });
    
    // MODAL:: ADD PRODUCT TO CART
    var modalOrder = $('[data-remodal-id=modal]').remodal({modifier: 'with-red-theme'});
    var activeProduct = null;
    $(document).on('opened', '[data-remodal-id=modal]', function(){
        if(!activeProduct)
            modalOrder.close();
    });
    $(document).on('closing', '[data-remodal-id=modal]', function(){
        activeProduct = null;
    });
    
    // MODAL:: CONFIRM TRUNCATE CART
    $('[data-remodal-id=modal-clear-cart]').remodal({
            modifier: 'with-red-theme',
            closeOnEscape: true,
            closeOnOutsideClick: true
        });
    $(document).on('confirmation', '[data-remodal-id=modal-clear-cart]', function(){
        location.href = '/cart/truncate';
    });
    
    // MODAL:: REMOVE PRODUCT
    $('[data-remodal-id=modal-hapus-item]').remodal({modifier: 'with-red-theme'});
    $(document).on('confirmation', '[data-remodal-id=modal-hapus-item]', function(){
        var target = $(this).data('href');
        location.href = target;
    });
    
    // header menu dropdown
    $('.user-name.dropbtn').click(function(e){
        $('#myDropdown').toggleClass('show');
        e.stopPropagation();
    });
    $(document.body).click(function(){
        $('#myDropdown').removeClass('show');
    });
    
    // product list ajax requester
    $('.ajax-search-result').each(function(i,e){
        var $e = $(e);
        var query = $e.data('query');
        var info  = $e.data('info');
        
        $.get('/etc/product?'+query, function(res){
            if(res.error)
                return $e.html(res.error);
            
            $e.html(res.html);
            $('#search-result-info').html( info.replace('#total', res.total.toLocaleString()) );
        });
    });
    
    // transaction list ajax requester
    $('.ajax-transaction-result').each(function(i,e){
        var $e = $(e);
        var query = $e.data('query') || '';
        
        $.get('/etc/transaction'+(query?'?'+query:''), function(res){
            if(res.error)
                return $e.html(res.error);
            
            $e.html(res.html);
        });
    });
    
    // sort dropdown selector
    $('#update-sort').change(function(){
        var $this= $(this);
        var next = location.pathname + '?sort=' + $this.val();
        var qpr  = $this.data('qpr');
        if(qpr){
            qpr = qpr.split(',');
            var qs = location.search.replace(/^\?/, '');
            qs = qs.split('&');
            for(var i=0; i<qs.length; i++){
                var qss = qs[i].split('=');
                if(!qss[1])
                    continue;
                if(~qpr.indexOf(qss[0]))
                    next+= '&'+qs[i];
            }
        }
        location.href = next;
    });
    
    // product image modal
    $(document.body).on('click', '.show-img', function(){
        var image = $(this).data('img');
        $('#show-img').html('<img src="'+image+'" alt="Loading...">');
    });
    
    // product pick up/down button
    $('.mpp-quantity-button').click(function(){
        var $this  = $(this);
        var target = $($this.data('target'));
        var tMin   = parseInt(target.attr('min'));
        var tMax   = parseInt(target.attr('max'));
        var tVal   = parseInt(target.val());
        var tType  = $this.data('type');
        
        tVal = tType == 'plus' ? tVal + 1 : tVal - 1;
        
        if(tVal > tMax)
            tVal = tMax
        else if(tVal < tMin)
            tVal = tMin;
        target.val(tVal);
        target.change();
        
        // opt part
        var tPrice = $this.data('price');
        if(tPrice){
            tPrice = parseInt($(tPrice).data('price'));
            $($this.data('subtotal')).text((tPrice * tVal).toLocaleString('id'));
        }
    });
    
    // Opening product pick modal
    $(document.body).on('click', '.buy-this', function(){
        var $this = $(this);
        
        var product = $this.data('product');
        activeProduct = product;
        
        $('#mpp-id').val(product.id);
        $('#mpp-code').text(product.code);
        $('#mpp-name').text(product.name);
        $('#mpp-quantity').attr({min: product.min,max: product.stock}).val(product.min);
        $('#mpp-unit').text(product.unit);
        $('#mpp-price').text(product.price.toLocaleString('id')).data('price', product.price);
        $('#mpp-total').text( ( product.min * product.price ).toLocaleString('id') );
    });
    
    // update data city on state changes
    $('.dynamic-state').change(function(){
        var eCity = $('.dynamic-city');
        var eLoader = $('.dynamic-cityloader');
        
        if(!eCity.get(0))
            return;
        
        eCity.hide();
        eLoader.show();
        
        var cCity = eCity.val();
        var cState = $(this).val();
        
        $.get('/etc/location/city', {prov: cState}, function(res){
            eCity.html('');
            eCity.show();
            eLoader.hide();
            
            if(res.error || !res.data || !res.data.length)
                return;
        
            for(var i=0; i<res.data.length; i++){
                var opt = res.data[i];
                var htm = $('<option></option>');
                htm.attr('value', opt.id);
                htm.text(opt.name);
                if(opt.id == cCity)
                    htm.attr('selected', 'selected');
                eCity.append(htm);
            }
        });
    });
    $('.dynamic-cityloader').hide();
    $('.dynamic-state').change();
    
    // toggle show/hide transaction resi input
    $('#transaction-resi-toggle').click(function(){
        $('.update-to-send,.cancel-to-send').show();
        $(this).hide();
    });
    $('.cancel-to-send').click(function(){
        $('.update-to-send,.cancel-to-send').hide();
        $('#transaction-resi-toggle').show();
    });
});

// home stuff
$(function(){
    $(".kat-title-btn").click(function(e){
        $(".kat-title-btn").not(this).removeClass("active");
        $(this).toggleClass("active");
        $(".kategori-card").removeClass("pad-bottom");
        $(".kat-title-btn.active").parents(".kategori-card").toggleClass("pad-bottom");
        $("ul.kat-content").slideToggle("fast");
        $("ul.kat-content:visible").hide();
        $(this).next("ul.kat-content").show();
    });
});

// file uploader
$(function(){
    $('.file-uploader').change(function(){
        var $this = $(this);
        var loader= $($this.data('loader'));
        var target= $($this.data('value'));
        var file  = $this.get(0).files[0];
        
        $this.hide();
        loader.show();
        
        var formData = new FormData(),
            xhr      = new XMLHttpRequest();
        formData.append('file', file, file.name);
        xhr.open('POST', '/upload', true);
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    var res = window.JSON.parse(xhr.responseText);
                    $this.show();
                    loader.hide();
                    if(res.error)
                        return alert(res.data);
                    target.val(res.data);
                }
            }
        }
        
        xhr.send(formData);
    });
});

// chart page
$(function(){
    if(!$('#this-is-cart-page').get(0))
        return;
    
    var el = {
        grand: {
            total   : $('.cart-grand-total'),
            subtotal: $('#cart-grand-subtotal'),
            courier : $('#cart-grand-courier-cost')
        },
        sendto: {
            section: {
                form  : $('#sendto-form'),
                result: $('#sendto-result')
            },
            inputs: $('.sendto-input'),
            btn: {
                edit    : $('#sendto-btn-edit'),
                cancel  : $('#cancel-edit-alamat'),
                save    : $('#save-edit-alamat')
            },
            address: {
                label   : $('#cart-sendto-address-label'),
                value   : $('#cart-sendto-address'),
                edit    : $('#cart-sendto-address-edit')
            },
            attn: {
                label   : $('#cart-sendto-attn-label'),
                value   : $('#cart-sendto-attn'),
                edit    : $('#cart-sendto-attn-edit')
            },
            city: {
                label   : $('#cart-sendto-city-label'),
                value   : {
                    id      : $('#cart-sendto-city-id'),
                    name    : $('#cart-sendto-city-name')
                },
                edit    : $('#cart-sendto-city-edit'),
                loader  : $('#cart-sendto-city-loader')
            },
            district: {
                label   : $('#cart-sendto-district-label'),
                value   : $('#cart-sendto-district'),
                edit    : $('#cart-sendto-district-edit')
            },
            handphone: {
                label   : $('#cart-sendto-handphone-label'),
                value   : $('#cart-sendto-handphone'),
                edit    : $('#cart-sendto-handphone-edit')
            },
            name: {
                label   : $('#cart-sendto-name-label'),
                value   : $('#cart-sendto-name'),
                edit    : $('#cart-sendto-name-edit')
            },
            phone: {
                label   : $('#cart-sendto-phone-label'),
                value   : $('#cart-sendto-phone'),
                edit    : $('#cart-sendto-phone-edit')
            },
            state: {
                label   : $('#cart-sendto-state-label'),
                value   : {
                    id      : $('#cart-sendto-state-id'),
                    name    : $('#cart-sendto-state-name')
                },
                edit    : $('#cart-sendto-state-edit')
            }
        }
    };
    
    // SENDTO
    el.sendto.btn.edit.click(function(){
        el.sendto.section.result.hide();
        el.sendto.section.form.fadeIn('fast');
        el.sendto.name.edit.focus();
        return false;
    });
    el.sendto.btn.cancel.click(function(){
        el.sendto.section.form.hide();
        el.sendto.section.result.fadeIn('fast');
    });
    el.sendto.inputs.keydown(function(e){
        if(e.keyCode == 13)
            return false;
    });
    el.sendto.btn.save.click(function(){
        var newVal, newLab, oldCity, newCity;
        
        newVal = el.sendto.address.edit.val();
        el.sendto.address.value.val(newVal);
        el.sendto.address.label.html(newVal);
        
        newVal = el.sendto.attn.edit.val();
        el.sendto.attn.value.val(newVal);
        el.sendto.attn.label.html(newVal);
        
        newVal = el.sendto.city.edit.val();
        newLab = el.sendto.city.edit.children(':selected').text();
        oldCity = el.sendto.city.value.id.val();
        newCity = newVal;
        el.sendto.city.value.id.val(newVal);
        el.sendto.city.value.name.val(newLab);
        el.sendto.city.label.html(newLab);
        
        newVal = el.sendto.district.edit.val();
        el.sendto.district.value.val(newVal);
        el.sendto.district.label.html(newVal);
        
        newVal = el.sendto.handphone.edit.val();
        el.sendto.handphone.value.val(newVal);
        el.sendto.handphone.label.html(newVal);
        
        newVal = el.sendto.name.edit.val();
        el.sendto.name.value.val(newVal);
        el.sendto.name.label.html(newVal);
        
        newVal = el.sendto.phone.edit.val();
        el.sendto.phone.value.val(newVal);
        el.sendto.phone.label.html(newVal);
        
        newVal = el.sendto.state.edit.val();
        newLab = el.sendto.state.edit.children(':selected').text();
        el.sendto.state.value.id.val(newVal);
        el.sendto.state.value.name.val(newLab);
        el.sendto.state.label.html(newLab);
        
        el.sendto.btn.cancel.click();
        
        if(oldCity != newCity)
            calculateAllProducts();
    });
    
    // SENDTO / update cities on state change
    el.sendto.city.loader.hide();
    el.sendto.state.edit.change(function(){
        el.sendto.city.edit.hide();
        el.sendto.city.loader.show();
        
        $.get('/etc/location/city', {prov: el.sendto.state.edit.val()}, function(res){
            el.sendto.city.edit.html('');
            el.sendto.city.edit.show();
            el.sendto.city.loader.hide();
            
            if(res.error || !res.data || !res.data.length)
                return;
        
            for(var i=0; i<res.data.length; i++){
                var opt = res.data[i];
                var htm = $('<option></option>');
                htm.attr('value', opt.id);
                htm.text(opt.name);
                if(opt.id == el.sendto.city.value.id.val())
                    htm.attr('selected', 'selected');
                el.sendto.city.edit.append(htm);
            }
        });
    });
    el.sendto.state.edit.change();
    
    // REMOVE ITEM
    var removeItemModal = $('[data-remodal-id=modal-buang]').remodal({modifier: 'with-red-theme'});
    var activeProduct   = null;
    $(document).on('opened', '[data-remodal-id=modal-buang]', function(){
        if(!activeProduct)
            removeItemModal.close();
    });
    $(document).on('closing', '[data-remodal-id=modal-buang]', function(){
        activeProduct = null;
    });
    $(document).on('confirmation', '[data-remodal-id=modal-buang]', function(){
        if(!activeProduct)
            return;
        $.get('/cart/remove/'+activeProduct, function(res){
            if(!res.left)
                return location.reload();
            $('#my-cart-length').text( parseInt(res.left).toLocaleString('id') );
        });
        
        var cont = $('#product-'+activeProduct);
        cont.slideUp('slow', function(){
            cont.remove();
            
            var lefts = $('.troli-box-detail').length;
            $('#my-cart-length').text( lefts.toLocaleString('id') );
            
            if(lefts)
                calculateGrant();
        });
    });
    $(document).on('click', '.remove-this', function(){
        var $this = $(this);
        var prod  = $this.data('product');
        activeProduct = prod;
        var cont  = $('#product-'+prod);
        
        $('#cart-item-remove-code').text(cont.data('code'));
        $('#cart-item-remove-name').text(cont.data('name'));
    });
    
    // PRODUCT ITEM
    var meh,
    calculateProduct = function(id, cb){
        var cont = $('#product-'+id);
        if(!cont.get(0))
            return cb(false);
        
        var quantity = parseInt(cont.find('.cart-item-quantity').val());
        var price    = parseInt(cont.data('price'));
        var subtotal = quantity * price;
        cont.data('subtotal', subtotal);
        
        cont.find('.cart-item-subtotal').text( subtotal.toLocaleString('id') );
        
        // get courier cost
        var query = {
            from    : cont.data('store-city'),
            to      : el.sendto.city.value.id.val(),
            weight  : parseInt(cont.data('weight')),
            courier : $('#cart-item-courier-'+cont.data('id')).val()
        };
        
        if(cont.data('weight-unit').toLowerCase() == 'kg')
            query.weight = query.weight * 1000;
        query.weight = query.weight * quantity;
        
        var cLoader = $('#cart-item-courier-loader-'+cont.data('id'));
        var cCost   = $('#cart-item-courier-price-'+cont.data('id'));
        var cCourierService = $('#cart-item-courier-service-'+cont.data('id'));
        
        cCost.hide();
        cLoader.show();
        $.get('/etc/courier/price', query, function(res){
            cLoader.hide();
            cCost.show();
            
            cCourierService.html('');
            var cost = 0;
            for(var i=0; i<res.data.length; i++){
                var opt = $('<option></option>');
                opt.attr('value', res.data[i].name);
                opt.data('price', res.data[i].cost);
                opt.data('etd', res.data[i].etc);
                opt.html(res.data[i].name);
                if(!i){
                    opt.prop('selected', true);
                    cost = res.data[i].cost;
                }
                cCourierService.append(opt);
            }
            
            cont.data('courier', cost);
            $('#cart-item-courier-price-label-'+cont.data('id')).text( cost.toLocaleString('id') );
            $('#cart-item-courier-cost-'+cont.data('id')).val( cost );
            cb(true);
        });
    },
    calculateAllProducts = function(){
        $('.troli-box-detail').each(function(i,e){
            var id = $(e).data('id');
            calculateProduct(id, calculateGrant);
        });
    },
    calculateGrant = function(){
        var subTotal   = 0;
        var grandTotal = 0;
        var courTotal  = 0;
        
        var items = $('.troli-box-detail');
        for(var i=0; i<items.length; i++){
            var item = $(items[i]);
            subTotal+= parseInt(item.data('subtotal'));
            courTotal+= parseInt(item.data('courier'));
        }
        
        grandTotal = courTotal + subTotal;
        
        el.grand.subtotal.text(subTotal.toLocaleString('id'));
        el.grand.courier.text(courTotal.toLocaleString('id'));
        el.grand.total.text(grandTotal.toLocaleString('id'));
    };
    
    $('.cart-item-quantity-control').click(function(){
        var $this = $(this);
        var target= $($this.data('target'));
        var type  = $this.data('type');
        
        var vMax  = parseInt(target.attr('max'));
        var vMin  = parseInt(target.attr('min'));
        
        var oVal = parseInt(target.val());
        var nVal = type == 'plus' ? oVal+1 : oVal-1;
        
        if(nVal > vMax)
            nVal = vMax;
        if(nVal < vMin)
            nVal = vMin;
        
        if(nVal != oVal)
            target.val(nVal).change();
    });
    
    $('.cart-item-quantity')
        .keydown(function(e){
            if(e.keyCode == 13)
                return false;
        })
        .change(function(){
            var product = $(this).data('product');
            calculateProduct(product, calculateGrant);
        });
    
    $('.cart-item-courier-loader').hide();
    $('.cart-item-courier').change(function(){
        var $this = $(this);
        var product = $this.data('product');
        $('#cart-item-courier-price-'+product).hide();
        $('#cart-item-courier-loader-'+product).show();
        
        calculateProduct(product, function(){
            calculateGrant();
            $('#cart-item-courier-loader-'+product).hide();
            $('#cart-item-courier-price-'+product).show();
        });
    });
    
    $('.courier-service').change(function(){
        var $this = $(this);
        var id    = $this.data('product');
        var opt   = $(this).find('option:selected');
        var val   = opt.attr('value');
        var cost  = opt.data('price');
        var cont  = $('#product-'+id);
        
        cont.data('courier', cost);
        $('#cart-item-courier-price-label-'+cont.data('id')).text( cost.toLocaleString('id') );
        $('#cart-item-courier-cost-'+cont.data('id')).val( cost );
        calculateGrant();
    });
    
    calculateAllProducts();
});

// TRANSACTION EXPORTS
$(function(){
    if(!$('#transaction-exports').get(0))
        return;
    
    var startDate,
        endDate,
        updateStartDate = function() {
            startPicker.setStartRange(startDate);
            endPicker.setStartRange(startDate);
            endPicker.setMinDate(startDate);
        },
        updateEndDate = function() {
            startPicker.setEndRange(endDate);
            startPicker.setMaxDate(endDate);
            endPicker.setEndRange(endDate);
        },
        startPicker = new Pikaday({
            field: document.getElementById('start'),
            format: 'YYYY-MM-DD',
            minDate: new Date(1977, 12, 31),
            maxDate: new Date(2020, 12, 31),
            onSelect: function() {
                startDate = this.getDate();
                updateStartDate();
            }
        }),
        endPicker = new Pikaday({
            field: document.getElementById('end'),
            format: 'YYYY-MM-DD',
            minDate: new Date(1977, 12, 31),
            maxDate: new Date(2020, 12, 31),
            onSelect: function() {
                endDate = this.getDate();
                updateEndDate();
            }
        }),
        _startDate = startPicker.getDate(),
        _endDate = endPicker.getDate();
        
        if (_startDate) {
            startDate = _startDate;
            updateStartDate();
        }
        
        if (_endDate) {
            endDate = _endDate;
            updateEndDate();
        }
});