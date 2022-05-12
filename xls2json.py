import json
import pandas as pd

song_df = pd.read_excel('./music_list_zaozao.xlsx')
song_df = song_df.where(pd.notnull(song_df), None)
song_list = []

for index, row in song_df.iterrows():
    a = row[0].split("-")
    song_data = {"index": index, "song_name": a[0], "artist": a[1]}
    song_list.append(song_data)
    
sdf = pd.DataFrame(song_list)
sdf.to_excel("music_list_zaozao_neo.xlsx", index=False)
