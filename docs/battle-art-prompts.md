# 證據戰鬥角色插畫生成單

戰鬥畫面目前用 SVG 繪製敵人與「見習守護員」。只要把下列檔案放進 `assets/`，遊戲會自動改用插畫（找不到檔案時退回 SVG，不必改程式）。

| 檔名 | 角色 | 朝向 |
|---|---|---|
| `battle-hero.webp` | 見習守護員（玩家） | 面向左 |
| `battle-enemy-01.webp` ～ `battle-enemy-08.webp` | 各關歷史竊盜者 | 面向右 |

## 共同規格

- 正方形 1024×1024，主體置中，腳底接近畫面下緣 8%，四周留 6% 邊距。
- **透明背景**（工具不支援就用純黑背景生成，再去背），存成 WebP，單張 ≤ 250 KB。
- 不要文字、數字、浮水印、UI、武器、血腥或恐怖臉孔；適合國小高年級。
- 角色設定依《國小生版畢業專題遊戲構想》：玩家是「見習歷史保衛員」；敵人是偷走文物、把歷史打亂的「歷史竊盜者」。每隻敵人都戴**暗紅色盜賊眼罩**，並抓著一枚發光的金色文物碎片。

## 共同風格句（每段 Prompt 開頭都貼這段）

```
Hand-painted children's storybook adventure illustration, same style as a museum restoration-room fantasy: detailed brush texture, deep sea-blue and teal shadows, warm amber lamplight rim light, small gold accents, soft painterly edges, not photorealistic, not flat vector, not anime game card. Single full-body character, side view for a turn-based RPG battle, isolated on a transparent background, no text, no UI.
```

## 角色 Prompt

**battle-hero.webp — 見習守護員**
```
A 11-year-old apprentice history guardian, gender-neutral, facing LEFT in a ready stance. Deep sea-blue long coat with amber trim, flowing golden scarf, navy explorer cap with a small gold badge, leather satchel with rolled paper scrolls. Holds a wooden staff topped with a glowing brass compass that emits warm light. Brave and friendly expression.
```

**battle-enemy-01.webp — 航線迷霧（第 1 關）**
```
A thief made of dark navy ink fog, facing RIGHT, soft cloud body with drifting wisps, dark red bandit eye-mask with two glowing amber eyes, swallowing dotted golden sea-route lines; one wispy arm clutches a glowing gold map shard.
```

**battle-enemy-02.webp — 爭吵噪音（第 2 關）**
```
A spiky round thief made of dark crimson-black ink, facing RIGHT, jagged shouting mouth glowing orange, red bandit eye-mask, orange sound-wave arcs bursting from both sides; holds a glowing gold balance-weight shard. Noisy, mischievous, not scary.
```

**battle-enemy-03.webp — 錯位巨石（第 3 關）**
```
A stone golem thief, facing RIGHT, made of mismatched floating rock chunks bound by black ink, glowing amber cracks, red bandit eye-mask across the largest rock, small rocks orbiting; a glowing gold terrain-model shard wedged in its body.
```

**battle-enemy-04.webp — 暴風渦流（第 4 關）**
```
A storm-vortex thief, facing RIGHT, swirling dark-blue ink tornado with a funnel tail, small pale-blue lightning, red bandit eye-mask on the dark core with amber eyes; a glowing gold calendar shard spins in its wind.
```

**battle-enemy-05.webp — 年代裂縫（第 5 關）**
```
A thief living inside a vertical time crack, facing RIGHT, pitch-black jagged rift with glowing teal edges, red bandit eye-mask with amber eyes inside the rift, floating terracotta pottery shards and stone-tool fragments; a glowing gold stone-tool shard at its base.
```

**battle-enemy-06.webp — 單一化墨團（第 6 關）**
```
A dripping black ink-blob thief, facing RIGHT, ONE large amber cyclops eye through a red bandit eye-mask, ink drips covering colorful woven textile stripes (red, green, gold, blue) behind it; holds a glowing gold woven-cloth shard.
```

**battle-enemy-07.webp — 時序海怪（第 7 關）**
```
A small ink-octopus sea-monster thief, facing RIGHT, dark navy dome head with a brass clock face on the forehead, curling tentacles, red bandit eye-mask with amber eyes; one tentacle grips a glowing gold sea-chart shard. Playful-menacing, not horror.
```

**battle-enemy-08.webp — 抹除者（最終關）**
```
The Eraser: a tall hooded figure of black ink smoke, facing RIGHT, completely FACELESS hood interior (dark void with faint teal edge — no eyes, matching the prologue), smoky lower body, holds a giant pale eraser block with a blue sleeve; golden dotted route lines fade where it passes; a glowing gold scroll shard in its other hand.
```

## 放入後檢查

1. 圖檔名稱與上表完全一致，放在 `assets/`。
2. 打開任一關進入戰鬥：插畫出現、SVG 消失；敵人在左面向右，守護員在右面向左。
3. 若主體太小或太大，裁切畫布或調整留白，不必改程式。
