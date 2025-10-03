"""
Scrapes algorithms from https://jperm.net
"""

from bs4 import BeautifulSoup

html = open("page.html", encoding="utf-8").read()
soup = BeautifulSoup(html, "html.parser")

print("export const ollCases = [")  # Start TS array

for tr in soup.find_all("div", class_="tr"):
    name_div = tr.find("div", class_="td name")
    group_div = tr.find("div", class_="td group")
    alg_div = tr.find("div", class_="td alg")

    if not name_div or not group_div or not alg_div:
        continue

    name = name_div.find("div", class_="td-text").get_text(strip=True)
    group = group_div.find("div", class_="td-text").get_text(strip=True)
    alg = alg_div.find("div", class_="td-text").get_text(strip=True)

    # Print as TS object
    print("  {")
    print(f'    name: "{name}",')
    print(f'    moves: "{alg}",')
    print(f'    description: "{group}",')
    print(f'    category: "OLL",')
    print("  },")

print("] as const;")
