jQuery(document).ready(function($) {
            
    if ( $('body.single-product form.variations_form').length) {
        
        // get images for all attributes from variation form JSON data 
        var attributes = {};
        var form_attributes = JSON.parse( $('form.variations_form').attr('data-product_variations') );
      
        $.each(form_attributes, function(i,ele) {
            $.each(ele.attributes, function(name, value){
                if( !( attributes.hasOwnProperty(name) ) ) {
                    attributes[name] = {};      
                }
                attributes[name][value] = ele.image_src.replace('500x500', '70x70');
            });
        });

        // make corresponding lists with images
        var counter = 0;
        var attrName;
        var attrId;
        var attrValue;
        var attrImage;
        var newAttrTarget;
        var attrDisplayName;
        
        $('table.variations tr td.value select').each(function(){
            
            attrName = $(this).attr('name');
            attrId = $(this).attr('id');
            newAttrTarget = 'form.variations_form select#' + attrId;
            
            $(newAttrTarget).after('<ul id="woovarth-variations-' + attrId + '" class="woovarth-variations clearfix"></ul>');
            
            $(this).find('option').each (function(){
                
                attrValue = $(this).attr('value');
                
                if (attrValue > ' ') {
                    
                    attrImage = null;
                    attrDisplayName = $(this).html();
                    
                    if (counter == 0) {
                        attrImage = attributes[attrName][attrValue];
                        if (attrImage > ' ') {
                            $('ul#woovarth-variations-' + attrId).append('<li style="" data-value="' + attrValue + '"><img data-name="' + attrId + '" data-value="' + attrValue + '" src="' + attrImage + '" title="' + attrDisplayName + '" alt="' + attrDisplayName + '"></li>');
                        }
                    }
                    
                    if (!attrImage > ' '){
                        $('ul#woovarth-variations-' + attrId).append('<li data-value="' + attrValue + '"><span data-name="' + attrId + '" data-value="' + attrValue + '">' + $(this).html() + '</span></li>');
                    }
                    
                }
            });
            counter += 1;
        });

        // keep clicked images or name spans in sync with variation form selects
        $('ul.woovarth-variations li img, ul.woovarth-variations li span').click(function(){
            
            var selectTarget = 'form.variations_form select#' + $(this).attr('data-name');
            var selectName = $(this).attr('data-name');
            var selectValue = $(this).attr('data-value');
            
            $('ul#woovarth-variations-' + selectName + ' li').each(function(){
                $(this).removeClass('woovarth-variation-active');
            });
            
            $(selectTarget).parent('td').prev('td.label').removeClass('selected');
            
            if ($(selectTarget).find('option[value="' + selectValue + '"]').prop("selected") == true) {
                
                $('a.reset_variations').trigger('click');
                
            } else {
                
                $(selectTarget).trigger('touchstart'); // make all options show in DOM, not just the selected
                
                $(selectTarget).find('option').each(function(){
                    $(this).attr("selected", false);
                });
                
                $(selectTarget).find('option[value="' + selectValue + '"]').attr("selected", true);
                $(this).parent('li').addClass('woovarth-variation-active');
                $(selectTarget).parent('td').prev('td.label').addClass('selected');
            }
            
            $(selectTarget).trigger('change');
            
            return false;
        });
        
        // Hide li's for options that are unavaiable for current selection
        $('body').on( 'change', 'form.variations_form select', function() {
            
            $('ul.woovarth-variations li').each(function(){
               $(this).addClass('woovarth-variation-disabled');
            });
            
            $('form.variations_form select').each(function() {
                
                $(this).trigger('touchstart');
                attrId = $(this).attr('id');
                
                $(this).find('option').each(function(){
                    
                    attrValue = $(this).val();
                    
                    if (attrValue !==' undefined' && attrValue > ' ') {
                        
                        if ($('ul#woovarth-variations-' + attrId + ' li[data-value="' + attrValue + '"]').length === 1){
                             $('ul#woovarth-variations-' + attrId + ' li[data-value="' + attrValue + '"]').removeClass('woovarth-variation-disabled');
                        }
                    }
                });
            });
            
        });
    }
        
});