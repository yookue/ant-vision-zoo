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


import React from 'react';
import {XFlow, XFlowGraphCommands, FlowchartCanvas, FlowchartExtension, NsGraphCmd} from '@antv/xflow';
import '@antv/xflow/dist/index.css';
import {CanvasScaleToolbar} from '@yookue/ant-vision-zoo';


// noinspection JSUnusedGlobalSymbols
export default () => {
    return (
        <XFlow
            meta={{
                flowId: '001',
            }}
            style={{
                height: '420px',
                position: 'relative',
                borderRadius: '2px',
            }}
            onLoad={async app => {
                const graphData = JSON.parse(`{"nodes":[{"id":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","renderKey":"Terminal","name":"Terminal","label":"開始","width":60,"height":40,"ports":{"items":[{"group":"top","id":"bad4ebe5-51dc-4ddf-84f0-80ca4a327b9f"},{"group":"right","id":"80cbffa3-b751-4803-b883-fea4ec4320c3"},{"group":"bottom","id":"13a14d23-d7b2-42dd-8dc4-17124694995e"},{"group":"left","id":"2c1440f7-1b87-4f83-8e9d-f49d7b233d54"}],"groups":{"top":{"position":{"name":"top"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"right":{"position":{"name":"right"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"bottom":{"position":{"name":"bottom"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"left":{"position":{"name":"left"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10}}},"x":280,"y":90,"zIndex":10,"incomingEdges":null,"outgoingEdges":[{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","strokeWidth":1,"targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5"}},"id":"node-8df75ed5-20c8-4196-a888-64f16cd67f49:80cbffa3-b751-4803-b883-fea4ec4320c3-node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f:8cb6bd43-dc13-4816-9fb2-c617e281c6f3","targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","zIndex":1,"data":{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":{"cell":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","port":"80cbffa3-b751-4803-b883-fea4ec4320c3"},"target":{"cell":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","port":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}},"zIndex":1,"data":{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","target":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}}},"id":"node-8df75ed5-20c8-4196-a888-64f16cd67f49:80cbffa3-b751-4803-b883-fea4ec4320c3-node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f:8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePort":"80cbffa3-b751-4803-b883-fea4ec4320c3","targetPort":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"source":{"cell":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","port":"80cbffa3-b751-4803-b883-fea4ec4320c3"},"target":{"cell":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","port":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"labels":[{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":{"cell":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","port":"80cbffa3-b751-4803-b883-fea4ec4320c3"},"target":{"cell":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","port":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}},"zIndex":1,"data":{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","target":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}}},"id":"node-8df75ed5-20c8-4196-a888-64f16cd67f49:80cbffa3-b751-4803-b883-fea4ec4320c3-node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f:8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePort":"80cbffa3-b751-4803-b883-fea4ec4320c3","targetPort":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"}]}]},{"id":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","renderKey":"Process","name":"Process","label":"結束","width":60,"height":40,"ports":{"items":[{"group":"top","id":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},{"group":"right","id":"10308e5f-14d8-41a9-9895-88668cccd661"},{"group":"bottom","id":"3bf7976d-945b-4220-8642-7204ce9cfb21"},{"group":"left","id":"187a6dc9-d5aa-4519-9553-64633ccb4114"}],"groups":{"top":{"position":{"name":"top"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"right":{"position":{"name":"right"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"bottom":{"position":{"name":"bottom"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"left":{"position":{"name":"left"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10}}},"x":490,"y":220,"zIndex":10,"incomingEdges":[{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","strokeWidth":1,"targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5"}},"id":"node-8df75ed5-20c8-4196-a888-64f16cd67f49:80cbffa3-b751-4803-b883-fea4ec4320c3-node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f:8cb6bd43-dc13-4816-9fb2-c617e281c6f3","targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","zIndex":1,"data":{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":{"cell":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","port":"80cbffa3-b751-4803-b883-fea4ec4320c3"},"target":{"cell":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","port":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}},"zIndex":1,"data":{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","target":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}}},"id":"node-8df75ed5-20c8-4196-a888-64f16cd67f49:80cbffa3-b751-4803-b883-fea4ec4320c3-node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f:8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePort":"80cbffa3-b751-4803-b883-fea4ec4320c3","targetPort":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"source":{"cell":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","port":"80cbffa3-b751-4803-b883-fea4ec4320c3"},"target":{"cell":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","port":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"labels":[{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":{"cell":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","port":"80cbffa3-b751-4803-b883-fea4ec4320c3"},"target":{"cell":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","port":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}},"zIndex":1,"data":{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","target":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}}},"id":"node-8df75ed5-20c8-4196-a888-64f16cd67f49:80cbffa3-b751-4803-b883-fea4ec4320c3-node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f:8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePort":"80cbffa3-b751-4803-b883-fea4ec4320c3","targetPort":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"}]}],"outgoingEdges":null}],"edges":[{"id":"node-8df75ed5-20c8-4196-a888-64f16cd67f49:80cbffa3-b751-4803-b883-fea4ec4320c3-node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f:8cb6bd43-dc13-4816-9fb2-c617e281c6f3","targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":{"cell":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","port":"80cbffa3-b751-4803-b883-fea4ec4320c3"},"target":{"cell":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","port":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"},"attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}},"zIndex":1,"data":{"targetPortId":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3","sourcePortId":"80cbffa3-b751-4803-b883-fea4ec4320c3","source":"node-8df75ed5-20c8-4196-a888-64f16cd67f49","target":"node-b7fbad72-42fa-419d-8b89-7f38c6c30d2f","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8},"strokeDasharray":"5 5","strokeWidth":1}}},"sourcePort":"80cbffa3-b751-4803-b883-fea4ec4320c3","targetPort":"8cb6bd43-dc13-4816-9fb2-c617e281c6f3"}]}`);
                await app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {graphData} as NsGraphCmd.GraphRender.IArgs);
            }}
        >
            <FlowchartExtension/>
            <CanvasScaleToolbar
                className='xflow-canvas-toolbar-top'
                layout='horizontal'
                position={{
                    top: 0,
                    right: 0,
                }}
                style={{
                    width: 150,
                    height: 39,
                    left: 'auto',
                }}
                locale='zh_TW'
            />
            <FlowchartCanvas
                config={{
                    autoResize: true,
                }}
                position={{
                    top: 40,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}
            />
        </XFlow>
    );
}
