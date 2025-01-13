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
import {useXFlowApp, type IGraphConfig} from '@antv/xflow-core';
import {PREFIX} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/constants';
import Trigger from 'rc-trigger';
import 'rc-trigger/assets/index.less';
import {ChromePicker} from 'react-color';


export interface IProps {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    getContainer?: () => HTMLDivElement;
}


const ColorPicker: React.FC<IProps> = (props: IProps) => {
    const {
        label,
        value = '',
        onChange,
        getContainer
    } = props;

    const colorRef = React.useRef<string>(value);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const graphConfig = React.useRef<IGraphConfig>();
    const [popupOpen, setPopupOpen] = React.useState(false);

    const {graphProvider} = useXFlowApp();
    graphProvider.getGraphOptions().then((x6GraphConfig: any) => {
        graphConfig.current = x6GraphConfig;
    });

    return (
        <div className='group' ref={containerRef}>
            {label && <label>{label}</label>}
            <Trigger
                action={['click']}
                getPopupContainer={() => {
                    return (typeof getContainer === 'function' ? getContainer() : getContainer) ?? document.documentElement;
                }}
                popup={(
                    <ChromePicker
                        color={colorRef.current}
                        onChangeComplete={(color) => {
                            colorRef.current = color.hex;
                            onChange?.(color.hex);
                        }}
                    />
                )}
                popupAlign={{
                    points: ['tr', 'br'],
                    offset: [0, 4],
                }}
                popupClassName={`${PREFIX}-color-popup`}
                popupVisible={popupOpen}
                onPopupVisibleChange={setPopupOpen}
            >
                <div
                    className={`${PREFIX}-color-container`}
                    onClick={() => {
                        setPopupOpen(true);
                    }}
                >
                    <div
                        className={`${PREFIX}-color`}
                        style={{
                            backgroundColor: value,
                            height: '100%',
                        }}
                    />
                </div>
            </Trigger>
        </div>
    );
};


export default React.memo(ColorPicker, (pre, next) => {
    return pre.label === next.label && pre.value === next.value;
});
