# https://dev.mysql.com/doc/connector-python/en/
# https://www.w3schools.com/python/python_mysql_getstarted.asp

import mysql.connector as MySQL
try:
    db = MySQL.connect(
        host="127.0.0.1",
        user="root",
        password="",
        database="flights",
        port=3306
    )
except MySQL.Error as err:
    print(err)
    quit()
try:
    query = db.cursor()
    query.execute("SELECT code, name FROM airport ORDER BY code ASC")
    result = query.fetchall()
except MySQL.Error as err:
    print(err)
else:
    if result:
        print("Airports:")
        for row in result:
            print(f'{row[0]}\t{row[1]}')
    else:
        print("No records")
db.close()
