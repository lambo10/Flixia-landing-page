import json
from bson import json_util
data = {"name":"lambert","dept":"comp-science"}
category = "Doctor"
data_inner = ""
id = "5d29f23cb93f7c4a602a572b"
with open("general_server_files/employee_sugestions.json","r") as f:
        data_inner = json.load(f)
        for k in data_inner[category]:
                check_id = k["id"]
                if check_id == id:
                        data_inner[category].pop()
with open("general_server_files/employee_sugestions.json","w") as r:
        json.dump(data_inner,r,sort_keys=True)