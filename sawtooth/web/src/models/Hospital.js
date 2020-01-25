var m = require("mithril")

var Hospital = {
    list: [],
    sharedDataList: [],
    error: "",
    loadList: function(clientKey) {
        return m.request({
            method: "GET",
            url: "/api/hospitals",
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
            console.log("Get hospitals list")
            Hospital.error = ""
            Hospital.list = result.data
        })
        .catch(function(e) {
            console.log(e)
            Hospital.error = e.message
            Hospital.list = []
        })
    },

    get_shared_data: function(hospitalPKey, investigatorPKey) {   //i.e Investigator
        return m.request({
            method: "GET",
            url: "/api/hospitals/get_shared_data/" + hospitalPKey,
            headers: {
                'ClientKey': investigatorPKey
            }
        })
        .then(function(result) {
            console.log("Get shared data")
            Hospital.error = ""
            Hospital.sharedDataList = result.data
        })
        .catch(function(e) {
            console.log(e)
            Hospital.error = e.message
            Hospital.sharedDataList = []
        })
    },

//    screening_data: function(hospitalPKey, investigatorPKey, inclExclCriteria) {   //i.e Investigator
//        return m.request({
//            method: "GET",
//            url: "/api/hospitals/screening_data/" + hospitalPKey + "?" + inclExclCriteria,
//            headers: {
//                'ClientKey': investigatorPKey
//            }
//        })
//        .then(function(result) {
//            console.log("Get Pre-screening data")
//            Hospital.error = ""
//            Hospital.sharedDataList = result.data
//        })
//        .catch(function(e) {
//            console.log(e)
//            Hospital.error = e.message
//            Hospital.sharedDataList = []
//        })
//    },

    current: {},

    register: function() {
        return m.request({
            method: "POST",
            url: "/api/hospitals",
            data: Hospital.current,
            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Hospital.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Hospital.error = e.message
        })
    },

    grant_data_processing: function(hospitalPKey, clientKey) {
        return m.request({
            method: "GET",
            url: "/api/patients/grant_data_processing/" + hospitalPKey,
            headers: {
                'ClientKey': clientKey
            }
//            data: Doctor.current,
//            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Hospital.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Hospital.error = e.message
        })
    },

    revoke_data_processing: function(hospitalPKey, clientKey) {
        return m.request({
            method: "GET",
            url: "/api/patients/revoke_data_processing/" + hospitalPKey,
            headers: {
                'ClientKey': clientKey
            }
//            data: Doctor.current,
//            useBody: true,
//            withCredentials: true,
        })
        .then(function(items) {
//            Data.todos.list = items
            Hospital.error = ""
        })
        .catch(function(e) {
            console.log(e)
            Hospital.error = e.message
        })
    }
//    ,

//    grant_write_ehr: function(hospitalPKey, clientKey) {
//        return m.request({
//            method: "GET",
//            url: "/api/patients/grant_write_ehr/" + hospitalPKey,
//            headers: {
//                'ClientKey': clientKey
//            }
////            data: Doctor.current,
////            useBody: true,
////            withCredentials: true,
//        })
//        .then(function(items) {
////            Data.todos.list = items
//            Hospital.error = ""
//        })
//        .catch(function(e) {
//            console.log(e)
//            Hospital.error = e.message
//        })
//    },
//
//    revoke_write_ehr: function(hospitalPKey, clientKey) {
//        return m.request({
//            method: "GET",
//            url: "/api/patients/revoke_write_ehr/" + hospitalPKey,
//            headers: {
//                'ClientKey': clientKey
//            }
////            data: Doctor.current,
////            useBody: true,
////            withCredentials: true,
//        })
//        .then(function(items) {
////            Data.todos.list = items
//            Hospital.error = ""
//        })
//        .catch(function(e) {
//            console.log(e)
//            Hospital.error = e.message
//        })
//    },
//
//    grant_3rd_party_access: function(hospitalPKey, clientKey) {
//        return m.request({
//            method: "GET",
//            url: "/api/patients/grant_share_ehr/" + hospitalPKey,
//            headers: {
//                'ClientKey': clientKey
//            }
////            data: Doctor.current,
////            useBody: true,
////            withCredentials: true,
//        })
//        .then(function(items) {
////            Data.todos.list = items
//            Hospital.error = ""
//        })
//        .catch(function(e) {
//            console.log(e)
//            Hospital.error = e.message
//        })
//    },
//
//    revoke_3rd_party_access: function(hospitalPKey, clientKey) {
//        return m.request({
//            method: "GET",
//            url: "/api/patients/revoke_share_ehr/" + hospitalPKey,
//            headers: {
//                'ClientKey': clientKey
//            }
////            data: Doctor.current,
////            useBody: true,
////            withCredentials: true,
//        })
//        .then(function(items) {
////            Data.todos.list = items
//            Hospital.error = ""
//        })
//        .catch(function(e) {
//            console.log(e)
//            Hospital.error = e.message
//        })
//    }
}

module.exports = Hospital