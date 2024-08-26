// Backbone.js Page Object Factory: Certificates
/* global define, RequireJS */

(function(define) {
    'use strict';
    define([
        'jquery',
        'js/certificates/views/certificate_blacklist',
        'js/certificates/models/certificate_blacklist',
        'js/certificates/views/certificate_blacklist_editor',
        'js/certificates/collections/certificate_blacklist',
        'js/certificates/views/certificate_bulk_blacklist'
    ],
    function($, CertificateBlackListListView, CertificateBlackListModel, CertificateBlackListEditorView,
        CertificateBlackListCollection, CertificateBulkBlackList) {
            return function(certificate_black_list_json, generate_nonblacklists_certificate_url,
                certificate_blacklist_view_url, generate_bulk_certificate_blacklist_url,
                            active_certificate) {
                var certificateBlackList = new CertificateBlackListCollection(certificate_black_list_json, {
                    parse: true,
                    canBeEmpty: true,
                    url: certificate_blacklist_view_url,
                    generate_certificates_url: generate_nonblacklists_certificate_url
                });
                var certificateBlackListEditorView = new CertificateBlackListEditorView({
                    collection: certificateBlackList
                });
                certificateBlackListEditorView.render();

                new CertificateBlackListListView({
                    collection: certificateBlackList,
                    certificateBlackListEditorView: certificateBlackListEditorView,
                    active_certificate: active_certificate
                }).render();

                new CertificateBulkBlackList({
                    generate_bulk_certificate_blacklist_url: generate_bulk_certificate_blacklist_url
                }).render();
            };
        }
    );
}).call(this, define || RequireJS.define);