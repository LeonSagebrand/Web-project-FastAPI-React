import requests
import json

class Stocks:
    def __init__(self):
        self.stocks = {}
        try:
            self.load_stock_data()
        except FileNotFoundError:
            self.fetch_stock_data()
            self.export_to_json()

    def fetch_stock_data(self):
        url = f"https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=fnFSgXJIpGN2dK3Zz1ul1UHj2gDIMOIK"
        headers = {"accept": "application/json"}
        response = requests.get(url, headers=headers)
        data = response.json()
        self.stocks = data

    def load_stock_data(self):
            with open("stock_data.json", "r") as json_load_file:
                self.stocks = json.load(json_load_file)

    def export_to_json(self):
            with open("stock_data.json", "w") as json_dump_file:
                    json.dump(self.stocks, json_dump_file, indent=4)

stocks = Stocks()

stocks.fetch_stock_data()
stocks.load_stock_data()
