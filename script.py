import json
 
# Opening JSON file
f = open('pm_data.geojson', encoding='UTF-8')
 
# returns JSON object as
# a dictionary
data = json.load(f)

for i in range(29):
    y = data['features'][i]['properties']['st_y']
    print(str(y) + ', ')