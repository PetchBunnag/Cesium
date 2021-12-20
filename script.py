import requests
import json

response_API = requests.get("http://159.138.252.132:9000/api/v1/pm_sensor/data")
# print(response_API.status_code)
data = response_API.text


def as_float(obj):
    if "pm2.5" in obj:
        if obj["pm2.5"] != "-":
            obj["pm2.5"] = float(obj["pm2.5"])
        else:
            obj["pm2.5"] = 0.000
    return obj


if __name__ == "__main__":
    l = json.loads(data, object_hook=as_float)
    pm_data = str(
        list(
            (
                l["data"][0]["pm2.5"],
                l["data"][1]["pm2.5"],
                l["data"][2]["pm2.5"],
                l["data"][3]["pm2.5"],
                l["data"][4]["pm2.5"],
                l["data"][5]["pm2.5"],
                l["data"][6]["pm2.5"],
                l["data"][7]["pm2.5"],
                l["data"][8]["pm2.5"],
                l["data"][9]["pm2.5"],
                l["data"][10]["pm2.5"],
                l["data"][11]["pm2.5"],
            )
        )
    )
    # print(pm_data)

textfile = open("data.js", "w")
textfile.write("value = " + pm_data)
textfile.close()
