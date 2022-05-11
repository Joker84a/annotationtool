import json
from os import listdir
from os.path import isfile, join
import sys
print('cmd entry:', sys.argv)

mypath = sys.argv[0]
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
with open(f'json_data{sys.argv[1]}.json', 'w') as outfile:
    json.dump(onlyfiles, outfile)