define('character/view', ['character/main', 'character/model'], function (character, model) {

    'use strict';

    var addSelect = function (name, list) {
            var span = $('<span class="form-group selects">').append(
                    $('<label>').text(name),
                    $('<select class="form-control">').attr('id', name)
                );
            _.each(list, function (id) {
                span.find('select').append($('<option>').attr('value', id).text(id));
            });

            this.append(span);
        },
        addInput = function (name, label, invert) {
            this.append(
               $('<span class="form-group attribute">').append(
                    $('<label>').text(label || name).addClass(invert ? 'font-invert' : ''),
                    $('<input type="number" class="form-control" placeholder="0">')
                        .attr('id', name)
                        .val(model.get(name))
                    //$('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
                )
            );
        };


    var ItemView = Backbone.View.extend({
        // name of tag to be created
        el: $('.row.characters'),
        tagName: 'div',
        className: 'div',
        //ItemViews now respond to two clickable actions for each Item: swap and delete
        events: {
            'change input': 'update'
        },

        //initialize() now binds model change/removal
        initialize: function () {
            model = this.model;
            // every function that uses 'this' as the current object should be in here
            _.bindAll(this, 'render', 'unrender');
            //this.model.bind('change', this.render);
        },


        //render() now includes two extra spans corresponding to the actions swap and delete.
        render: function () {
            var self = this, forms = [], form;

            //TODO: when extending to character creation
            // form = $('<form role="form" style="clear:both">');
            // addSelect.call(form, 'race', ['human', 'dwarf', 'elve']);
            // addSelect.call(form, 'racebonus');
            // forms.push(form);

            // form = $('<form role="form" style="clear:both">');
            // addSelect.call(form, 'class', ['warrior', 'scout', 'sorceror', 'healer', 'wizard']);
            // addSelect.call(form, 'classbonus');
            // forms.push(form);

            form = $('<form role="form" style="clear:both">');
            addInput.call(form, 'body', 'Körper');
            addInput.call(form, 'strength', 'Stärke', true);
            addInput.call(form, 'constituation', 'Härte', true);
            forms.push(form);

            form = $('<form role="form" style="clear:both">');
            addInput.call(form, 'agility', 'Agilität');
            addInput.call(form, 'mobility', 'Bewegung', true);
            addInput.call(form, 'dexterty', 'Geschick', true);
            forms.push(form);

            form = $('<form role="form" style="clear:both">');
            addInput.call(form, 'mind', 'Geist');
            addInput.call(form, 'intellect', 'Verstand', true);
            addInput.call(form, 'aura', 'Aura', true);
            forms.push(form);

            //DOM
            $(self.el).append(forms);
        },

        //update model on changes
        update: function (e) {
            var node = $(e.target);
            e.preventDefault();
            model.set(node.attr('id'), parseInt(node.val(), 10), {validate: true});
        },

        //updae
        unrender: function () {
            $(this.el).remove();
        }
    });


    return {
        create: function (opt) {
            return new ItemView(opt);
        }
    };
});
