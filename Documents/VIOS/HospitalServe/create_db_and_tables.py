from pymongo import MongoClient
myclient = MongoClient("mongodb://localhost:27017/")
mydb = myclient["vios"]

def cr_employee_profile_collection():
    mycol = mydb["employee_profile"]
    mycol.insert_one(
    {"name": "lambo"})
    collist = mydb.list_collection_names()
    if "employee_profile" in collist:
        print("employee_profile created")
    else:
        print("employee_profile NOT created")
cr_employee_profile_collection()