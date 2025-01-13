/*
 * Copyright (c) 2025 Yookue Ltd. All rights reserved.
 *
 * Licensed under the MIT License.
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


import React from 'react';
import {Input} from 'antd';
import {useIntl} from '@ant-design/pro-provider';
import {type IProps} from '@antv/xflow-extension/es/flowchart-node-panel/interface';
import {type IHeaderProps} from '@antv/xflow-extension/es/flowchart-node-panel/panel-header';
import {usePanelContext} from '@antv/xflow-extension/es/base-panel/context';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import {intlLocales} from './intl-locales';


export type IntlLocaleProps = {
    /**
     * @description Search Node
     * @description.zh-CN 搜索节点
     * @description.zh-TW 搜索節點
     */
    searchNode?: string;
};


export type NodePanelHeaderProps = IHeaderProps & {
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
    localeProps?: IntlLocaleProps;
};


export const NodePanelHeader: React.FC<NodePanelHeaderProps> = (props?: NodePanelHeaderProps) => {
    const intlType = useIntl();

    const {
        prefixClz,
        locale = intlType.locale,
    } = props ?? {};

    const {propsProxy} = usePanelContext<IProps>();
    const panelProps = propsProxy.getValue();

    return (
        <React.Fragment>
            <div
                className={`${prefixClz}-header`}
                style={{
                    zIndex: 1,
                    ...props?.style,
                }}
            >
                {panelProps.header && React.isValidElement(panelProps.header)}
                <div className={`${prefixClz}-header-search`}>
                    <Input
                        allowClear={true}
                        placeholder={ObjectUtils.firstNotNil(props?.localeProps?.searchNode, intlLocales.get([locale, 'searchNode']), intlLocales.get(['en_US', 'searchNode']))}
                        style={{
                            width: '100%',
                            border: 0,
                        }}
                        onChange={(event) => {
                            props?.onKeywordChange?.(event.target.value);
                        }}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
