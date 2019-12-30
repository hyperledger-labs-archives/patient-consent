# Copyright 2017 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------------------------
from sanic import Blueprint
from sanic import response
<<<<<<< HEAD
from rest_api.ehr_common import transaction as ehr_transaction
=======
# from rest_api.cocommon import transaction
from rest_api.ehr_common import transaction as ehr_transaction
from rest_api.ehr_common import helper
>>>>>>> upstream/master
from rest_api import general, security_messaging
from rest_api.errors import ApiBadRequest, ApiInternalError

EHRS_BP = Blueprint('ehrs')


@EHRS_BP.get('ehrs')
async def get_all_ehrs(request):
    client_key = general.get_request_key_header(request)
    ehr_list = await security_messaging.get_ehrs(request.app.config.VAL_CONN, client_key)

    ehr_list_json = []
    for address, ehr in ehr_list.items():
        ehr_list_json.append({
            'id': ehr.id,
            'client_pkey': ehr.client_pkey,
<<<<<<< HEAD
            'height': ehr.height,
            'weight': ehr.weight,
            'A1C': ehr.A1C,
            'FPG': ehr.FPG,
            'OGTT': ehr.OGTT,
            'RPGT': ehr.RPGT,
=======
            'field_1': ehr.field_1,
            'field_2': ehr.field_2,
>>>>>>> upstream/master
            'event_time': ehr.event_time,
            'name': ehr.name,
            'surname': ehr.surname
        })

    return response.json(body={'data': ehr_list_json},
                         headers=general.get_response_headers())


<<<<<<< HEAD
@EHRS_BP.get('ehrs/pre_screening_data')
async def get_screening_data(request):
    """Updates auth information for the authorized account"""
    investigator_pkey = general.get_request_key_header(request)
    ehr_list = await security_messaging.get_pre_screening_data(request.app.config.VAL_CONN,
                                                               investigator_pkey, request.raw_args)

    ehr_list_json = []
    for address, data in ehr_list.items():
        ehr_list_json.append({
            'id': data.id,
            'client_pkey': data.client_pkey,
            'height': data.height,
            'weight': data.weight,
            'A1C': data.A1C,
            'FPG': data.FPG,
            'OGTT': data.OGTT,
            'RPGT': data.RPGT,
            'event_time': data.event_time,
            'name': data.name,
            'surname': data.surname
        })

    return response.json(body={'data': ehr_list_json},
                         headers=general.get_response_headers())


=======
>>>>>>> upstream/master
@EHRS_BP.post('ehrs')
async def add_ehr(request):
    """Updates auth information for the authorized account"""
    hospital_pkey = general.get_request_key_header(request)
<<<<<<< HEAD
    required_fields = ['patient_pkey', 'id', 'height', 'weight', 'A1C', 'FPG', 'OGTT', 'RPGT']
=======
    required_fields = ['patient_pkey', 'id', 'field_1', 'field_2']
>>>>>>> upstream/master
    general.validate_fields(required_fields, request.json)

    patient_pkey = request.json.get('patient_pkey')
    ehr_id = request.json.get('id')
<<<<<<< HEAD
    height = request.json.get('height')
    weight = request.json.get('weight')
    a1c = request.json.get('A1C')
    fpg = request.json.get('FPG')
    ogtt = request.json.get('OGTT')
    rpgt = request.json.get('RPGT')
=======
    field_1 = request.json.get('field_1')
    field_2 = request.json.get('field_2')

    # if contract_id is not None and contract_id != '':
    #     is_valid = await security_messaging.valid_contracts(request.app.config.VAL_CONN, patient_pkey, contract_id)
    #     if not is_valid:
    #         return response.text(body="Contract having '" + contract_id + "' id is not valid",
    #                              status=ApiBadRequest.status_code,
    #                              headers=general.get_response_headers())
>>>>>>> upstream/master

    client_signer = general.get_signer(request, hospital_pkey)

    ehr_txn = ehr_transaction.add_ehr(
        txn_signer=client_signer,
        batch_signer=client_signer,
        uid=ehr_id,
        client_pkey=patient_pkey,
<<<<<<< HEAD
        height=height,
        weight=weight,
        a1c=a1c,
        fpg=fpg,
        ogtt=ogtt,
        rpgt=rpgt
=======
        field_1=field_1,
        field_2=field_2
>>>>>>> upstream/master
    )

    batch, batch_id = ehr_transaction.make_batch_and_id([ehr_txn], client_signer)

    await security_messaging.add_ehr(
        request.app.config.VAL_CONN,
        request.app.config.TIMEOUT,
        [batch], hospital_pkey, patient_pkey)

    try:
        await security_messaging.check_batch_status(
            request.app.config.VAL_CONN, [batch_id])
    except (ApiBadRequest, ApiInternalError) as err:
        # await auth_query.remove_auth_entry(
        #     request.app.config.DB_CONN, request.json.get('email'))
        raise err

    return response.json(body={'status': general.DONE},
                         headers=general.get_response_headers())
<<<<<<< HEAD
=======

#
# @EHRS_BP.post('claims/close')
# async def close_claim(request):
#     """Updates auth information for the authorized account"""
#     # keyfile = common.get_keyfile(request.json.get['signer'])
#     clinic_pkey = general.get_request_key_header(request)
#     required_fields = ['claim_id', 'provided_service', 'client_pkey', 'provided_service']
#     general.validate_fields(required_fields, request.json)
#
#     claim_id = request.json.get('claim_id')
#     provided_service = request.json.get('provided_service')
#     patient_pkey = request.json.get('client_pkey')
#     contract_id = request.json.get('contract_id')
#
#     client_signer = general.get_signer(request, clinic_pkey)
#
#     close_claim_txn = transaction.close_claim(
#         txn_signer=client_signer,
#         batch_signer=client_signer,
#         uid=claim_id,
#         patient_pkey=patient_pkey,
#         provided_service=provided_service)
#
#     create_payment_txn = payment_transaction.create_payment(
#         txn_signer=client_signer,
#         batch_signer=client_signer,
#         payment_id=str(helper.get_current_timestamp()),
#         patient_pkey=patient_pkey,
#         contract_id=contract_id,
#         claim_id=claim_id
#     )
#
#     batch, batch_id = transaction.make_batch_and_id([close_claim_txn, create_payment_txn], client_signer)
#
#     await security_messaging.close_claim(
#         request.app.config.VAL_CONN,
#         request.app.config.TIMEOUT,
#         [batch], clinic_pkey, patient_pkey)
#
#     try:
#         await security_messaging.check_batch_status(
#             request.app.config.VAL_CONN, [batch_id])
#     except (ApiBadRequest, ApiInternalError) as err:
#         # await auth_query.remove_auth_entry(
#         #     request.app.config.DB_CONN, request.json.get('email'))
#         raise err
#
#     return response.json(body={'status': general.DONE},
#                          headers=general.get_response_headers())
#
#
# @EHRS_BP.post('claims/update')
# async def update_claim(request):
#     """Updates auth information for the authorized account"""
#     # keyfile = common.get_keyfile(request.json.get['signer'])
#     clinic_pkey = general.get_request_key_header(request)
#     required_fields = ['claim_id', 'provided_service', 'client_pkey', 'provided_service']
#     general.validate_fields(required_fields, request.json)
#
#     claim_id = request.json.get('claim_id')
#     provided_service = request.json.get('provided_service')
#     patient_pkey = request.json.get('client_pkey')
#     contract_id = request.json.get('contract_id')
#
#     client_signer = general.get_signer(request, clinic_pkey)
#
#     close_claim_txn = transaction.update_claim(
#         txn_signer=client_signer,
#         batch_signer=client_signer,
#         uid=claim_id,
#         patient_pkey=patient_pkey,
#         provided_service=provided_service)
#
#     # create_payment_txn = payment_transaction.create_payment(
#     #     txn_signer=client_signer,
#     #     batch_signer=client_signer,
#     #     payment_id=str(helper.get_current_timestamp()),
#     #     patient_pkey=patient_pkey,
#     #     contract_id=contract_id,
#     #     claim_id=claim_id
#     # )
#
#     batch, batch_id = transaction.make_batch_and_id([close_claim_txn], client_signer)
#
#     await security_messaging.update_claim(
#         request.app.config.VAL_CONN,
#         request.app.config.TIMEOUT,
#         [batch], clinic_pkey, patient_pkey)
#
#     try:
#         await security_messaging.check_batch_status(
#             request.app.config.VAL_CONN, [batch_id])
#     except (ApiBadRequest, ApiInternalError) as err:
#         # await auth_query.remove_auth_entry(
#         #     request.app.config.DB_CONN, request.json.get('email'))
#         raise err
#
#     return response.json(body={'status': general.DONE},
#                          headers=general.get_response_headers())
>>>>>>> upstream/master
