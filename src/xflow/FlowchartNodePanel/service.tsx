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
import {Disposable, MODELS, createComponentModel, useXFlowApp} from '@antv/xflow-core';
import {NsPanelData} from '@antv/xflow-extension/es/flowchart-node-panel/service';
import {type IProps, type IRegisterNode} from '@antv/xflow-extension/es/flowchart-node-panel/interface';
import lodash from 'lodash';
import {type GeneralIntlLocaleProps} from './general-node';
import {nodeService} from './utils';


const DefaultSearchService = async (nodes = [], keyword: string) => {
    // @ts-ignore
    return nodes.filter(i => i.isDirectory || i.label?.includes(keyword) || i.name?.includes(keyword) || i.alias?.includes(keyword));
};


export const usePanelData = (props: IProps, localeProps?: GeneralIntlLocaleProps) => {
    const {
        searchService = DefaultSearchService,
    } = props;

    const registerNode = (props.registerNode ? lodash.isArray(props.registerNode) ? props.registerNode : [props.registerNode] : []) as IRegisterNode[];

    let nodes: any[] = [];
    registerNode.forEach(item => {
        nodes = nodes.concat(item.nodes.map(node => ({
            ...node,
            parentKey: item.key,
        })));
    });

    const {modelService} = useXFlowApp();

    /** 使用 model */
    const [state, setState, panelModel] = createComponentModel<NsPanelData.IState>({
        searchList: [],
        nodeList: [],
        defaultExpandAll: false,
        keyword: '',
    });

    /** 注册成为全局状态，方便其他组件联动 */
    React.useEffect(() => {
        if (modelService.findDeferredModel(NsPanelData.id)) {
            return;
        }
        // @ts-ignore
        // noinspection JSUnusedGlobalSymbols
        modelService.registerModel<NsPanelData.IState>({
            id: NsPanelData.id,
            modelFactory: () => panelModel,
            watchChange: async (self: any) => {
                const metaModel = await MODELS.GRAPH_META.getModel(modelService);    //useContext(MODELS.GRAPH_META.id)
                const fetchNodes = async () => {
                    const listData = await nodeService(nodes, localeProps);
                    return {listData};
                };
                const graphMetaDisposable = metaModel.watch(async () => {
                    const data = await fetchNodes();
                    self.setValue({
                        nodeList: data.listData,
                        defaultExpandAll: false,
                        keyword: '',
                        searchList: [],
                    });
                });
                return Disposable.create(() => {
                    graphMetaDisposable.dispose();
                });
            },
        });
        /* eslint-disable-next-line */
    }, []);

    /** 搜索 */
    const onKeywordChange = React.useCallback(async (keyword: string) => {
        if (!searchService) {
            return;
        }
        if (keyword) {
            // @ts-ignore
            const list = await searchService(state.nodeList, keyword);
            setState(modelState => {
                modelState.keyword = keyword;
                modelState.searchList = list;
            });
        } else {
            setState(modelState => {
                modelState.keyword = '';
                modelState.searchList = [];
            });
        }
    }, [searchService, state.nodeList, setState]);

    return {
        state,
        setState,
        onKeywordChange,
    };
};
