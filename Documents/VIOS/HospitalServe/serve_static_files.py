from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

CORS(app)
def check_legal_request(data):
    return 1
@app.route('/employee/<path:path>')
def send_js(path):
    ip = ""
    det_request_oraginality = check_legal_request(ip)
    if det_request_oraginality == 1:
        return send_from_directory('employee', path)
    else:
        return 'Erro'
@app.route('/institution_logo')
def send_institution_logo():
    ip = ""
    det_request_oraginality = check_legal_request(ip)
    if det_request_oraginality == 1:
        return send_from_directory('config','institution_logo.png')
    else:
        return 'Erro'
@app.route('/vios_logo')
def send_vios_logo():
    ip = ""
    det_request_oraginality = check_legal_request(ip)
    if det_request_oraginality == 1:
        return send_from_directory('config','vios_logo.png')
    else:
        return 'Erro'
@app.route('/patient/<path:path>')
def send_p_imgs(path):
    ip = ""
    det_request_oraginality = check_legal_request(ip)
    if det_request_oraginality == 1:
        return send_from_directory('patient', path)
    else:
        return 'Erro'
@app.route('/formFiles/<path:path>')
def send_form_files(path):
    ip = ""
    det_request_oraginality = check_legal_request(ip)
    if det_request_oraginality == 1:
        return send_from_directory('uploadFormImg', path)
    else:
        return 'Erro'
@app.route('/general_server_files/<path:path>',methods=['POST'])
def send_general_server_files_js(path):
    ip = ""
    det_request_oraginality = check_legal_request(ip)
    if det_request_oraginality == 1:
        return send_from_directory('general_server_files', path)
    else:
        return 'Erro'

app.run(host='0.0.0.0', port=4417)