soeul = 0
count = 0
f = open("test.txt",'r',encoding='UTF-8')
#w = open("s.txt",'w')
li = ["한식"]
for i in f.readlines():
  a = i.split("\t")
  #if a[5][:3]=="02-" and a[1][:2] in li:
  #  w.write(i)
  #  soeul+=1
  print(a[3])
  if len(a)!=7:
    count+=1
#w.close()
f.close()
print(count)
print(soeul)