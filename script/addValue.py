import MySQLdb
import sys

# connect
db = MySQLdb.connect(host="localhost", user="root", passwd="toor", db="sss")

cursor = db.cursor()

# execute SQL select statement
cursor.execute("update user_info set gold=gold+%s,free_gem=free_gem+%s, reputation=reputation+%s, friend_points=friend_points+%s, decompose_points=decompose_points+%s, achievement_points=achievement_points+%s where user_id=%s", (sys.argv[2], sys.argv[3],sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7], sys.argv[1]))

# commit your changes
db.commit()

db.close()
# get the number of rows in the resultset
print("success")
