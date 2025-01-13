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
import {Collapse, Empty} from 'antd';
import {useIntl} from '@ant-design/pro-provider';
import {Addon, type Graph} from '@antv/x6';
import {XFlowNodeCommands, getNodeReactComponent, useXFlowApp, uuidv4, type NsGraph} from '@antv/xflow-core';
import {type IFlowchartNode} from '@antv/xflow-extension/es/flowchart-node-panel/interface';
import {type IBodyProps} from '@antv/xflow-extension/es/flowchart-node-panel/panel-body';
import {type ITreeNode} from '@antv/xflow-extension/es/canvas-node-tree-panel/interface';
import {getProps} from '@antv/xflow-extension/es/flowchart-canvas/utils';
import {NodeTitle, defaultNodeFactory} from '@antv/xflow-extension/es/canvas-node-tree-panel/panel-body';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import classNames from 'classnames';
import lodash from 'lodash';
import {intlLocales} from './intl-locales';


export type IntlLocaleProps = {
    /**
     * @description General
     * @description.zh-CN 常规
     * @description.zh-TW 常規
     */
    generalNode?: string;

    /**
     * @description Custom
     * @description.zh-CN 自定义
     * @description.zh-TW 自定義
     */
    customNode?: string;
};


export type NodePanelBodyProps = IBodyProps & {
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


export const NodePanelBody: React.FC<NodePanelBodyProps> = (props: NodePanelBodyProps) => {
    const intlType = useIntl();

    const {
        x6NodeFactory,
        dndOptions,
        state,
        prefixClz,
        defaultActiveKey = ['official', 'custom'],
        locale = intlType.locale,
    } = props;

    const registerNode = props.registerNode ? lodash.isArray(props.registerNode) ? props.registerNode : [props.registerNode] : [];

    const {graphProvider, modelService, commandService} = useXFlowApp();
    const [dnd, setDnd] = React.useState<Addon.Dnd>();

    const [graph, setGraph] = React.useState<Graph>();
    React.useEffect(() => {
        graphProvider.getGraphInstance().then((x6Graph: any) => {
            setGraph(x6Graph);
        });
    }, [graphProvider]);

    let graphConfig: any = undefined;
    graphProvider.getGraphOptions().then((x6GraphConfig: any) => {
        graphConfig = x6GraphConfig;
    });

    const onNodeDrop = React.useCallback(async (node: any) => {
        const {ports} = node;
        const nodeConfig = {
            ...node,
            id: `node-${uuidv4()}`,
            zIndex: 10,
            ports: {
                ...ports,
                items: ports.items?.map((item: any) => ({
                    ...item,
                    id: uuidv4(),
                })),
            }
        };
        const args = {nodeConfig};
        await commandService.executeCommand(XFlowNodeCommands.ADD_NODE.id, args);
        const onAddNode = getProps('onAddNode');
        if (typeof onAddNode === 'function') {
            onAddNode(nodeConfig);
        }
    }, [commandService]);

    React.useEffect(() => {
        if (!graph) {
            return;
        }
        const dndInstance = new Addon.Dnd({
            scaled: false,
            animation: false, ...dndOptions,
            target: graph,
            validateNode: async droppingNode => {
                const nodeConfig = {
                    ...droppingNode.getData<NsGraph.INodeConfig>(),
                    ...droppingNode.getPosition(),
                };
                await onNodeDrop(nodeConfig);
                return false;
            },
        });
        setDnd(dndInstance);
    }, [commandService, dndOptions, graph, modelService, onNodeDrop]);

    const onMouseDown = React.useCallback((nodeConfig: NsGraph.INodeConfig) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!graph || !dnd || !graphConfig) {
            return;
        }
        const renderKey = graphConfig.nodeTypeParser(nodeConfig);
        const {width = 180, height = 40} = nodeConfig;
        const reactComponent = graphConfig.nodeRender.get(renderKey);
        const wrappedComponent = getNodeReactComponent(reactComponent, commandService, modelService);
        const nodeData = {
            data: nodeConfig,
            width,
            height,
            view: graphConfig.graphId,
            component: wrappedComponent,
        };
        // @ts-ignore
        const x6Node = x6NodeFactory ? x6NodeFactory(nodeData) : defaultNodeFactory(nodeData);
        dnd.start(x6Node, event.nativeEvent as any);
    }, [commandService, dnd, graph, graphConfig, modelService, x6NodeFactory]);

    const renderTree = React.useCallback((list: IFlowchartNode[] = []) => {
        return list.map(item => {
            const {popoverContent} = item;
            return (
                <NodeTitle
                    key={item.id}
                    item={item as ITreeNode}
                    onMouseDown={onMouseDown(item)}
                    popoverContent={popoverContent}
                    prefixClz={prefixClz as string}
                    modelService={modelService}
                    commandService={commandService}
                    graphConfig={graphConfig}
                />
            );
        });
    }, [commandService, graphConfig, modelService, onMouseDown, prefixClz]);

    const officialNode = state.nodeList.filter(item => !item.isCustom);
    const searchOfficialNode = state.searchList.filter(item => !item.isCustom);
    const customNode = (key: string) => {
        return state.nodeList.filter(item => item.isCustom && item.parentKey === key);
    };
    const searchCustomNode = (key: string) => {
        return state.searchList.filter(item => item.isCustom && item.parentKey === key)
    };

    return (
        <React.Fragment>
            <div className={`${prefixClz}-body`}>
                <Collapse defaultActiveKey={defaultActiveKey} style={{border: 'none'}}>
                    <Collapse.Panel
                        key='official'
                        header={ObjectUtils.firstNotNil(props?.localeProps?.generalNode, intlLocales.get([locale, 'generalNode']), intlLocales.get(['en_US', 'generalNode']))}
                        style={{border: 'none'}}
                    >
                        {!state.keyword && (
                            <div className={`${prefixClz}-official`}>
                                {renderTree(officialNode)}
                            </div>
                        )}
                        {state.searchList.length > 0 && (
                            <div className={classNames(`${prefixClz}-official`, `${prefixClz}-official-search`)}>
                                {renderTree(searchOfficialNode)}
                            </div>
                        )}
                    </Collapse.Panel>
                    {registerNode?.length > 0 && registerNode.map(
                        item => !item.hidden && item.nodes.length > 0 && (
                            <Collapse.Panel
                                key={item.key}
                                header={ObjectUtils.firstNotNil(item.title, props?.localeProps?.customNode, intlLocales.get([locale, 'customNode']), intlLocales.get(['en_US', 'customNode']))}
                                style={{border: 'none'}}
                            >
                                {!state.keyword && (
                                    <div className={`${prefixClz}-custom`}>
                                        {renderTree(customNode(item.key))}
                                    </div>
                                )}
                                {state.searchList.length > 0 && (
                                    <div className={classNames(`${prefixClz}-custom`, `${prefixClz}-custom-search`)}>
                                        {renderTree(searchCustomNode(item.key))}
                                    </div>
                                )}
                            </Collapse.Panel>
                        )
                    )}
                </Collapse>
                {state.keyword && state.searchList.length === 0 && <Empty style={{marginTop: '48px'}}/>}
            </div>
        </React.Fragment>
    );
};
