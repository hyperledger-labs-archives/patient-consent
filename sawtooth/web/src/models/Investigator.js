var m = require("mithril")

var Investigator = {
    list: [],
    trialDataList: [],
    error: "",
    loadList: function(clientKey) {
        return m.request({
            method: "GET",
            url: "/api/investigators",
            headers: {
                'ClientKey': clientKey
            }
//            url: "https://rem-rest-api.herokuapp.com/api/users",
//               url: "http://localhost:8008/state?address=3d804901bbfeb7",
//            withCredentials: true,
//            withCredentials: true,
//            credentials: 'include',
        })
        .then(function(result) {
            console.log("Get investigator list")
            Investigator.error = ""
            Investigator.list = result.data
        })
        .catch(function(e) {
            console.log(e)
            Investigator.error = e.message
            Investigator.list = []
        })
    },

    loadTrialDataList: function(clientKey) {
        return m.request({
            method: "GET",
            url: "/api/investigators/data",
            headers: {
                'ClientKey': clientKey
            }
//            url: "https://rem-rest-api.herokuapp.com/api/users",
//               url: "http://localhost:8008/state?address=3d804901bbfeb7",
//            withCredentials: true,
//            withCredentials: true,
//            credentials: 'include',
        })
        .then(function(result) {
            console.log("Get trial data list")
            Investigator.error = ""
            Investigator.trialDataList = result.data
        })
        .catch(function(e) {
            console.log(e)
            Investigator.error = e.message
            Investigator.trialDataList = []
        })
    },

    current: {},

    trialData: {},

    register: function() {
        return m.request({
            method: "POST",
            url: "/api/investigators",
            data: Investigator.current,
            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Investigator.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Investigator.error = e.message
        })
    },

    grant_access_to_share_data: function(investigatorPKey, clientKey) {
        return m.request({
            method: "GET",
            url: "/api/hospitals/grant_access_to_share_data/" + investigatorPKey,
            headers: {
                'ClientKey': clientKey
            }
//            data: Doctor.current,
//            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Investigator.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Investigator.error = e.message
        })
    },

    revoke_access_to_share_data: function(investigatorPKey, clientKey) {
        return m.request({
            method: "GET",
            url: "/api/hospitals/revoke_access_to_share_data/" + investigatorPKey,
            headers: {
                'ClientKey': clientKey
            }
//            data: Doctor.current,
//            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Investigator.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Investigator.error = e.message
        })
    },

    import_screening_data: function(dataList, clientKey) {
        return m.request({
            method: "POST",
            url: "/api/investigators/import_screening_data",
            headers: {
                'ClientKey': clientKey
            },
            data: dataList,
            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Investigator.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Investigator.error = e.message
        })
    },

    update_trial_data: function(clientKey) {
        return m.request({
            method: "POST",
            url: "/api/investigators/data/update",
            headers: {
                'ClientKey': clientKey
            },
            data: Investigator.trialData,
            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Investigator.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Investigator.error = e.message
        })
    },

    set_eligible: function(clientKey) {
        return m.request({
            method: "POST",
            url: "/api/investigators/data/eligible",
            headers: {
                'ClientKey': clientKey
            },
            data: Investigator.trialData,
            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Investigator.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Investigator.error = e.message
        })
    }

}

module.exports = Investigator