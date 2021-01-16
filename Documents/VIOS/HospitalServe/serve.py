from flask import Flask,request
from flask_cors import CORS
from pymongo import MongoClient
import os
import datetime
import json
import shutil
from bson import json_util
from bson.objectid import ObjectId
from datetime import timedelta
import re
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
def write_to_patient_sugestions(data,data2):
        data_inner = ""
        nameBase_str = "name_based"
        id_based_str = "id_based"
        with open("general_server_files/drug_sugestions.json","r") as f:
                data_inner = json.load(f)
                data_inner[nameBase_str].append(data)
                data_inner[id_based_str].append(data2)
        with open("general_server_files/patient_sugestions.json","w") as r:
                json.dump(data_inner,r,sort_keys=True)
def write_to_drug_sugestions(data):
        data_inner = ""
        with open("general_server_files/drug_sugestions.json","r") as f:
                data_inner = json.load(f)
                data_inner.append(data)
        with open("general_server_files/drug_sugestions.json","w") as r:
                json.dump(data_inner,r,sort_keys=True)
def write_to_employee_sugestions(data,category):
        data_inner = ""
        with open("general_server_files/employee_sugestions.json","r") as f:
                data_inner = json.load(f)
                data_inner[category].append(data)
        with open("general_server_files/employee_sugestions.json","w") as r:
                json.dump(data_inner,r,sort_keys=True)
def delete_from_employee_sugestions(id,category):
        check_id = ''
        with open("general_server_files/employee_sugestions.json","r") as f:
                data_inner = json.load(f)
                for k in data_inner[category]:
                        check_id = k["id"]
                        if check_id == id:
                                data_inner[category].pop()
        with open("general_server_files/employee_sugestions.json","w") as r:
                json.dump(data_inner,r,sort_keys=True)
def tojson(data):
        return json.dumps(data,default=json_util.default)
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
        job = request.args.get('job')
        address = request.args.get('address')
        check_e_email = check_email(email)
        logFile = ""
        if os.path.isfile('employee/reg.txt'):
            logFile = open("employee/reg.txt", "r")
        else:
            logFile = open("employee/reg.txt", "w+")
            logFile.write("0")
            logFile.close()
            logFile = open("employee/reg.txt", "r")
        rline = logFile.readline()
        prv_data_int = int(rline)
        nw_data_int = prv_data_int + 1
        logFile.close()
        if check_e_email == 1:
                em_prof_row = {"first_name":first_name,
                "last_name":last_name, 
                "middle_name":middle_name,
                "primary_phone_no":primary_phone_no,
                "secondary_phone_no":secondary_phone_no,
                "email":email,
                "job":job,
                "address":address,
                "age":empl_age,
                "insertion_index":nw_data_int,
                "password":""
                }
                logFile2 = open("employee/reg.txt", "w")
                logFile2.write(str(nw_data_int))
                logFile2.close()
                inserted_row = mydb.employee_profile.insert_one(em_prof_row)
                emp_search_json_cons = {'character':first_name+' '+last_name+' '+middle_name,'id':str(inserted_row.inserted_id),'icon':'http://localhost:4417/employee/'+str(inserted_row.inserted_id)+'/profile/usr_profile.jpg'}
                write_to_employee_sugestions(emp_search_json_cons,job)
                return str(inserted_row.inserted_id)
        else:
                # email already exist
                return '100245'
def get_professional_logedin_id_for_ops(id):
        query = {"id":id}
        cusur = mydb.session_log.find(query)
        for x in cusur:
                result = x["data"]
        return result
@app.route("/upload_patient_profile_pic", methods=['POST'])
def upload_patient_profile_pic_fun():
        
    file = request.files['filesUP00012101']
    patient_id = request.form['r_empl_id']
    node_ip = request.remote_addr
    if os.path.exists('patient/'+patient_id+'/profile'):
            emptyff = 0
    else:
            os.makedirs('patient/'+patient_id+'/profile')
    f = 'patient/'+patient_id+'/profile/'+up_profile_image_name+'.jpg'
    file.save(f)
    return '"success":true'
@app.route('/search_patient',methods=['GET','POST'])
def search_patient_meth():
        tosearch = request.form['txt_to_search']
        cusur = mydb.patient_profile.find({"$text":{"$search":tosearch}})
        cusur_array = []
        for x in cusur:
                cusur_array.append(x)
        return tojson(cusur_array)
def get_logedin_session_name(id):
        new_str_id = id
        new_json_id = json.loads(new_str_id)
        final_id = new_json_id["$oid"]
        query = {"_id":ObjectId(final_id)}
        cusur = mydb.employee_profile.find_one(query,{"first_name":1,"last_name":1})
        result = cusur['first_name'] + cusur['last_name']
        return result

@app.route('/register_patient',methods=['GET','POST'])
def reg_patient_meth():
    if request.method == 'GET':
        first_name = request.args.get('first_name')
        last_name = request.args.get('last_name')
        middle_name = request.args.get('middle_name')
        phone_no = request.args.get('phone_no')
        email = request.args.get('email')
        home_address = request.args.get('home_address')
        date_of_birth = request.args.get('date_of_birth')
        occupation = request.args.get('occupation')
        next_of_kin = request.args.get('next_of_kin')
        department = request.args.get('department')
        patientno = request.args.get('patientno')
        check_e_email = check_email_patient(email)
        if check_e_email == 1:
                em_prof_row = {"first_name":first_name,
                "last_name":last_name, 
                "middle_name":middle_name,
                "phone_no":phone_no,
                "email":email,
                "home_address":home_address,
                "password":"",
                "age":"",
                "date_of_birth":date_of_birth,
                "occupation":occupation,
                "next_of_kin":next_of_kin,
                "department":department,
                "patientno":patientno,
                "who__registerd":get_professional_logedin_id_for_ops(request.remote_addr)
                }
                inserted_row = mydb.patient_profile.insert_one(em_prof_row)
                mydb.patient_profile.create_index([("first_name","text"),("last_name","text"),("middle_name","text")])
                emp_search_json_cons = {'character':first_name+' '+last_name+' '+middle_name,'id':str(inserted_row.inserted_id),'icon':'http://localhost:4417/patient/'+str(inserted_row.inserted_id)+'/profile/usr_profile.jpg'}
                emp_search_json_cons2 = {'character':str(inserted_row.inserted_id),'id':str(inserted_row.inserted_id),'icon':'http://localhost:4417/patient/'+str(inserted_row.inserted_id)+'/profile/usr_profile.jpg'}
                write_to_patient_sugestions(emp_search_json_cons,emp_search_json_cons2)
                return str(inserted_row.inserted_id)
        else:
                # email already exist
                return '100245'

@app.route('/get_drug', methods=['POST'])
def get_drug_meth():
        category = request.form['category']
        query = {"category":category}
        price_sum = 0
        tot_no_of_drugs = 0
        tot_quantity = 0
        cusur = mydb.drugs.find(query,{'_id':1,'name':1,'strength':1,'quantity':1,'dosage':1,'expDate':1,'batch_price':1,'price':1})
        cusur_array = []
        for x in cusur:
                cusur_array.append(x)
                current_x_json = json.loads(tojson(x))
                price_sum = price_sum + (int(current_x_json['price'])*int(current_x_json['quantity']))
                tot_no_of_drugs += 1
                tot_quantity += int(current_x_json['quantity'])
                final_output = '{"ac_result":'+tojson(cusur_array)+',"totals":[{"price_sum":"'+str(price_sum)+'","tot_no_of_drugs":"'+str(tot_no_of_drugs)+'","tot_quantity":"'+str(tot_quantity)+'"}]}'
        return final_output
@app.route('/search_drugs', methods=['POST'])
def search_drugs_meth():
        text = request.form['text']
        query = {"$text":{"$search":text}}
        cusur = mydb.drugs.find(query,{'_id':1,'name':1,'strength':1,'dosage':1,'price':1,'type':1})
        cusur_array = []
        for x in cusur:
                cusur_array.append(x)
        return tojson(cusur_array)
@app.route('/find_drugs', methods=['POST'])
def find_drugs_meth():
        drug_id = request.form['drug_id']
        query = {"_id": ObjectId(drug_id)}
        cusur = mydb.drugs.find_one(query,{'_id':1,'name':1,'strength':1,'dosage':1,'price':1,'type':1,'quantity':1})
        cusur_array = []
        cusur_array.append(cusur)
        return tojson(cusur_array)
@app.route('/add_new_drug',methods=['GET','POST'])
def add_new_drug_meth():
    if request.method == 'POST':
        name = request.form['name']
        typeHSD = request.form['type']
        price = request.form['price']
        quantity = request.form['quantity']
        batch_price = request.form['batch_price']
        brand = request.form['brand']
        drug_shortage_point = request.form['drug_shortage_point']
        strength = request.form['strength']
        expDate = request.form['expDate']
        category = request.form['category']
        check_e_email = check_drug_exsistence(name,strength)
        if check_e_email == 1:
                em_prof_row = {"name":name, 
                "type":typeHSD,
                "price":price,
                "quantity":quantity,
                "batch_price":batch_price,
                "brand":brand,
                "drug_shortage_point":drug_shortage_point,
                "strength":strength,
                "expDate":expDate,
                "category":category,
                "who__registerd":get_professional_logedin_id_for_ops(request.remote_addr)
                }
                inserted_row = mydb.drugs.insert_one(em_prof_row)
                print(inserted_row)
                batch_doc = {"name":name, 
                "type":typeHSD,
                "price":price,
                "quantity":quantity,
                "batch_price":batch_price,
                "brand":brand,
                "drug_shortage_point":drug_shortage_point,
                "strength":strength,
                "expDate":expDate,
                "category":category,
                "DrugID":str(inserted_row.inserted_id),
                "batch_number":1,
                "expired_flag":0
                }
                mydb.drugs_batch.insert_one(batch_doc)
                emp_search_json_cons = {'character':name,'id':str(inserted_row.inserted_id)}
                write_to_drug_sugestions(emp_search_json_cons)
                return '11111'
        else:
                # email already exist
                return '100245'

@app.route('/add_note',methods=['POST'])
def add_note_meth():
        note = request.form['note']
        patient_id = request.form['patient_id']
        physician = get_professional_logedin_id_for_ops(request.remote_addr)
        add_note_q = {
                "note":note,
                "physician":physician,
                "date":datetime.datetime.today().strftime('%Y-%m-%d'),
                "patient_id":patient_id
        }
        inserted_row = mydb.notes.insert_one(add_note_q)
        mydb.notes.create_index([('patient_id', 'text'),('date', 'text')])
        return '11111'

def check_email(data):
        cusur = mydb.employee_profile.find_one({'email':data},{'email':1})
        count = 0
        if cusur:
                count = 1
        if count == 0:
                return 1
        else:
                return 0 
def check_email_patient(data):
        cusur = mydb.patient_profile.find_one({'email':data},{'email':1})
        count = 0
        if cusur:
                count = 1
        if count == 0:
                return 1
        else:
                return 0
def check_drug_exsistence(name,strength):
        cusur = mydb.drugs.find_one({'name':name,'strength':strength},{'name':1})
        count = 0
        if cusur:
                count = 1
        if count == 0:
                return 1
        else:
                return 0
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
        return tojson(cusur_array)
@app.route('/get_employee', methods=['POST'])
def get_employee_meth():
        cusur = mydb.employee_profile.find({}).sort("insertion_index",-1)
        cusur_array = '{"employee":['
        count = 0
        for x in cusur:
                if count == (cusur.count()-1):
                        cusur_array=cusur_array+tojson(x)+"]}"
                else:
                        cusur_array=cusur_array+tojson(x)+","
                count = count + 1
        return cusur_array
@app.route('/get_employee_doc', methods=['GET'])
def get_employee_doc_meth():
        employee_id = request.args.get('r_empl_id')
        query = {"employee_id":employee_id}
        cusur = mydb.employee_document_log.find(query)
        cusur_array = '{"doc":['
        count = 0
        for x in cusur:
                if count == (cusur.count()-1):
                        cusur_array=cusur_array+tojson(x)
                else:
                        cusur_array=cusur_array+tojson(x)+","
                count = count + 1
        return cusur_array+"]}"
@app.route('/delet_employee', methods=['GET'])
def delet_employee_meth():
        employee_id = request.args.get('r_empl_id')
        category = request.args.get('category')
        query = {"_id": ObjectId(employee_id)}
        mydb.employee_profile.delete_one(query)
        query2 = {"employee_id":employee_id}
        docs = mydb.employee_document_log.find(query2)
        for x in docs:
                pic_name = x['file_name']
                pic_path = "employee/"+employee_id+"/doc/"+pic_name
                os.remove(pic_path)
        shutil.rmtree("employee/"+employee_id)
        mydb.employee_document_log.delete_many(query2)
        delete_from_employee_sugestions(employee_id,category)
        return "true"
@app.route("/upload_profile_pic", methods=['POST'])
def upload_profile_pic_fun():
        
    file = request.files['filesUP00012101']
    employee_id = request.form['r_empl_id']
    node_ip = request.remote_addr
    if os.path.exists('employee/'+employee_id+'/profile'):
            emptyff = 0
    else:
            os.makedirs('employee/'+employee_id+'/profile')
    f = 'employee/'+employee_id+'/profile/'+up_profile_image_name+'.jpg'
    file.save(f)
    return '"success":true'

@app.route("/upload_doc", methods=['POST'])
def upload_doc_fun():                                                      
    file = request.files['filesUP00012101']
    usr_id = request.form['user_id']
    if os.path.exists('employee/'+usr_id+'/doc'):
            emptyff = 0
    else:
            os.makedirs('employee/'+usr_id+'/doc'); 
    pic_path = 'employee/'+usr_id+'/doc'
    logFile = ""
    if os.path.isfile(pic_path+'/log.txt'):
            logFile = open(pic_path+"/"+"log.txt", "a")
    else:
            logFile = open(pic_path+"/log.txt", "w+")
    if os.path.isfile(pic_path+'/docs_info.txt'):
           empt = 0
    else:
            newDocinfo_file = open(pic_path+"/docs_info.txt", "w+")
            newDocinfo_file.write("0")
            newDocinfo_file.close()
    logFile.write("usr_profile_pic - change - "+datetime.datetime.today().strftime('%Y-%m-%d')+"\n")
    logFile.close()
    docs_info_cdata = open(pic_path+"/docs_info.txt", "r")
    docs_info_cdata_read = docs_info_cdata.readline()
    int_docs_info = int(docs_info_cdata_read)
    int_docs_info = int_docs_info + 1
    str_doc_info = str(int_docs_info)
    f = 'employee/'+usr_id+'/doc/'+str_doc_info+'.docx'
    file.save('employee/'+usr_id+'/doc/'+file.filename)
    em_prof_row = {"file_name":file.filename,
                "set":str_doc_info,
                "employee_id":usr_id,
                "date":datetime.datetime.today().strftime('%Y-%m-%d')
    }
    inserted_row = mydb.employee_document_log.insert_one(em_prof_row)
    docs_info = open(pic_path+"/docs_info.txt", "w")
    docs_info.write(str_doc_info)
    docs_info_cdata.close()
    return '"success":true'
@app.route('/login_professional',methods=['GET','POST'])
def login_professional_math():
        email = request.form['email_c']
        password = request.form['password_c']
        cusur = mydb.employee_profile.find_one({'email':email},{'_id':1,'email':1,'job':1,'first_name':1,'last_name':1})
        count = 0
        outx = ''
        outx = cusur
        if cusur:
                count = 1
        if count == 1:
                cid = tojson(outx["_id"])
                if check_if_session_exsit(cid,request.remote_addr) == 'F':
                        session_id = insert_profe_session(cid,request.remote_addr,outx["job"],outx["first_name"],outx["last_name"])
                        result = outx["job"]
                elif check_if_session_exsit(cid,request.remote_addr) == 'G':
                        result = outx["job"]
                else:
                        # 20013 - error: already loged in
                        result = '20013'
                return result
        else:
                return "10001"
def check_if_session_exsit(data,mID):
        query = {"data":data}
        cusur = mydb.session_log.find_one(query,{"email": 1,"id":1})
        count = 0
        if cusur:
                count = 1
        if count == 1:
                if cusur["id"] == mID:
                        return 'G'
                else:
                        return 'T'
        return 'F'
def insert_profe_session(data,ip,job,first_name,last_name):
        currentDate = datetime.datetime.now()
        em_prof_row = {"data":data,
                "expireAt":currentDate + timedelta(hours=12),
                "type":"ID",
                "id":ip,
                "job":job,
                "first_name":first_name,
                "last_name":last_name
        }
        inserted_row = mydb.session_log.insert_one(em_prof_row)
        return currentDate
@app.route('/logout_professional',methods=['GET','POST'])
def logout_professional_meth():
        query = {"id": request.remote_addr}
        mydb.session_log.delete_one(query)
        return "11111"
@app.route('/get_professional_logedin_id',methods=['GET','POST'])
def get_professional_logedin_id_meth():
        id = request.remote_addr
        query = {"id":id}
        cusur = mydb.session_log.find_one(query,{"data":1})
        result = cusur['data']
        return result
@app.route('/get_doctors_logedin_id',methods=['GET','POST'])
def get_doctors_logedin_id_meth():
        query = {"job":"Doctor"}
        cusur = mydb.session_log.find(query,{'_id':0,"data":1,"first_name":1,"last_name":1})
        cusur_array = []
        for x in cusur:
                curr_doc_id = x["data"]
                collect_id = re.findall(r'\d.\w*',tojson(x))
                x["Shift"] = get_shifts(collect_id[0])
                x["Asg_patients"] = get_shifts(collect_id[0])
                cusur_array.append(x)
        return tojson(cusur_array)
def get_shifts(id):
        return '00:00AM - 00:00PM'
def get_no_assigned_patients(id):
        return '0'
app.run(host='0.0.0.0', port=5000)