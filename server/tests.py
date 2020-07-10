# coding=utf-8
# !/usr/bin/python

class Numbers(object):
    def __init__(self, numbers):
        # 初始化一个数组对象，这个对象包含四个待处理的数
        self.numbers = numbers

    # 获取输入元素的所有组合
    def combine(self, array, length):
        arr = []
        if length == 4:
            for i in array:
                for j in array:
                    for k in array:
                        for l in array:
                            arr.append([str(i), str(j), str(k), str(l)])
        elif length == 3:
            for i in array:
                for j in array:
                    for k in array:
                        arr.append([str(i), str(j), str(k)])
        return (arr)

    # 调用judge函数去除不符合要求的组合,
    # 比如：原数组是2 2 3 4，那么要求生成的数组满足：
    # 存在两个2，一个3和一个4，不能多也不能少
    def decrease(self, array):
        arr = []
        for i in range(len(array)):
            if self.judge(array[i]):
                arr.append(array[i])
        return (arr)

    # 对生成的数组进行排序，判定是否和原数组相等，
    def judge(self, array):
        tmp = sorted(array)
        if self.numbers == tmp:
            return (1)
        return (0)

    # 根据加减乘除的符号返回对应的运算函数
    # 在python中，函数也能作为返回值
    # 这里使用了lambda来定义匿名函数
    def fun(self, measure):
        if measure == '+':
            f = lambda x, y: x + y
        elif measure == '-':
            f = lambda x, y: x - y
        elif measure == '*':
            f = lambda x, y: x * y
        elif measure == '/':
            f = lambda x, y: x / y
        else:
            raise ValueError
        return (f)

    # 结合数组中的四个数字和运算法则，进行运算，判定结果是否等于24
    def figure(self, numbers, measures):
        # 这是一个三层递归调用，每一层的fun函数返回的函数都可能不一样，
        # 具体是什么取决于运算符号measure
        out = self.fun(measures[2])(
            self.fun(measures[1])(
                self.fun(measures[0])(
                    float(numbers[0])
                    , float(numbers[1]))
                , float(numbers[2]))
            , float(numbers[3]))
        if out == 24:
            return (1)
        else:
            return (0)

    # 过滤掉数组中重复的部分
    def screen(self, array):
        # 将array中重复的元素置空
        for i in range(len(array)):
            s = list(array)
            s[i] = ''
            if (array[i] in s):
                array[i] = ''
        # 定义一个临时数组tmp，放入array中非空的元素
        tmp = []
        for arr in array:
            if arr != '':
                tmp.append(arr)
        return (tmp)


if __name__ == '__main__':
    # 获取输入的四个数
    numbers = input('''
        Please input 4 numbers to calculate,
        these numbers are split by space ',' ';' and '-',
        which just looks like "1 2 3 4" .\n''')

    # 支持的分割符都在这个数组里
    char = [',', ';', '-', '\n']
    # 对char里的字符进行替换，以空格来分割numbers，
    # 得到包含所输4个数字的数组numbers
    # （这里似乎可以换个名字，不过本人习惯这么写了）
    for c in char:
        numbers = numbers.replace(c, ' ')
    numbers = (numbers.split(' '))

    # 对输入的数进行排序
    numbers.sort()
    # 给出一个Numbers对象的实例num并初始化
    num = Numbers(numbers)
    # 先得到四个数字的所有排列组合，再筛除那些不符合judge函数要求的组合
    subnumbers = num.decrease(num.combine(numbers, 4))

    # 定义包含加减乘除四个运算符的数组measures
    measures = ['+', '-', '*', '/']
    # 由于四则运算可以有重复的运算，所以不需要调用decrease函数来进行judge筛选
    submeasures = num.combine(measures, 3)

    # 定义一个数组arr来存放运算结果等于24的数字和运算符的组合
    arr = []
    for i in range(len(subnumbers)):
        for j in range(len(submeasures)):
            # 如果数字组合和四则运算符号组合的运算结果等于24，
            # 则把这两对组合存放到arr数组中
            if num.figure(subnumbers[i], submeasures[j]):
                arr.append('Pass: ((%s%s%s)%s%s)%s%s=24' % (
                    subnumbers[i][0], submeasures[j][0], subnumbers[i][1],
                    submeasures[j][1], subnumbers[i][2], submeasures[j][2],
                    subnumbers[i][3]))
    # 舍弃arr中重复的元素
    arr = num.screen(arr)

    # 将非空的组合打印到终端，否则提示不能计算出
    if arr != []:
        for a in arr:
            print(a)
    else:
        print('Sorry, this combination cannot be figured out.')
    # 终于结束了，有收获就点个赞吧 ^_^
    print('Finished')
    files = open('config.py')
    files.seek(0, 2)