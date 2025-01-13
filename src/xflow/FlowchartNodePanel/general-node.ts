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


export type GeneralIntlLocaleProps = {
    /**
     * @description Terminal
     * @description.zh-CN 终端
     * @description.zh-TW 終端
     */
    terminal?: string;

    /**
     * @description Process
     * @description.zh-CN 处理
     * @description.zh-TW 處理
     */
    process?: string;

    /**
     * @description Decision
     * @description.zh-CN 判断
     * @description.zh-TW 判斷
     */
    decision?: string;

    /**
     * @description Multi Document
     * @description.zh-CN 多文档
     * @description.zh-TW 多文檔
     */
    multiDocument?: string;

    /**
     * @description Connector
     * @description.zh-CN 连接
     * @description.zh-TW 連接
     */
    connector?: string;

    /**
     * @description Data IO
     * @description.zh-CN 数据输入输出
     * @description.zh-TW 數據輸入輸出
     */
    dataIo?: string;

    /**
     * @description Database
     * @description.zh-CN 数据库
     * @description.zh-TW 數據庫
     */
    database?: string;

    /**
     * @description Hard Disk
     * @description.zh-CN 硬盘
     * @description.zh-TW 硬盤
     */
    hardDisk?: string;

    /**
     * @description Stored Data
     * @description.zh-CN 数据存储
     * @description.zh-TW 數據存儲
     */
    stroedData?: string;

    /**
     * @description Document
     * @description.zh-CN 文档
     * @description.zh-TW 文檔
     */
    document?: string;

    /**
     * @description Predefined Process
     * @description.zh-CN 预定义处理
     * @description.zh-TW 預定義處理
     */
    predefinedProcess?: string;

    /**
     * @description Extract
     * @description.zh-CN 提取
     * @description.zh-TW 提取
     */
    extract?: string;

    /**
     * @description Merge
     * @description.zh-CN 合并
     * @description.zh-TW 合並
     */
    merge?: string;

    /**
     * @description Or
     * @description.zh-CN 或者
     * @description.zh-TW 或者
     */
    or?: string;

    /**
     * @description Manual Input
     * @description.zh-CN 手动输入
     * @description.zh-TW 手動輸入
     */
    manualInput?: string;

    /**
     * @description Preparation
     * @description.zh-CN 准备
     * @description.zh-TW 准備
     */
    preparation?: string;

    /**
     * @description Delay
     * @description.zh-CN 延迟
     * @description.zh-TW 延遲
     */
    delay?: string;

    /**
     * @description Manual Operation
     * @description.zh-CN 手动操作
     * @description.zh-TW 手動操作
     */
    manualOperation?: string;

    /**
     * @description Display
     * @description.zh-CN 显示
     * @description.zh-TW 顯示
     */
    display?: string;

    /**
     * @description Off Page Link
     * @description.zh-CN 外页链接
     * @description.zh-TW 外頁鏈接
     */
    offPageLink?: string;

    /**
     * @description Note Left
     * @description.zh-CN 左侧备注
     * @description.zh-TW 左側備注
     */
    noteLeft?: string;

    /**
     * @description Note Right
     * @description.zh-CN 右侧备注
     * @description.zh-TW 右側備注
     */
    noteRight?: string;

    /**
     * @description Internal Storage
     * @description.zh-CN 内部存储
     * @description.zh-TW 內部存儲
     */
    internalStorage?: string;

    /**
     * @description Text
     * @description.zh-CN 文本
     * @description.zh-TW 文本
     */
    text?: string;
};


export type GeneralNodeProps = {

    /**
     * @description The locale of the component, e.g. 'en_US'
     * @description.zh-CN 组件的语言, e.g. 'zh_CN'
     * @description.zh-TW 組件的語言, e.g. 'zh_TW'
     */
    locale?: string;

    /**
     * @description The props of locale
     * @description.zh-CN 多语言属性
     * @description.zh-TW 多語言屬性
     */
    localeProps?: GeneralIntlLocaleProps;
};

