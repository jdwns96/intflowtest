

val1 = "1" #카메라 
val2 = "0" #객체 

if val1 == "0" and val2 == "0" :
    print("1번쨰")  
elif val1 == "0" :
    print("카메라선택")
elif val2 == "0" :
    print("개채선택")
else :
    print("카메라 와 개채 둘다있음")


@app.route('/choice',methods =['POST'])
def choice():  
    val1 = request.form['lis1']
    val2 = request.form['lis2']
    if val1 == "0" and val2 == "0" : # 전체 & 전체 
        sql = "select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf group by current_dt order by current_dt"
        cursor.execute(sql)
        datas = json.dumps(cursor.fetchall())
        return datas
    elif val1 == "0" and val2 !="0" : # 전체 & 개채 선택 
        sql = "select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf where camera_id = "+val2+" group by current_dt order by current_dt asc"
        cursor.execute(sql)
        datas = json.dumps(cursor.fetchall())
    elif val1 != "0" and val2 == "0" : # 카메라 선택시 & 0
        sql = "select distinct current_dt,sum(activity), sum(feed), sum(drinking) from itf where camera_id = "+val1+" group by current_dt order by current_dt asc"
        cursor.execute(sql)
        datas = json.dumps(cursor.fetchall())
        return datas
    else : val != "0" and val2 != "0" : # 카메라 선택 & 객체 선택 
        sql = "SELECT distinct current_dt,sum(activity), sum(feed), sum(drinking) FROM itfl WHERE camera_id = "+val1+" AND object_id = "+val2+" group by current_dt order by current_dt asc"
        cursor.execute(sql)
        datas = json.dumps(cursor.fetchall())
        return datas