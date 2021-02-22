import cx_Oracle as cx
import numpy as np
import json

conn = cx.connect("hr", "hr", "localhost:1521/xe")
cursor = conn.cursor()  # 커서 생성
print('oracle 접속 성공')

# 전체-전체 완성 
def pydbcinit():
    sql = f"select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf group by current_dt order by current_dt"
    cursor.execute(sql)
    datas = json.dumps(cursor.fetchall())
    return datas

def tuplepydbcinit():
    sql = f"select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf group by current_dt order by current_dt"
    cursor.execute(sql)
    datas = json.dumps(cursor.fetchall())
    return datas


# 카메라1 - 전체
def pydbcCA(camera_id):
    sql = f"select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf where camera_id = {camera_id} group by current_dt order by current_dt asc"
    cursor.execute(sql)
    datas = json.dumps(cursor.fetchall())
    return datas

# 전체 - 개채1
def pydbcAO(object_id):
    sql = f"select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf where object_id = {object_id} group by current_dt order by current_dt asc;"
    cursor.execute(sql)
    row = cursor.fetchone()
    while row :
        print(row[0],row[1],row[2],row[3])
        row = cursor.fetchone()



#c 카메라1- 개채1
def pydbcCO(camera_id,object_id):
    sql = f"SELECT distinct current_dt,sum(activity), sum(feed), sum(drinking) FROM itfl WHERE camera_id = {camera_id} AND object_id = {object_id} group by current_dt order by current_dt asc"
    cursor.execute(sql)
    row = cursor.fetchone()
    while row :
        print(row[0],row[1],row[2],row[3])
        row = cursor.fetchone()



