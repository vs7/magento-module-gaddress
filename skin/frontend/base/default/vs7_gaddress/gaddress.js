(function ($, window, document, undefined) {
    var autocomplete;
    var currentFields;
    var componentFormIds;

    var componentForm = {
        locality: 'long_name',
        postal_code: 'short_name'
    };

    function initAutocomplete(el) {
        $(el).attr("placeholder", "Введите адрес");
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */($(el).get(0)),
            {
                types: ['geocode'],
                componentRestrictions: {
                    country: 'RU'
                }
            }
        );

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        //autocomplete.addListener('place_changed', fillInAddress);
    }

    function fillInAddress() {
        var place = autocomplete.getPlace();

        for (var component in currentFields) {
            if (component == 'address') {
                continue;
            }
            if (document.getElementById(currentFields[component]) != null) {
                document.getElementById(currentFields[component]).value = '';
                document.getElementById(currentFields[component]).disabled = false;
            }
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType] && document.getElementById(componentFormIds[addressType])) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(componentFormIds[addressType]).value = val;
            }
        }
    }

    $(document).ready(function () {
        if ($(vs7.gaddress.address).length) {
            initAutocomplete(vs7.gaddress.address);
        }
    });
})(jQuery.noConflict(), window, document);