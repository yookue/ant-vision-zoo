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


import {NodeService} from './components/node';
import {EdgeService} from './components/edge';
import {GroupService} from './components/group';
import {CanvasService} from './components/canvas';


export const defaultControlMapService = (ctrlMap: any) => {
    ctrlMap.set('canvas-service', CanvasService);
    ctrlMap.set('group-service', GroupService);
    ctrlMap.set('node-service', NodeService);
    ctrlMap.set('edge-service', EdgeService);
    return ctrlMap;
};


export {EditorPanels} from './components/fields';


// noinspection JSUnusedGlobalSymbols
export const FlowchartService = {
    CanvasService,
    GroupService,
    NodeService,
    EdgeService,
};
