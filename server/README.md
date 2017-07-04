# 未创建2d索引时，不可以使用$near进行查询

 > db.schools.find({location : {$nearSphere: [50,70]}})


会报错
```
Error: error: {
	"ok" : 0,
	"errmsg" : "error processing query: ns=goedu.schoolsTree: GEONEAR  field=location maxdist=1.79769e+308 isNearSphere=1\nSort: {}\nProj: {}\n planner returned error: unable to find index for $geoNear query",
	"code" : 2,
	"codeName" : "BadValue"
}

```

# 在loc上面创建2d索引
> db.schools.ensureIndex({"location" : "2d"},{"background" : true})
> db.shools.getIndexes()        
