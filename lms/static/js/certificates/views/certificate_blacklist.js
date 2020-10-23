// Backbone Application View: CertificateBlacklist View
/* global define, RequireJS */
(function(define) {
    'use strict';

    define([
        'jquery',
        'underscore',
        'gettext',
        'backbone'
    ],

        function($, _, gettext, Backbone) {
            return Backbone.View.extend({
                el: '#black-listed-students',
                message_div: 'div#black-listed-students > div.message',
                generate_nonblacklist_certificates_radio:
                    'input:radio[name=generate-nonblacklist-certificates-radio]:checked',

                events: {
                    'click #generate-nonblacklist-certificates': 'generateNonBlacklistCertificates',
                    'click .delete-blacklist': 'removeBlacklist'
                },

                initialize: function(options) {
                    this.certificateBlackListEditorView = options.certificateBlackListEditorView;
                    this.active_certificate = options.active_certificate;
                    // Re-render the view when an item is added to the collection
                    this.listenTo(this.collection, 'change add remove', this.render);
                },

                render: function() {
                    var template = this.loadTemplate('certificate-black-list');
                    this.$el.html(template({certificates: this.collection.models}));
                    if (!this.active_certificate) {
                        this.$('#generate-nonblacklist-certificates').attr('disabled', 'disabled');
                    }
                    else {
                        this.$('#generate-nonblacklist-certificates').removeAttr('disabled');
                    }
                },

                loadTemplate: function(name) {
                    var templateSelector = '#' + name + '-tpl',
                        templateText = $(templateSelector).text();
                    return _.template(templateText);
                },

                removeBlacklist: function(event) {
                    var certificate = $(event.target).data();
                    var model = this.collection.findWhere(certificate);
                    var self = this;
                    if (model) {
                        model.destroy(
                            {
                                success: function() {
                                    self.escapeAndShowMessage(
                                        gettext('Student Removed from certificate black list successfully.')
                                    );
                                },
                                error: this.showError(this),
                                wait: true,
                                data: JSON.stringify(model.attributes)
                            }
                        );
                    }
                    else {
                        this.escapeAndShowMessage(
                            gettext('Could not find Student in black list. Please refresh the page and try again')  // eslint-disable-line max-len
                        );
                    }
                },

                generateNonBlacklistCertificates: function() {
                    this.collection.sync(
                        {success: this.showSuccess(this), error: this.showError(this)},
                        $(this.generate_nonblacklist_certificates_radio).val()
                    );
                },

                escapeAndShowMessage: function(message) {
                    $(this.message_div + '>p').remove();
                    $(this.message_div).removeClass('hidden').append('<p>' + _.escape(message) + '</p>').focus();
                    $(this.message_div).fadeOut(6000, 'linear');
                },

                showSuccess: function(caller_object) {
                    return function(xhr) {
                        caller_object.escapeAndShowMessage(xhr.message);
                    };
                },

                showError: function(caller_object) {
                    return function(xhr) {
                        try {
                            var response = JSON.parse(xhr.responseText);
                            caller_object.escapeAndShowMessage(response.message);
                        }
                        catch (blacklist) {
                            caller_object.escapeAndShowMessage(
                                gettext('Server Error, Please refresh the page and try again.')
                            );
                        }
                    };
                }
            });
        }
    );
}).call(this, define || RequireJS.define);
