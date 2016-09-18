import MySQLdb
import sys

# connect
db = MySQLdb.connect(host="127.0.0.1", user="root", passwd="toor", db="sss")

cursor = db.cursor()

# execute SQL select statement
cursor.execute("update user_info set account_id=0 where user_id=%s",(sys.argv[1]))

# commit your changes
db.commit()

db.close()
# get the number of rows in the resultset
print("success")
