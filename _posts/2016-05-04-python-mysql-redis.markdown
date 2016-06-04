---
layout: post
title:  "From mysql to redis with python"
desc: "MySQL to redis via Python"
keywords: "mysql,redis,python"
date:   2016-05-04
categories: [Python, Database]
tags: [Python, MySQL, Redis]
icon: icon-redis
---


``` python
#!/usr/bin/python
## SQL to Redis

# import Redis and MySQL drivers
import redis
import MySQLdb
from collections import Counter

# create class
class dataProcessor(object):

	# Mysql server data
	MYSQL_IP_ADDRESS_SERVER = 'localhost'
	MYSQL_USER = 'root'
	MYSQL_PASSWORD = 'my_strong_password'
	MYSQL_DATABASE_NAME = 'database_name'

	# Redis server data
	REDIS_SERVER = 'localhost'

	# function to get data from mysql and to transfer it to redis
	@staticmethod
	def sql_to_redis():
		r_redis = redis.StrictRedis(dataProcessor.REDIS_SERVER)
		print ""
		print "Connected to Redis successfully!"

		database = MySQLdb.connect(dataProcessor.MYSQL_IP_ADDRESS_SERVER, dataProcessor.MYSQL_USER, dataProcessor.MYSQL_PASSWORD, dataProcessor.MYSQL_DATABASE_NAME)
		print "Connected to MySQL successfully!"
		print ""

		cursor = database.cursor()
		select = 'SELECT * FROM records WHERE location_id = 9 LIMIT 100'
		# select = 'SELECT * FROM records WHERE location_id = 9'
		cursor.execute(select)
		data = cursor.fetchall()

		# Clean redis before run again
		# This is for test purpose
		r_redis.delete("all_records")

		# Put all data from MySQL to Redis
		for row in data:
		r_redis.rpush("all_records", row[3])

		# Close connection to DB and Cursor
		cursor.close()
		database.close()
	
	@staticmethod
	def get_data_from_redis():

		r2_redis = redis.StrictRedis(dataProcessor.REDIS_SERVER)

		list = []
		list = r2_redis.lrange("all_records", 0, 100)

		print list
		print ""

		print "Size of list:", len(list)
		print ""

		word_list = [word for line in list for word in line.split()]
		print word_list
		print ""

		words_to_count = (word for word in word_list if word[:1].isupper())
		top_ten = Counter(words_to_count)

		print "Top 10 Most popular words:"
		print top_ten.most_common(10), "\n"
```
