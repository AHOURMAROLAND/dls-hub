import random
from typing import List

def balanced_draw(players: list, group_count: int) -> dict:
    sorted_players = sorted(players, key=lambda p: (p["dll_division"], -p["dll_won"]))
    groups = {f"G{chr(65+i)}": [] for i in range(group_count)}
    group_keys = list(groups.keys())
    for i, player in enumerate(sorted_players):
        groups[group_keys[i % group_count]].append(player)
    return groups

def elimination_draw(players: list) -> list:
    shuffled = players.copy()
    random.shuffle(shuffled)
    pairs = []
    for i in range(0, len(shuffled), 2):
        if i + 1 < len(shuffled):
            pairs.append({"home": shuffled[i], "away": shuffled[i+1]})
    return pairs
