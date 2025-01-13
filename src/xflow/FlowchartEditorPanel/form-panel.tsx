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
import {WorkspacePanel} from '@antv/xflow-extension/es/base-panel';
import {JsonSchemaForm, type NsJsonSchemaForm} from '@antv/xflow-extension/es/canvas-json-schema-form';
import {type IFlowchartFormPanelProps} from '@antv/xflow-extension/es/flowchart-editor-panel/interface';
import {CONTAINER_CLASS} from '@antv/xflow-extension/es/flowchart-editor-panel/form-panel';
import '@antv/xflow-extension/es/flowchart-editor-panel/style.less';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import {defaultControlMapService} from './control-map-service';
import {intlLocales} from './form-schema-service/intl-locales';



export type IntlLocaleProps = {
    /**
     * @description Settings
     * @description.zh-CN 设置
     * @description.zh-TW 設置
     */
    settings?: string;

    /**
     * @description Name
     * @description.zh-CN 名称
     * @description.zh-TW 名稱
     */
    name?: string;

    /**
     * @description Group
     * @description.zh-CN 分组
     * @description.zh-TW 分組
     */
    group?: string;

    /**
     * @description Node
     * @description.zh-CN 节点
     * @description.zh-TW 節點
     */
    node?: string;

    /**
     * @description Edge
     * @description.zh-CN 边
     * @description.zh-TW 邊
     */
    edge?: string;
};


export type FlowchartFormPanelProps = IFlowchartFormPanelProps & {
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


export const FlowchartFormPanel: React.FC<FlowchartFormPanelProps> = (props: FlowchartFormPanelProps) => {
    const intlType = useIntl();

    // Initialize the default props
    const {
        locale = intlType.locale,
    } = props ?? {};

    const defaultFormSchemaService: NsJsonSchemaForm.IFormSchemaService = async (args: any) => {
        const {targetType} = args;
        const isGroup = args.targetData?.isGroup;

        const groupSchema: NsJsonSchemaForm.ISchema = {
            tabs: [{
                name: ObjectUtils.firstNotNil(props?.localeProps?.settings, intlLocales.get([locale, 'settings']), intlLocales.get(['en_US', 'settings'])),
                groups: [{
                    name: 'groupName',
                    controls: [{
                        label: ObjectUtils.firstNotNil(props?.localeProps?.group, intlLocales.get([locale, 'group']), intlLocales.get(['en_US', 'group'])),
                        name: 'group-service',
                        shape: 'group-service',
                        placeholder: ObjectUtils.firstNotNil(props?.localeProps?.name, intlLocales.get([locale, 'name']), intlLocales.get(['en_US', 'name'])),
                    }]
                }]
            }]
        };

        const nodeSchema: NsJsonSchemaForm.ISchema = {
            tabs: [{
                name: ObjectUtils.firstNotNil(props?.localeProps?.settings, intlLocales.get([locale, 'settings']), intlLocales.get(['en_US', 'settings'])),
                groups: [{
                    name: 'groupName',
                    controls: [{
                        label: ObjectUtils.firstNotNil(props?.localeProps?.node, intlLocales.get([locale, 'node']), intlLocales.get(['en_US', 'node'])),
                        name: 'node-service',
                        shape: 'node-service',
                        placeholder: ObjectUtils.firstNotNil(props?.localeProps?.name, intlLocales.get([locale, 'name']), intlLocales.get(['en_US', 'name'])),
                    }]
                }]
            }]
        };

        const edgeSchema: NsJsonSchemaForm.ISchema = {
            tabs: [{
                name: ObjectUtils.firstNotNil(props?.localeProps?.settings, intlLocales.get([locale, 'settings']), intlLocales.get(['en_US', 'settings'])),
                groups: [{
                    name: 'groupName',
                    controls: [{
                        label: ObjectUtils.firstNotNil(props?.localeProps?.edge, intlLocales.get([locale, 'edge']), intlLocales.get(['en_US', 'edge'])),
                        name: 'edge-service',
                        shape: 'edge-service',
                        placeholder: ObjectUtils.firstNotNil(props?.localeProps?.name, intlLocales.get([locale, 'name']), intlLocales.get(['en_US', 'name'])),
                    }]
                }]
            }]
        };

        if (isGroup) {
            return groupSchema;
        }

        if (targetType === 'node') {
            return nodeSchema;
        }
        if (targetType === 'edge') {
            return edgeSchema;
        }

        return {
            tabs: [{
                name: ObjectUtils.firstNotNil(props?.localeProps?.settings, intlLocales.get([locale, 'settings']), intlLocales.get(['en_US', 'settings'])),
                groups: [{
                    name: 'groupName',
                    controls: [{
                        label: '',
                        name: 'canvas-service',
                        shape: 'canvas-service',
                    },],
                },],
            },],
        } as NsJsonSchemaForm.ISchema;
    };

    const {
        controlMapService = defaultControlMapService,
        formSchemaService = defaultFormSchemaService,
        position = {
            width: 240,
            top: 0,
            bottom: 0,
            right: 0
        },
        show = true,
        ...restProps
    } = props;

    if (!show) {
        return null;
    }

    const {width = 200, right} = position;
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <WorkspacePanel
            className={CONTAINER_CLASS}
            position={{
                ...position,
                right: !collapsed ? right : -width,
            }}
        >
            <div className={`${CONTAINER_CLASS}-wrapper`}>
                {/* @ts-ignore */}
                <JsonSchemaForm
                    targetType={['node', 'edge', 'canvas', 'group']}
                    controlMapService={controlMapService}
                    formSchemaService={formSchemaService}
                    position={{
                        ...position,
                        top: 0,
                    }}
                    prefixClz='xflow-form-editor'
                    {...restProps}
                />
                <div
                    className={`${CONTAINER_CLASS}-icon`}
                    style={{
                        top: 21,
                        left: !collapsed ? -10 : -20,
                        borderRadius: !collapsed ? '50%' : '50% 0 0  50%',
                        borderRight: !collapsed ? '' : 'none',
                    }}
                    onClick={() => {
                        setCollapsed(!collapsed);
                    }}
                >
                    {collapsed ? <DoubleLeftOutlined/> : <DoubleRightOutlined/>}
                </div>
            </div>
        </WorkspacePanel>
    );
};
