from flask import Flask,request
from flask_cors import CORS
from pymongo import MongoClient
import os
import datetime
__author__ = 'Lambert Nnadi'

myclient = MongoClient("mongodb://localhost:27017/")
mydb = myclient.vios
up_image_name = 'aas0'
up_profile_image_name = 'usr_profile'
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

CORS(app)

@app.route('/',methods=['GET','POST'])
def empty_req():
    return 'lambo request'

@app.route('/register_employee',methods=['GET','POST'])
def reg_employee():
    if request.method == 'GET':
        first_name = request.args.get('first_name')
        last_name = request.args.get('last_name')
        middle_name = request.args.get('middle_name')
        primary_phone_no = request.args.get('primary_phone_no')
        secondary_phone_no = request.args.get('secondary_phone_no')
        empl_age = request.args.get('empl_age')
        email = request.args.get('email')
        address = request.args.get('address')
        check_e_email = check_email(email)
        if check_e_email == 1:
                em_prof_row = {"first_name":first_name,
                "last_name":last_name, 
                "middle_name":middle_name,
                "primary_phone_no":primary_phone_no,
                "secondary_phone_no":secondary_phone_no,
                "email":email,
                "address":address,
                "age":empl_age}
                print(em_prof_row)
                inserted_row = mydb.employee_profile.insert_one(em_prof_row)
                return inserted_row.inserted_id
        else:
                # email already exist
                return '100245'
def check_email(data):
        cusur = mydb.employee_profile.find({'email':data})
        count = 0
        for x in cusur:
                count = count + 1
        if count < 0:
                return '1'
        else:
                return '0'

@app.route('/test_reg',methods=['GET','POST'])
def reg_employee11():
        name = request.args.get('name')
        return name
@app.route('/dbug_table')
def get_collection():
        cusur = mydb.employee_profile.find({})
        cusur_array = []
        for x in cusur:
                cusur_array.append(x)
                print(x)
        return '111'
@app.route("/upload_profile_pic", methods=['POST'])
def upload_profile_pic_fun():
    file = request.files['filesUP00012101']
    employee_id = request.form['r_empl_id']
    request.get_data()
    node_ip = request.remote_addr
    if os.path.exists('node_temp/'+node_ip):
            emptyff = 0
    else:
            os.makedirs('node_temp/'+node_ip)
    f = 'node_temp/'+node_ip+'/'+up_profile_image_name+'.jpg'
    file.save(f)
    return '"success":true'

@app.route("/upload_doc", methods=['POST'])
def upload_doc_fun():
    file = request.files['filesUP00012101']
    request.get_data()
    usr_id = request.form['user_id']
    if os.path.exists('images/'+usr_id):
            emptyff = 0
    else:
            os.makedirs('images'+'/'+usr_id); 
    pic_path = 'images/'+usr_id
    logFile = ""
    if os.path.isfile(pic_path+'/log.txt'):
            logFile = open(pic_path+"/"+"log.txt", "a")
    else:
            logFile = open(pic_path+"/log.txt", "w+")
    logFile.write("usr_profile_pic - change - "+datetime.datetime.today().strftime('%Y-%m-%d')+"\n")
    logFile.close();
    f = 'images/'+usr_id+'/'+up_profile_image_name+'.jpg'
    file.save(f)
    return '"success":true'



