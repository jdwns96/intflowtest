import cx_Oracle as cx
import pandas as pd
import numpy as np
from querystring_parser import parser
import json

conn = cx.connect("hr", "hr", "localhost:1521/xe")
cursor = conn.cursor()  # 커서 생성
print('oracle 접속 성공')

# 전체-전체   
def pydbcinit():
    sql = f"select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf group by current_dt order by current_dt"
    cursor.execute(sql)
    datas = cursor.fetchall()
    datas = [list(datas[x]) for x in range(len(datas))]
    datas = datas.parser()
    return datas

def pydbc():
    sql = f"select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf group by current_dt order by current_dt"
    cursor.execute(sql)
    datas = json.dumps(cursor.fetchall())
    return datas

datas = pydbc()
print(datas)


