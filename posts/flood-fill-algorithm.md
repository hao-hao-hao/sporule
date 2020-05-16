---
title: "Flood Fill Algorithm Explaination"
author: "Sporule"
date: "2020-05-16"
categories: "algorithm"
tags: "python,leetcode,flood fill"
coverImage: "https://i.imgur.com/tgtL2C0.png"
---

## What is Flood fill

Flood fill is a common algorithm question which you can see almost everywhere. This week's challenge in LeetCode is Flood Fill. 

The explanation from LeetCode:

> An image is represented by a 2-D array of integers, each integer representing the pixel value of the image (from 0 to 65535).
> 
> Given a coordinate (sr, sc) representing the starting pixel (row and column) of the flood fill, and a pixel value newColor, "flood fill" the image.
>
> To perform a "flood fill", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with the newColor.
> 
> At the end, return the modified image.
> 
> Example:
> ```python
> # Input:
> image = [[1,1,1],[1,1,0],[1,0,1]]
> sr = 1, sc = 1, newColor = 2
> # Output:
> [[2,2,2],[2,2,0],[2,0,1]]
> 
> """Explanation:
> # From the center of the image (with position (sr, sc) = (1, 1)), all pixels connected 
> by a path of the same color as the starting pixel are colored with the new color.
> Note the bottom corner is not colored 2, because it is not 4-directionally connected
> to the starting pixel."""
> ```

**Visualization**:

It starts from (1,1), the existing color is 1, and the new color is 2.

|     |     |     |
| --- | --- | --- |
| 1   | 1   | 1   |
| 1   | 1   | 0   |
| 1   | 0   | 1   |


The color in (1,1) will become 2

|     |         |     |
| --- | ------- | --- |
| 1   | 1       | 1   |
| 1   | 2 (new) | 0   |
| 1   | 0       | 1   |

Then it will check 4-directionally to see if they are the same color as the old color 1

|           |           |           |
| --------- | --------- | --------- |
| 1         | 1 (check) | 1         |
| 1 (check) | 2         | 0 (check) |
| 1         | 0 (check) | 1         |

Some of their color become new color 2 as well because their old color is 1

|         |         |     |
| ------- | ------- | --- |
| 1       | 2 (new) | 1   |
| 2 (new) | 2       | 0   |
| 1       | 0       | 1   |

Then it will check all 4-directionally to see if there are any other matches

|           |     |           |
| --------- | --- | --------- |
| 1 (check) | 2   | 1 (check) |
| 2         | 2   | 0         |
| 1 (check) | 0   | 1         |

Some of their color become new color 2 as well because their old color is 1

|         |     |         |
| ------- | --- | ------- |
| 2 (new) | 2   | 2 (new) |
| 2       | 2   | 0       |
| 2 (new) | 0   | 1       |

Then they will check again

|           |           |           |
| --------- | --------- | --------- |
| 2         | 2 (check) | 2         |
| 2 (check) | 2         | 0 (check) |
| 2         | 0 (check) | 1         |

If the algorithm discovered that none of the color is equal to the old color 1, the algorithm will stop

|     |     |     |
| --- | --- | --- |
| 2   | 2   | 2   |
| 2   | 2   | 0   |
| 2   | 0   | 1   |

## Python Implementation


```python
    def floodFill(self, image, sr, sc, newColor):
        # initiate function, for the purpose of identifying the color of the initial sr,sc
        selected_color = image[sr][sc]
        if selected_color != newColor:
            fill(image,sr,sc,selected_color,newColor)
        return image

    def fill(image,sr,sc,color,newColor):
        # recursive function to fill 4-directionally incrementally
        if sr<len(image) and sr>=0 and sc <len(image[0]) and sc>=0:
            print("checking",sr,sc)
            if image[sr][sc]==color:
                image[sr][sc] = newColor
                print("updated to new color:",sr,sc)
                printImage(image)
                fill(image,sr+1,sc,color,newColor)
                fill(image,sr-1,sc,color,newColor)
                fill(image,sr,sc+1,color,newColor)
                fill(image,sr,sc-1,color,newColor)

    def printImage(image):
        # helper method to print out the shape of the function
        print("image:")
        for x in range(len(image)):
            print(image[x])
```
