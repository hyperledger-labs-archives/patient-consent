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
import getpass
import os

# from Crypto.Cipher import AES

# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from sawtooth_signing import ParseError
from sawtooth_signing.secp256k1 import Secp256k1PrivateKey


# from db import auth_query
# from protobuf import payload_pb2 as rule_pb2
from rest_api.errors import ApiBadRequest, ApiForbidden
from rest_api.ehr_common.exceptions import EHRException
# from rest_api.common.protobuf import payload_pb2 as rule_pb2

DONE = 'DONE'


def get_response_headers():
    return {
        # 'Access-Control-Allow-Credentials': True,
        # 'Access-Control-Allow-Origin': origin,
        'Connection': 'keep-alive'}


# def get_request_origin(request):
#     return request.headers['Origin'] if ('Origin' in request.headers) else None


def get_request_key_header(request):
    if 'ClientKey' not in request.headers:
        raise ApiForbidden('Client key not specified')
    return request.headers['ClientKey']
# def validate_input_params(required_fields, request_params):
#     try:
#         for field in required_fields:
#             if request_params.get(field) is None:
#                 raise ApiBadRequest("{} is required".format(field))
#     except (ValueError, AttributeError):
#         raise ApiBadRequest("Improper URL params")


def validate_fields(required_fields, request_json):
    try:
        for field in required_fields:
            if request_json.get(field) is None:
                raise ApiBadRequest("{} is required".format(field))
    except (ValueError, AttributeError):
        raise ApiBadRequest("Improper JSON format")


# def encrypt_private_key(aes_key, public_key, private_key):
#     init_vector = bytes.fromhex(public_key[:32])
#     cipher = AES.new(bytes.fromhex(aes_key), AES.MODE_CBC, init_vector)
#     return cipher.encrypt(private_key)


# async def get_signer(request):
#     email = deserialize_auth_token(
#         request.app.config.SECRET_KEY, request.token).get('email')
#     auth_info = await auth_query.fetch_info_by_email(
#         request.app.config.DB_CONN, email)
#     private_key_hex = decrypt_private_key(
#         request.app.config.AES_KEY,
#         auth_info.get('public_key'),
#         auth_info.get('encrypted_private_key'))
#     private_key = Secp256k1PrivateKey.from_hex(private_key_hex)
#     return CryptoFactory(request.app.config.CONTEXT).new_signer(private_key)


# def decrypt_private_key(aes_key, public_key, encrypted_private_key):
#     init_vector = bytes.fromhex(public_key[:32])
#     cipher = AES.new(bytes.fromhex(aes_key), AES.MODE_CBC, init_vector)
#     return cipher.decrypt(encrypted_private_key)


# def generate_auth_token(secret_key, email, public_key):
#     serializer = Serializer(secret_key)
#     token = serializer.dumps({'email': email, 'public_key': public_key})
#     return token.decode('ascii')


# def deserialize_auth_token(secret_key, token):
#     serializer = Serializer(secret_key)
#     return serializer.loads(token)


# def proto_wrap_rules(rules):
#     rule_protos = []
#     if rules is not None:
#         for rule in rules:
#             try:
#                 rule_proto = rule_pb2.Rule(type=rule['type'])
#             except IndexError:
#                 raise ApiBadRequest("Improper rule format")
#             except ValueError:
#                 raise ApiBadRequest("Invalid rule type")
#             except KeyError:
#                 raise ApiBadRequest("Rule type is required")
#             if rule.get('value') is not None:
#                 rule_proto.value = value_to_csv(rule['value'])
#             rule_protos.append(rule_proto)
#     return rule_protos


# def value_to_csv(value):
#     if isinstance(value, (list, tuple)):
#         csv = ",".join(map(str, value))
#         return bytes(csv, 'utf-8')
#     else:
#         raise ApiBadRequest("Rule value must be a JSON array")


def get_keyfile(user):
    username = getpass.getuser() if user is None else user
    home = os.path.expanduser("~")
    key_dir = os.path.join(home, ".sawtooth", "keys")

    return '{}/{}.priv'.format(key_dir, username)


def get_signer_from_file(keyfile):
    try:
        with open(keyfile) as fd:
            private_key_str = fd.read().strip()
    except OSError as err:
        raise EHRException(
            'Failed to read private key {}: {}'.format(
                keyfile, str(err)))

    try:
        private_key = Secp256k1PrivateKey.from_hex(private_key_str)
    except ParseError as e:
        raise EHRException(
            'Unable to load private key: {}'.format(str(e)))

    return private_key
    # self._signer = CryptoFactory(create_context('secp256k1')) \
    #     .new_signer(private_key)


def get_signer(request, client_key):
    if request.app.config.SIGNER_HOSPITAL.get_public_key().as_hex() == client_key:
        client_signer = request.app.config.SIGNER_HOSPITAL
    elif request.app.config.SIGNER_PATIENT.get_public_key().as_hex() == client_key:
        client_signer = request.app.config.SIGNER_PATIENT
    # elif request.app.config.SIGNER_DOCTOR.get_public_key().as_hex() == client_key:
    #     client_signer = request.app.config.SIGNER_DOCTOR
    elif request.app.config.SIGNER_INVESTIGATOR.get_public_key().as_hex() == client_key:
        client_signer = request.app.config.SIGNER_INVESTIGATOR
    # elif request.app.config.SIGNER_INSURANCE.get_public_key().as_hex() == client_key:
    #     client_signer = request.app.config.SIGNER_INSURANCE
    else:
        raise EHRException(
            'Unable to load private key for client_key: {}'.format(str(client_key)))
    return client_signer
