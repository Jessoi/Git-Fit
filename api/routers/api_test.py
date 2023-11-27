import pprint
import google.generativeai as palm
#from keys import PALM_API_KEY

palm.configure(api_key="AIzaSyDKeXwxHGSRw3YVWYYT6Lvqk1CJqdAvNPM")


models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model = models[0].name
print(model)
