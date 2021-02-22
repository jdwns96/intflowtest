from flask import Flask, render_template
from flask import request, jsonify
import cx_Oracle as cx
import json

conn = cx.connect("hr", "hr", "localhost:1521/xe")
cursor = conn.cursor()  # 커서 생성


app = Flask(__name__)

@app.route('/') # 최초 실행 
def html():
    return render_template('main.html')


@app.route('/allexecute' , methods =['POST'])
def all():
    val1 = request.form['lis1']
    val2 = request.form['lis2']
    if val1 == "0" and val2 == "0" : # 전체 & 전체 
        sql = "select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf group by current_dt order by current_dt" 
    elif val1 == "0" and val2 != "0" : # 전체 & obj
        sql = "select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf where object_id = "+val2+" group by current_dt order by current_dt asc"
    elif val1 != "0" and val2 == "0" : # 카메라 선택 & 전체 
        sql = "SELECT distinct current_dt,sum(activity), sum(feed), sum(drinking) FROM itf WHERE camera_id = "+val1+" group by current_dt order by current_dt asc"
    else :
        sql = "SELECT distinct current_dt,sum(activity), sum(feed), sum(drinking) FROM itf WHERE camera_id = "+val1+" AND object_id = "+val2+" group by current_dt order by current_dt asc"
    cursor.execute(sql)
    datas = json.dumps(cursor.fetchall())
    return datas


if __name__ == '__main__':
    app.run(debug='True')

