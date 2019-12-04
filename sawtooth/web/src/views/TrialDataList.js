var m = require("mithril")
var DataProvider = require("../models/DataProvider")

module.exports = {
    oninit:
        function(vnode){
            DataProvider.loadTrialDataList(vnode.attrs.client_key)
        },
    view: function(vnode) {
        return m(".user-list", DataProvider.trialDataList.map(function(data) {
            return m("a.user-list-item", // {href: "/claim/" + claim.clinic_pkey + "/" + claim.claim_id, oncreate: m.route.link},
                "ID: " + data.id +
                "; Height: " + data.height +
                "; Weight: " + data.weight +
                "; A1C: " + data.A1C +
                "; FPG: " + data.FPG +
                "; OGTT: " + data.OGTT +
                "; RPGT: " + data.RPGT +
                "; TIMESTAMP: " + data.event_time +
                ";",
                m("div"),
                m("button", {
                    onclick: function() {
                        DataProvider.trialData.id = data.id
                        DataProvider.trialData.height?DataProvider.trialData.height:data.height
                        DataProvider.trialData.weight?DataProvider.trialData.weight:data.weight
                        DataProvider.trialData.A1C?DataProvider.trialData.A1C:data.A1C
                        DataProvider.trialData.FPG?DataProvider.trialData.FPG:data.FPG
                        DataProvider.trialData.OGTT?DataProvider.trialData.OGTT:data.OGTT
                        DataProvider.trialData.RPGT?DataProvider.trialData.RPGT:data.RPGT
                        DataProvider.update_trial_data(vnode.attrs.client_key)
                    }
                }, 'Update trial data item'),
                m("div"),
                m("button", {
                    onclick: function() {
//                        DataProvider.setEligible(vnode.attrs.client_key, id, status)
                    }
                }, 'Set eligible status')
            )
        }),
        m("label.label", "Height"),
        m("input.input[placeholder=Height]", {
            oninput: m.withAttr("value", function(value) {DataProvider.trialData.height = value}),
            value: DataProvider.trialData.height
        }),
        m("label.label", "Weight"),
        m("input.input[placeholder=Weight]", {
            oninput: m.withAttr("value", function(value) {DataProvider.trialData.weight = value}),
            value: DataProvider.trialData.weight
        }),
        m("label.label", "A1C"),
        m("input.input[placeholder=A1C]", {
            oninput: m.withAttr("value", function(value) {DataProvider.trialData.A1C = value}),
            value: DataProvider.trialData.A1C
        }),
        m("label.label", "FPG"),
        m("input.input[placeholder=FPG]", {
            oninput: m.withAttr("value", function(value) {DataProvider.trialData.FPG = value}),
            value: DataProvider.trialData.FPG
        }),
        m("label.label", "OGTT"),
        m("input.input[placeholder=OGTT]", {
            oninput: m.withAttr("value", function(value) {DataProvider.trialData.OGTT = value}),
            value: DataProvider.trialData.OGTT
        }),
        m("label.label", "RPGT"),
        m("input.input[placeholder=RPGT]", {
            oninput: m.withAttr("value", function(value) {DataProvider.trialData.RPGT = value}),
            value: DataProvider.trialData.RPGT
        }),
        m("label.error", DataProvider.error))
    }
}