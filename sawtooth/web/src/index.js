var m = require("mithril")

//var UserList = require("./views/UserList")
//var UserForm = require("./views/UserForm")

//var DoctorForm = require("./views/DoctorForm")
//var DoctorList = require("./views/DoctorList")
//var DoctorForm = require("./views/DoctorForm")

var PatientList = require("./views/PatientList")
var PatientForm = require("./views/PatientForm")
//var PatientDetailsForm = require("./views/PatientDetailsForm")

var HospitalList = require("./views/HospitalList")
var HospitalForm = require("./views/HospitalForm")

var InvestigatorList = require("./views/InvestigatorList")
var InvestigatorForm = require("./views/InvestigatorForm")
var TrialDataList = require("./views/TrialDataList")

var EHRList = require("./views/EHRList")
var EHRNewForm = require("./views/EHRNewForm")
var PreScreeningCheckForm = require("./views/PreScreeningCheck")
var InformConsentRequestList = require("./views/InformConsentRequestList")
//var LabTestsList = require("./views/LabTestsList")
//var LabTestForm = require("./views/LabTestForm")
//
//var LabList = require("./views/LabList")
//var LabForm = require("./views/LabForm")
//
//var PulseList = require("./views/PulseList")
//var PulseForm = require("./views/PulseForm")
//
//var ContractList = require("./views/ContractList")
//var ContractForm = require("./views/ContractForm")
//
//var PaymentList = require("./views/PaymentList")
//
//var DoctorAssignForm = require("./views/DoctorAssignForm")
//var FirstVisitForm = require("./views/FirstVisitForm")
//var EatPillsForm = require("./views/EatPillsForm")
//var PassTestsForm = require("./views/PassTestsForm")
//var AttendProceduresForm = require("./views/AttendProceduresForm")
//var NextVisitForm = require("./views/NextVisitForm")

//var DoctorActionsList = require("./views/DoctorActionsList")
var HospitalActionsList = require("./views/HospitalActionsList")
var PatientActionsList = require("./views/PatientActionsList")
//var LabActionsList = require("./views/LabActionsList")
var InvestigatorActionsList = require("./views/InvestigatorActionsList")
var Layout = require("./views/Layout")

m.route(document.body, "/hospital", {

//    "/actions": {
//        render: function() {
//            return m(Layout, m(ActionsList))
////              return m(ActionsList)
//        }
//    },
    "/patient_list": {
        render: function(vnode) {
            return m(Layout, m(PatientList, vnode.attrs))
        }
    },
    "/patient/new/": {
        render: function() {
            return m(Layout, m(PatientForm))
        }
    },
//    "/doctor_list": {
//        render: function(vnode) {
//            return m(Layout, m(DoctorList, vnode.attrs))
//        }
//    },
//    "/doctor/new/": {
//        render: function() {
//            return m(Layout, m(DoctorForm))
//        }
//    },
    "/hospital_list/": {
        render: function(vnode) {
            return m(Layout, m(HospitalList, vnode.attrs))
        }
    },
    "/hospital/new/": {
        render: function() {
            return m(Layout, m(HospitalForm))
        }
    },
    "/investigator_list/": {
        render: function(vnode) {
            return m(Layout, m(InvestigatorList, vnode.attrs))
        }
    },
    "/investigator/new/": {
        render: function() {
            return m(Layout, m(InvestigatorForm))
        }
    },
    "/ehr_list": {
        render: function(vnode) {
            return m(Layout, m(EHRList, vnode.attrs))
        }
    },
    "/trial_data_list": {
        render: function(vnode) {
            return m(Layout, m(TrialDataList, vnode.attrs))
        }
    },
    "/pre_screening_check": {
        render: function(vnode) {
            return m(Layout, m(PreScreeningCheckForm, vnode.attrs))
        }
    },
    "/inform_consent_request_list": {
        render: function(vnode) {
            return m(Layout, m(InformConsentRequestList, vnode.attrs))
        }
    },
//    "/pass_tests/": {
//        render: function() {
//            return m(Layout, m(PassTestsForm))
//        }
//    },
//    "/attend_procedures/": {
//        render: function() {
//            return m(Layout, m(AttendProceduresForm))
//        }
//    },
//    "/next_visit/": {
//        render: function() {
//            return m(Layout, m(NextVisitForm))
//        }
//    },
    "/ehr/new/": {
        render: function(vnode) {
            return m(Layout, m(EHRNewForm, vnode.attrs))
        }
    },
//    "/claim/:clinic_pkey/:claim_id": {
//        render: function(vnode) {
//            return m(Layout, m(ClaimDetailsForm, vnode.attrs))
//        }
//    },
//    "/lab_test_list": {
//        render: function(vnode) {
//            return m(Layout, m(LabTestsList, vnode.attrs))
//        }
//    },
//    "/lab_test_list/new/": {
//        render: function(vnode) {
//            return m(Layout, m(LabTestForm, vnode.attrs))
//        }
//    },
//    "/pulse_list": {
//        render: function(vnode) {
//            return m(Layout, m(PulseList, vnode.attrs))
//        }
//    },
//    "/pulse_list/new/": {
//        render: function(vnode) {
//            return m(Layout, m(PulseForm, vnode.attrs))
//        }
//    },
//    "/payment_list": {
//        render: function(vnode) {
//            return m(Layout, m(PaymentList, vnode.attrs))
//        }
//    },
//    "/contract_list": {
//        render: function(vnode) {
//            return m(Layout, m(ContractList, vnode.attrs))
//        }
//    },
//    "/contract_list/new/": {
//        render: function(vnode) {
//            return m(Layout, m(ContractForm, vnode.attrs))
//        }
//    },
//    "/patient/:patient_pkey": {
//        render: function(vnode) {
//            return m(Layout, m(PatientDetailsForm, vnode.attrs))
//        }
//    },
    "/hospital": {
        render: function() {
            return m(Layout, m(HospitalActionsList))
        }
    },
//    "/doctor": {
//        render: function() {
//            return m(Layout, m(DoctorActionsList))
//        }
//    },
    "/patient": {
        render: function() {
            return m(Layout, m(PatientActionsList))
        }
    },
//    "/lab": {
//        render: function() {
//            return m(Layout, m(LabActionsList))
//        }
//    },
    "/investigator": {
        render: function() {
            return m(Layout, m(InvestigatorActionsList))
        }
    },
//    "/lab_list/": {
//        render: function(vnode) {
//            return m(Layout, m(LabList, vnode.attrs))
//        }
//    },
//    "/lab/new/": {
//        render: function() {
//            return m(Layout, m(LabForm))
//        }
//    },
//    "/list": {
//        render: function() {
//            return m(Layout, m(UserList))
//        }
//    },
//    "/edit/:id": {
//        render: function(vnode) {
//            return m(Layout, m(UserForm, vnode.attrs))
//        }
//    },
})