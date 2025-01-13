/*
 * Copyright (c) 2025 Yookue Ltd. All rights reserved.
 *
 * Licensed under the MIT License (the "License")
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */


import {ReadonlyMultiKeyMap} from '@yookue/ts-multi-map';


export const intlLocales = ReadonlyMultiKeyMap.of([
    [['en_US', 'noneSelection'], 'None Selection'],
    [['zh_CN', 'noneSelection'], '未选中'],
    [['zh_TW', 'noneSelection'], '未選中'],

    [['en_US', 'title'], 'Title'],
    [['zh_CN', 'title'], '标题'],
    [['zh_TW', 'title'], '標題'],

    [['en_US', 'content'], 'Content'],
    [['zh_CN', 'content'], '内容'],
    [['zh_TW', 'content'], '內容'],

    [['en_US', 'label'], 'Label'],
    [['zh_CN', 'label'], '标签'],
    [['zh_TW', 'label'], '標簽'],

    [['en_US', 'style'], 'Style'],
    [['zh_CN', 'style'], '样式'],
    [['zh_TW', 'style'], '樣式'],

    [['en_US', 'line'], 'Line'],
    [['zh_CN', 'line'], '线'],
    [['zh_TW', 'line'], '線'],

    [['en_US', 'arrow'], 'Arrow'],
    [['zh_CN', 'arrow'], '箭头'],
    [['zh_TW', 'arrow'], '箭頭'],

    [['en_US', 'arrow.target'], 'Target'],
    [['zh_CN', 'arrow.target'], '正向'],
    [['zh_TW', 'arrow.target'], '正向'],

    [['en_US', 'arrow.source'], 'Source'],
    [['zh_CN', 'arrow.source'], '逆向'],
    [['zh_TW', 'arrow.source'], '逆向'],

    [['en_US', 'arrow.all'], 'All'],
    [['zh_CN', 'arrow.all'], '双向'],
    [['zh_TW', 'arrow.all'], '雙向'],

    [['en_US', 'arrow.none'], 'None'],
    [['zh_CN', 'arrow.none'], '无'],
    [['zh_TW', 'arrow.none'], '無'],

    [['en_US', 'linear'], 'Linear'],
    [['zh_CN', 'linear'], '线形'],
    [['zh_TW', 'linear'], '線形'],

    [['en_US', 'linear.solid'], 'Solid'],
    [['zh_CN', 'linear.solid'], '实线'],
    [['zh_TW', 'linear.solid'], '實線'],

    [['en_US', 'linear.dash'], 'Dash'],
    [['zh_CN', 'linear.dash'], '虚线'],
    [['zh_TW', 'linear.dash'], '虛線'],

    [['en_US', 'border'], 'Border'],
    [['zh_CN', 'border'], '边框'],
    [['zh_TW', 'border'], '邊框'],

    [['en_US', 'font'], 'Font'],
    [['zh_CN', 'font'], '字体'],
    [['zh_TW', 'font'], '字體'],

    [['en_US', 'fill'], 'Fill'],
    [['zh_CN', 'fill'], '填充'],
    [['zh_TW', 'fill'], '填充'],

    [['en_US', 'position'], 'Pos'],
    [['zh_CN', 'position'], '位置'],
    [['zh_TW', 'position'], '位置'],

    [['en_US', 'size'], 'Size'],
    [['zh_CN', 'size'], '尺寸'],
    [['zh_TW', 'size'], '尺寸'],
]);
