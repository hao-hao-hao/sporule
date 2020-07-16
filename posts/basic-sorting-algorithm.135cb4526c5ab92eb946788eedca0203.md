---
title: "Basic Sorting Algorithm"
author: "Sporule"
date: "2020-07-16"
categories: "algorithm"
tags: "python,sorting,algorithm"
coverimage: "https://miro.medium.com/max/10028/1*88XH9vXuPh82FZJSVIKXdg.jpeg"
---

## Basic Sorting Algorithm

Sorting Algorithms are the foundation of a developer, I refreshed my memory by implementing some basic sorting algorithm in python.
I didn't include any description but I hope the printing output and Google will help you to find the logic of these algorithms.


```python


# Bubble Sort

def bubble_sort(arr):
    print("Length of the array:",len(arr),arr)
    result=list(arr)
    for i in range(len(result)):
        for j in range(len(result)-i-1):
            if result[j]>result[j+1]:
                temp = result[j]
                result[j]=result[j+1]
                result[j+1]=temp
                print("step:",j,result)
        print("round:",i,result)
    return result
print(bubble_sort(test_input))

# Length of the array: 13 [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# step: 0 [2, 3, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# step: 1 [2, 2, 3, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# step: 2 [2, 2, 1, 3, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# step: 4 [2, 2, 1, 3, 2, 3, 1, 2, 3, 102, -1, -2, 0]
# step: 5 [2, 2, 1, 3, 2, 1, 3, 2, 3, 102, -1, -2, 0]
# step: 6 [2, 2, 1, 3, 2, 1, 2, 3, 3, 102, -1, -2, 0]
# step: 9 [2, 2, 1, 3, 2, 1, 2, 3, 3, -1, 102, -2, 0]
# step: 10 [2, 2, 1, 3, 2, 1, 2, 3, 3, -1, -2, 102, 0]
# step: 11 [2, 2, 1, 3, 2, 1, 2, 3, 3, -1, -2, 0, 102]
# round: 0 [2, 2, 1, 3, 2, 1, 2, 3, 3, -1, -2, 0, 102]
# step: 1 [2, 1, 2, 3, 2, 1, 2, 3, 3, -1, -2, 0, 102]
# step: 3 [2, 1, 2, 2, 3, 1, 2, 3, 3, -1, -2, 0, 102]
# step: 4 [2, 1, 2, 2, 1, 3, 2, 3, 3, -1, -2, 0, 102]
# step: 5 [2, 1, 2, 2, 1, 2, 3, 3, 3, -1, -2, 0, 102]
# step: 8 [2, 1, 2, 2, 1, 2, 3, 3, -1, 3, -2, 0, 102]
# step: 9 [2, 1, 2, 2, 1, 2, 3, 3, -1, -2, 3, 0, 102]
# step: 10 [2, 1, 2, 2, 1, 2, 3, 3, -1, -2, 0, 3, 102]
# round: 1 [2, 1, 2, 2, 1, 2, 3, 3, -1, -2, 0, 3, 102]
# step: 0 [1, 2, 2, 2, 1, 2, 3, 3, -1, -2, 0, 3, 102]
# step: 3 [1, 2, 2, 1, 2, 2, 3, 3, -1, -2, 0, 3, 102]
# step: 7 [1, 2, 2, 1, 2, 2, 3, -1, 3, -2, 0, 3, 102]
# step: 8 [1, 2, 2, 1, 2, 2, 3, -1, -2, 3, 0, 3, 102]
# step: 9 [1, 2, 2, 1, 2, 2, 3, -1, -2, 0, 3, 3, 102]
# round: 2 [1, 2, 2, 1, 2, 2, 3, -1, -2, 0, 3, 3, 102]
# step: 2 [1, 2, 1, 2, 2, 2, 3, -1, -2, 0, 3, 3, 102]
# step: 6 [1, 2, 1, 2, 2, 2, -1, 3, -2, 0, 3, 3, 102]
# step: 7 [1, 2, 1, 2, 2, 2, -1, -2, 3, 0, 3, 3, 102]
# step: 8 [1, 2, 1, 2, 2, 2, -1, -2, 0, 3, 3, 3, 102]
# round: 3 [1, 2, 1, 2, 2, 2, -1, -2, 0, 3, 3, 3, 102]
# step: 1 [1, 1, 2, 2, 2, 2, -1, -2, 0, 3, 3, 3, 102]
# step: 5 [1, 1, 2, 2, 2, -1, 2, -2, 0, 3, 3, 3, 102]
# step: 6 [1, 1, 2, 2, 2, -1, -2, 2, 0, 3, 3, 3, 102]
# step: 7 [1, 1, 2, 2, 2, -1, -2, 0, 2, 3, 3, 3, 102]
# round: 4 [1, 1, 2, 2, 2, -1, -2, 0, 2, 3, 3, 3, 102]
# step: 4 [1, 1, 2, 2, -1, 2, -2, 0, 2, 3, 3, 3, 102]
# step: 5 [1, 1, 2, 2, -1, -2, 2, 0, 2, 3, 3, 3, 102]
# step: 6 [1, 1, 2, 2, -1, -2, 0, 2, 2, 3, 3, 3, 102]
# round: 5 [1, 1, 2, 2, -1, -2, 0, 2, 2, 3, 3, 3, 102]
# step: 3 [1, 1, 2, -1, 2, -2, 0, 2, 2, 3, 3, 3, 102]
# step: 4 [1, 1, 2, -1, -2, 2, 0, 2, 2, 3, 3, 3, 102]
# step: 5 [1, 1, 2, -1, -2, 0, 2, 2, 2, 3, 3, 3, 102]
# round: 6 [1, 1, 2, -1, -2, 0, 2, 2, 2, 3, 3, 3, 102]
# step: 2 [1, 1, -1, 2, -2, 0, 2, 2, 2, 3, 3, 3, 102]
# step: 3 [1, 1, -1, -2, 2, 0, 2, 2, 2, 3, 3, 3, 102]
# step: 4 [1, 1, -1, -2, 0, 2, 2, 2, 2, 3, 3, 3, 102]
# round: 7 [1, 1, -1, -2, 0, 2, 2, 2, 2, 3, 3, 3, 102]
# step: 1 [1, -1, 1, -2, 0, 2, 2, 2, 2, 3, 3, 3, 102]
# step: 2 [1, -1, -2, 1, 0, 2, 2, 2, 2, 3, 3, 3, 102]
# step: 3 [1, -1, -2, 0, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# round: 8 [1, -1, -2, 0, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# step: 0 [-1, 1, -2, 0, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# step: 1 [-1, -2, 1, 0, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# step: 2 [-1, -2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# round: 9 [-1, -2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# step: 0 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# round: 10 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# round: 11 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# round: 12 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]

# Selection Sort
def selection_sort(arr):
    print("Length of the array:",len(arr),arr)
    result=list(arr)
    for i in range(len(result)):
        max_index = 0
        for j in range(len(result)-i):
            if result[j]>result[max_index]:
                max_index=j
                print("new max:",result[max_index])
        temp=result[max_index]
        result[max_index]=result[-i-1]
        result[-i-1]= temp
        print("round:",i,"max:",result[-i-1],result)
    return result
print(selection_sort(test_input))


# Length of the array: 13 [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# new max: 102
# round: 0 max: 102 [3, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, -2, 102]
# round: 1 max: 3 [-2, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, 3, 102]
# new max: 2
# new max: 3
# round: 2 max: 3 [-2, 2, 2, 1, -1, 2, 1, 2, 3, 0, 3, 3, 102]
# new max: 2
# new max: 3
# round: 3 max: 3 [-2, 2, 2, 1, -1, 2, 1, 2, 0, 3, 3, 3, 102]
# new max: 2
# round: 4 max: 2 [-2, 0, 2, 1, -1, 2, 1, 2, 2, 3, 3, 3, 102]
# new max: 0
# new max: 2
# round: 5 max: 2 [-2, 0, 2, 1, -1, 2, 1, 2, 2, 3, 3, 3, 102]
# new max: 0
# new max: 2
# round: 6 max: 2 [-2, 0, 1, 1, -1, 2, 2, 2, 2, 3, 3, 3, 102]
# new max: 0
# new max: 1
# new max: 2
# round: 7 max: 2 [-2, 0, 1, 1, -1, 2, 2, 2, 2, 3, 3, 3, 102]
# new max: 0
# new max: 1
# round: 8 max: 1 [-2, 0, -1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# new max: 0
# new max: 1
# round: 9 max: 1 [-2, 0, -1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# new max: 0
# round: 10 max: 0 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# new max: -1
# round: 11 max: -1 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# round: 12 max: -2 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]

# Insertion Sort
def insertion_sort(arr):
    print("Length of the array:",len(arr),arr)
    result=list(arr)
    for i in range(len(result)):
        j=i
        value = result[i]
        while j>=1 and value < result[j-1]:
            result[j]=result[j-1]
            j-=1
        result[j]=value         
        print("round:",i,"value:",value,result)
    return result
print(insertion_sort(test_input))

# Length of the array: 13 [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 0 value: 3 [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 1 value: 2 [2, 3, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 2 value: 2 [2, 2, 3, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 3 value: 1 [1, 2, 2, 3, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 4 value: 3 [1, 2, 2, 3, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 5 value: 2 [1, 2, 2, 2, 3, 3, 1, 2, 3, 102, -1, -2, 0]
# round: 6 value: 1 [1, 1, 2, 2, 2, 3, 3, 2, 3, 102, -1, -2, 0]
# round: 7 value: 2 [1, 1, 2, 2, 2, 2, 3, 3, 3, 102, -1, -2, 0]
# round: 8 value: 3 [1, 1, 2, 2, 2, 2, 3, 3, 3, 102, -1, -2, 0]
# round: 9 value: 102 [1, 1, 2, 2, 2, 2, 3, 3, 3, 102, -1, -2, 0]
# round: 10 value: -1 [-1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102, -2, 0]
# round: 11 value: -2 [-2, -1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102, 0]
# round: 12 value: 0 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]

# Shell Sort
def shell_sort(arr):
    print("Length of the array:",len(arr),arr)
    result=list(arr)
    gap = len(result)//2
    while gap >=1:
        for i in range(gap,len(arr)):
            j=i
            value = result[i]
            while j>= gap and value < result[j-gap]:
                result[j]=result[j-gap]
                j-=gap
            result[j]=value
            print("gap:",gap,"round:",i,"value:",value,result)
        # update segment
        gap //=2
    return result
print(shell_sort(test_input))


# Length of the array: 11 [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1]
# gap: 5 round: 5 value: 4 [4, 8, 7, 6, 5, 9, 3, 2, 1, 0, -1]
# gap: 5 round: 6 value: 3 [4, 3, 7, 6, 5, 9, 8, 2, 1, 0, -1]
# gap: 5 round: 7 value: 2 [4, 3, 2, 6, 5, 9, 8, 7, 1, 0, -1]
# gap: 5 round: 8 value: 1 [4, 3, 2, 1, 5, 9, 8, 7, 6, 0, -1]
# gap: 5 round: 9 value: 0 [4, 3, 2, 1, 0, 9, 8, 7, 6, 5, -1]
# gap: 5 round: 10 value: -1 [-1, 3, 2, 1, 0, 4, 8, 7, 6, 5, 9]
# gap: 2 round: 2 value: 2 [-1, 3, 2, 1, 0, 4, 8, 7, 6, 5, 9]
# gap: 2 round: 3 value: 1 [-1, 1, 2, 3, 0, 4, 8, 7, 6, 5, 9]
# gap: 2 round: 4 value: 0 [-1, 1, 0, 3, 2, 4, 8, 7, 6, 5, 9]
# gap: 2 round: 5 value: 4 [-1, 1, 0, 3, 2, 4, 8, 7, 6, 5, 9]
# gap: 2 round: 6 value: 8 [-1, 1, 0, 3, 2, 4, 8, 7, 6, 5, 9]
# gap: 2 round: 7 value: 7 [-1, 1, 0, 3, 2, 4, 8, 7, 6, 5, 9]
# gap: 2 round: 8 value: 6 [-1, 1, 0, 3, 2, 4, 6, 7, 8, 5, 9]
# gap: 2 round: 9 value: 5 [-1, 1, 0, 3, 2, 4, 6, 5, 8, 7, 9]
# gap: 2 round: 10 value: 9 [-1, 1, 0, 3, 2, 4, 6, 5, 8, 7, 9]
# gap: 1 round: 1 value: 1 [-1, 1, 0, 3, 2, 4, 6, 5, 8, 7, 9]
# gap: 1 round: 2 value: 0 [-1, 0, 1, 3, 2, 4, 6, 5, 8, 7, 9]
# gap: 1 round: 3 value: 3 [-1, 0, 1, 3, 2, 4, 6, 5, 8, 7, 9]
# gap: 1 round: 4 value: 2 [-1, 0, 1, 2, 3, 4, 6, 5, 8, 7, 9]
# gap: 1 round: 5 value: 4 [-1, 0, 1, 2, 3, 4, 6, 5, 8, 7, 9]
# gap: 1 round: 6 value: 6 [-1, 0, 1, 2, 3, 4, 6, 5, 8, 7, 9]
# gap: 1 round: 7 value: 5 [-1, 0, 1, 2, 3, 4, 5, 6, 8, 7, 9]
# gap: 1 round: 8 value: 8 [-1, 0, 1, 2, 3, 4, 5, 6, 8, 7, 9]
# gap: 1 round: 9 value: 7 [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# gap: 1 round: 10 value: 9 [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Merge Sort
def merge_sort(arr):
    if len(arr)>1:
        print("sorting:",arr)
        left_arr = arr[:len(arr)//2]
        right_arr = arr[len(arr)//2:]
        merge_sort(left_arr)
        merge_sort(right_arr)
        
        l=r=i=0
        
        while i<len(arr):
            l_av = l<len(left_arr)
            r_av = r<len(right_arr)
            if l_av and not r_av:
                arr[i]= left_arr[l]
                l+=1
            elif r_av and not l_av:
                arr[i]=right_arr[r]
                r+=1
            elif left_arr[l]<right_arr[r]:
                arr[i]=left_arr[l]
                l+=1
            else:
                arr[i]= right_arr[r]
                r+=1
            i+=1
            print("round:",i,"l:",l,"r:",r,arr)
        return arr

input_copy = list(test_input)
print("Length of the array:",len(input_copy),input_copy)
print(merge_sort(input_copy))

Length of the array: 13 [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# sorting: [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# sorting: [3, 2, 2, 1, 3, 2]
# sorting: [3, 2, 2]
# sorting: [2, 2]
# round: 1 l: 0 r: 1 [2, 2]
# round: 2 l: 1 r: 1 [2, 2]
# round: 1 l: 0 r: 1 [2, 2, 2]
# round: 2 l: 0 r: 2 [2, 2, 2]
# round: 3 l: 1 r: 2 [2, 2, 3]
# sorting: [1, 3, 2]
# sorting: [3, 2]
# round: 1 l: 0 r: 1 [2, 2]
# round: 2 l: 1 r: 1 [2, 3]
# round: 1 l: 1 r: 0 [1, 3, 2]
# round: 2 l: 1 r: 1 [1, 2, 2]
# round: 3 l: 1 r: 2 [1, 2, 3]
# round: 1 l: 0 r: 1 [1, 2, 2, 1, 3, 2]
# round: 2 l: 0 r: 2 [1, 2, 2, 1, 3, 2]
# round: 3 l: 1 r: 2 [1, 2, 2, 1, 3, 2]
# round: 4 l: 2 r: 2 [1, 2, 2, 2, 3, 2]
# round: 5 l: 2 r: 3 [1, 2, 2, 2, 3, 2]
# round: 6 l: 3 r: 3 [1, 2, 2, 2, 3, 3]
# sorting: [1, 2, 3, 102, -1, -2, 0]
# sorting: [1, 2, 3]
# sorting: [2, 3]
# round: 1 l: 1 r: 0 [2, 3]
# round: 2 l: 1 r: 1 [2, 3]
# round: 1 l: 1 r: 0 [1, 2, 3]
# round: 2 l: 1 r: 1 [1, 2, 3]
# round: 3 l: 1 r: 2 [1, 2, 3]
# sorting: [102, -1, -2, 0]
# sorting: [102, -1]
# round: 1 l: 0 r: 1 [-1, -1]
# round: 2 l: 1 r: 1 [-1, 102]
# sorting: [-2, 0]
# round: 1 l: 1 r: 0 [-2, 0]
# round: 2 l: 1 r: 1 [-2, 0]
# round: 1 l: 0 r: 1 [-2, -1, -2, 0]
# round: 2 l: 1 r: 1 [-2, -1, -2, 0]
# round: 3 l: 1 r: 2 [-2, -1, 0, 0]
# round: 4 l: 2 r: 2 [-2, -1, 0, 102]
# round: 1 l: 0 r: 1 [-2, 2, 3, 102, -1, -2, 0]
# round: 2 l: 0 r: 2 [-2, -1, 3, 102, -1, -2, 0]
# round: 3 l: 0 r: 3 [-2, -1, 0, 102, -1, -2, 0]
# round: 4 l: 1 r: 3 [-2, -1, 0, 1, -1, -2, 0]
# round: 5 l: 2 r: 3 [-2, -1, 0, 1, 2, -2, 0]
# round: 6 l: 3 r: 3 [-2, -1, 0, 1, 2, 3, 0]
# round: 7 l: 3 r: 4 [-2, -1, 0, 1, 2, 3, 102]
# round: 1 l: 0 r: 1 [-2, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 2 l: 0 r: 2 [-2, -1, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 3 l: 0 r: 3 [-2, -1, 0, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 4 l: 0 r: 4 [-2, -1, 0, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 5 l: 1 r: 4 [-2, -1, 0, 1, 1, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 6 l: 1 r: 5 [-2, -1, 0, 1, 1, 2, 1, 2, 3, 102, -1, -2, 0]
# round: 7 l: 2 r: 5 [-2, -1, 0, 1, 1, 2, 2, 2, 3, 102, -1, -2, 0]
# round: 8 l: 3 r: 5 [-2, -1, 0, 1, 1, 2, 2, 2, 3, 102, -1, -2, 0]
# round: 9 l: 4 r: 5 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 102, -1, -2, 0]
# round: 10 l: 4 r: 6 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, -1, -2, 0]
# round: 11 l: 5 r: 6 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, -2, 0]
# round: 12 l: 6 r: 6 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 0]
# round: 13 l: 6 r: 7 [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]
# [-2, -1, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 102]

# Quick Sort
def quick_sort(arr):
    if len(arr) < 2:
        return
    i=1
    j=len(arr)-1
    pivot = 0
    print("sorting arr:",arr,"pivot:",arr[0],"i,j:",i,j,"length:",len(arr),arr)
    while(i!=j):
        while arr[i]<=arr[pivot] and i<j:
            i+=1
        print("found i bigger than pivot",i)
        while arr[j]>=arr[pivot] and i<j:
            j-=1
        print("found j smaller than pivot",j)
        if i<j:
            temp = arr[i]
            arr[i]=arr[j]
            arr[j]=temp
            print("swapped i and j",arr)
    #i==j
    if arr[i]<arr[pivot]:
        temp=arr[i]
        arr[i]=arr[pivot]
        arr[pivot]=temp
    print("swap pivot:",arr,"left:",arr[i:],"right:",arr[:i])
    if len(arr)/2 > 1:
        quick_sort(arr[:i])
        quick_sort(arr[i:])
    return arr

print("Length of the array:",len(test_input),test_input)
print(quick_sort(test_input))

# Length of the array: 13 [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# sorting arr: [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0] pivot: 3 i,j: 1 12 length: 13 [3, 2, 2, 1, 3, 2, 1, 2, 3, 102, -1, -2, 0]
# found i bigger than pivot 9
# found j smaller than pivot 12
# swapped i and j [3, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, -2, 102]
# found i bigger than pivot 12
# found j smaller than pivot 12
# swap pivot: [3, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, -2, 102] left: [102] right: [3, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, -2]
# sorting arr: [3, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, -2] pivot: 3 i,j: 1 11 length: 12 [3, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, -2]
# found i bigger than pivot 11
# found j smaller than pivot 11
# swap pivot: [-2, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, 3] left: [3] right: [-2, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1]
# sorting arr: [-2, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1] pivot: -2 i,j: 1 10 length: 11 [-2, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1]
# found i bigger than pivot 1
# found j smaller than pivot 1
# swap pivot: [-2, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1] left: [2, 2, 1, 3, 2, 1, 2, 3, 0, -1] right: [-2]
# sorting arr: [2, 2, 1, 3, 2, 1, 2, 3, 0, -1] pivot: 2 i,j: 1 9 length: 10 [2, 2, 1, 3, 2, 1, 2, 3, 0, -1]
# found i bigger than pivot 3
# found j smaller than pivot 9
# swapped i and j [2, 2, 1, -1, 2, 1, 2, 3, 0, 3]
# found i bigger than pivot 7
# found j smaller than pivot 8
# swapped i and j [2, 2, 1, -1, 2, 1, 2, 0, 3, 3]
# found i bigger than pivot 8
# found j smaller than pivot 8
# swap pivot: [2, 2, 1, -1, 2, 1, 2, 0, 3, 3] left: [3, 3] right: [2, 2, 1, -1, 2, 1, 2, 0]
# sorting arr: [2, 2, 1, -1, 2, 1, 2, 0] pivot: 2 i,j: 1 7 length: 8 [2, 2, 1, -1, 2, 1, 2, 0]
# found i bigger than pivot 7
# found j smaller than pivot 7
# swap pivot: [0, 2, 1, -1, 2, 1, 2, 2] left: [2] right: [0, 2, 1, -1, 2, 1, 2]
# sorting arr: [0, 2, 1, -1, 2, 1, 2] pivot: 0 i,j: 1 6 length: 7 [0, 2, 1, -1, 2, 1, 2]
# found i bigger than pivot 1
# found j smaller than pivot 3
# swapped i and j [0, -1, 1, 2, 2, 1, 2]
# found i bigger than pivot 2
# found j smaller than pivot 2
# swap pivot: [0, -1, 1, 2, 2, 1, 2] left: [1, 2, 2, 1, 2] right: [0, -1]
# sorting arr: [0, -1] pivot: 0 i,j: 1 1 length: 2 [0, -1]
# swap pivot: [-1, 0] left: [0] right: [-1]
# sorting arr: [1, 2, 2, 1, 2] pivot: 1 i,j: 1 4 length: 5 [1, 2, 2, 1, 2]
# found i bigger than pivot 1
# found j smaller than pivot 1
# swap pivot: [1, 2, 2, 1, 2] left: [2, 2, 1, 2] right: [1]
# sorting arr: [2, 2, 1, 2] pivot: 2 i,j: 1 3 length: 4 [2, 2, 1, 2]
# found i bigger than pivot 3
# found j smaller than pivot 3
# swap pivot: [2, 2, 1, 2] left: [2] right: [2, 2, 1]
# sorting arr: [2, 2, 1] pivot: 2 i,j: 1 2 length: 3 [2, 2, 1]
# found i bigger than pivot 2
# found j smaller than pivot 2
# swap pivot: [1, 2, 2] left: [2] right: [1, 2]
# sorting arr: [1, 2] pivot: 1 i,j: 1 1 length: 2 [1, 2]
# swap pivot: [1, 2] left: [2] right: [1]
# sorting arr: [3, 3] pivot: 3 i,j: 1 1 length: 2 [3, 3]
# swap pivot: [3, 3] left: [3] right: [3]
# [3, 2, 2, 1, 3, 2, 1, 2, 3, 0, -1, -2, 102]

```





