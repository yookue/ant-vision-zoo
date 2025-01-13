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
import {DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';
import {useIntl} from '@ant-design/pro-provider';
import {useXflowPrefixCls} from '@antv/xflow-core';
import {WorkspacePanel} from '@antv/xflow-extension/es/base-panel';
import {type IPanelProps} from '@antv/xflow-extension/es/canvas-node-tree-panel/interface';
import {usePanelLyaoutStyle} from '@antv/xflow-extension/es/canvas-node-tree-panel/utils';
import {type IProps} from '@antv/xflow-extension/es/flowchart-node-panel/interface';
import {registerCustomNode} from '@antv/xflow-extension/es/flowchart-node-panel/utils';
import {CONTAINER_CLASS, NODEPOOL, PANEL_HEADER_HEIGHT} from '@antv/xflow-extension/es/flowchart-node-panel/constants';
import '@antv/xflow-extension/es/flowchart-node-panel/style/index.less';
import {ObjectUtils, StringUtils} from '@yookue/ts-lang-utils';
import lodash from 'lodash';
import omit from 'rc-util/es/omit';
import {type GeneralNodeProps} from './general-node';
import {NodePanelHeader, type NodePanelHeaderProps} from './panel-header';
import {NodePanelBody, type NodePanelBodyProps} from './panel-body';
import {usePanelData} from './service';
import {intlLocales} from './intl-locales';
import './index.less';


export type FlowchartNodePanelProps = IProps & {
    /**
     * @description The props of the general nodes
     * @description.zh-CN 常规节点的属性
     * @description.zh-TW 常規節點的屬性
     */
    generalNodeProps?: GeneralNodeProps;

    /**
     * @description The props of the header panel
     * @description.zh-CN 头部面板的属性
     * @description.zh-TW 頭部面板的屬性
     */
    panelHeaderProps?: Pick<NodePanelHeaderProps, 'locale' | 'localeProps'>;

    /**
     * @description The props of the body panel
     * @description.zh-CN 内容面板的属性
     * @description.zh-TW 內容面板的屬性
     */
    panelBodyProps?: Pick<NodePanelBodyProps, 'locale' | 'localeProps'>;

    /**
     * @description The locale of the component, e.g. 'en_US'
     * @description.zh-CN 组件的语言, e.g. 'zh_CN'
     * @description.zh-TW 組件的語言, e.g. 'zh_TW'
     */
    locale?: string;
};


const NodePanelWrapper: React.FC<FlowchartNodePanelProps> = (props: FlowchartNodePanelProps) => {
    const intlType = useIntl();

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        prefixClz,
        position = {
            width: 240,
            top: 0,
            bottom: 0,
            left: 0
        },
        showHeader = true,
        locale = intlType.locale,
        ...restProps
    } = props;

    const {width = 200} = position;
    const omitRawProps = omit(props, ['generalNodeProps', 'panelHeaderProps', 'panelBodyProps', 'locale']);
    const {headerStyle, bodyStyle} = usePanelLyaoutStyle(omitRawProps as IPanelProps);

    const nodeLocales = {};
    NODEPOOL.forEach(item => {
        const nameAlias = StringUtils.toCamelCase(item.name.replace(/\s+/g, ''));
        const nameValue = ObjectUtils.getProp(props?.generalNodeProps?.localeProps, nameAlias);
        Object.assign(nodeLocales, {
            [`${nameAlias}`]: ObjectUtils.firstNotNil(nameValue, intlLocales.get([locale, nameAlias as string]), intlLocales.get(['en_US', nameAlias as string])),
        });
    });

    const {state, onKeywordChange} = usePanelData(omitRawProps, nodeLocales);

    return (
        <>
            {showHeader && (
                <WorkspacePanel
                    {...restProps}
                    position={{
                        top: 0,
                        left: 0,
                        height: PANEL_HEADER_HEIGHT,
                        width,
                    }}
                >
                    <NodePanelHeader
                        {...omitRawProps}
                        state={state}
                        style={headerStyle}
                        locale={props.panelHeaderProps?.locale ?? locale}
                        localeProps={props.panelHeaderProps?.localeProps}
                        onKeywordChange={onKeywordChange}
                    />
                </WorkspacePanel>
            )}
            <WorkspacePanel
                {...restProps}
                className={`${CONTAINER_CLASS}-nodes`}
                position={{
                    ...position,
                    top: showHeader ? PANEL_HEADER_HEIGHT : 0,
                }}
            >
                <NodePanelBody
                    {...omitRawProps}
                    state={state}
                    style={bodyStyle}
                    locale={props.panelBodyProps?.locale ?? locale}
                    localeProps={props.panelBodyProps?.localeProps}
                />
            </WorkspacePanel>
        </>
    );
};


export const FlowchartNodePanel: React.FC<FlowchartNodePanelProps> = (props: FlowchartNodePanelProps) => {
    const {
        show = true,
        position = {
            width: 240,
            top: 40,
            bottom: 0,
            left: 0,
        },
        ...restProps
    } = props;

    if (!show) {
        return null;
    }

    registerCustomNode(lodash.get(props, 'registerNode'));

    const prefixClz = useXflowPrefixCls('node-panel');
    const [collapsed, setCollapsed] = React.useState(false);
    const {width = 200, left} = position;
    const omitRestProps = !restProps ? {} : omit(restProps, ['generalNodeProps', 'panelHeaderProps', 'panelBodyProps', 'locale']);

    return (
        <WorkspacePanel
            className={CONTAINER_CLASS}
            position={{
                ...position,
                left: !collapsed ? left : -width,
            }}
        >
            <div className={`${CONTAINER_CLASS}-wrapper`}>
                <WorkspacePanel
                    {...omitRestProps}
                    className={prefixClz}
                    position={{
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <NodePanelWrapper {...props} prefixClz={prefixClz} position={position}/>
                </WorkspacePanel>
                <div
                    className={`${CONTAINER_CLASS}-icon`}
                    style={{
                        top: 21,
                        right: !collapsed ? -10 : -20,
                        borderRadius: !collapsed ? '50%' : '0 50% 50% 0',
                        borderLeft: !collapsed ? '' : 'none',
                    }}
                    onClick={() => {
                        setCollapsed(!collapsed);
                    }}
                >
                    {collapsed ? <DoubleRightOutlined/> : <DoubleLeftOutlined/>}
                </div>
            </div>
        </WorkspacePanel>
    );
};
