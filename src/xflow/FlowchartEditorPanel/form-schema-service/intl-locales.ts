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
    [['en_US', 'settings'], 'Settings'],
    [['zh_CN', 'settings'], '设置'],
    [['zh_TW', 'settings'], '設置'],

    [['en_US', 'name'], 'Name'],
    [['zh_CN', 'name'], '名称'],
    [['zh_TW', 'name'], '名稱'],

    [['en_US', 'group'], 'Group'],
    [['zh_CN', 'group'], '分组'],
    [['zh_TW', 'group'], '分組'],

    [['en_US', 'node'], 'Node'],
    [['zh_CN', 'node'], '节点'],
    [['zh_TW', 'node'], '節點'],

    [['en_US', 'edge'], 'Edge'],
    [['zh_CN', 'edge'], '边'],
    [['zh_TW', 'edge'], '邊'],
]);
