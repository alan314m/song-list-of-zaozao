import json
import pandas as pd

song_df = pd.read_excel('./music_list_zaozao_neo.xlsx')
song_df = song_df.where(pd.notnull(song_df), None)
song_list = []

for index, row in song_df.iterrows():
    # print(index, row[0], row[1])
    song_data = {"index": index, "song_name": row[1], "artist": row[0]}
    song_list.append(song_data)
    

with open("./public/music_list_zaozao.json", 'w') as file:
    file.write(json.dumps(song_list))
