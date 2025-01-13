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


import {uuidv4} from '@antv/xflow-core';
import {NODEPOOL, NODE_WIDTH, NODE_HEIGHT} from '@antv/xflow-extension/es/flowchart-node-panel/constants';
import {getRegisterNode} from '@antv/xflow-extension/es/flowchart-node-panel/utils';
import {ObjectUtils, StringUtils} from '@yookue/ts-lang-utils';
import {type GeneralIntlLocaleProps} from './general-node';


export const getAnchorStyle = (position: string) => {
    return {
        position: {
            name: position,
        },
        attrs: {
            circle: {
                r: 4,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
                style: {
                    visibility: 'hidden',
                }
            }
        },
        zIndex: 10,
    };
};


export const getPorts = (position = ['top', 'right', 'bottom', 'left']) => {
    return {
        items: position.map(name => {
            return {
                group: name,
                id: uuidv4(),
            };
        }),
        groups: {
            top: getAnchorStyle('top'),
            right: getAnchorStyle('right'),
            bottom: getAnchorStyle('bottom'),
            left: getAnchorStyle('left'),
        },
    };
};


export const nodeService = async (nodes: any, localeProps?: GeneralIntlLocaleProps) => {
    const customNodes = getRegisterNode(nodes);
    return [
        ...customNodes,
        ...NODEPOOL.map(({name, ports, width = NODE_WIDTH, height = NODE_HEIGHT, label = ''}) => {
            const nameAlias = StringUtils.toCamelCase(name.replace(/\s+/g, ''));
            const nameValue = ObjectUtils.getProp(localeProps, nameAlias);
            // noinspection JSUnusedGlobalSymbols
            return {
                id: uuidv4(),
                renderKey: name,
                name,
                alias: nameValue,
                label,
                popoverContent: nameValue ?? name,
                width,
                height,
                ports: getPorts(ports),
            };
        }),
    ];
};
