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
import {Select} from 'antd';
import {useIntl} from '@ant-design/pro-provider';
import {FormItemHeight} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/constants';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import {intlLocales} from '../intl-locales';


export interface IProps {
    label?: string;
    value?: string;
    options?: {
        label: string | number
        value: string | number
    }[];
    width?: number | string;
    onChange?: (value: string) => void;
}


const SelectField: React.FC<IProps> = (props: IProps) => {
    const locale = useIntl().locale;

    const {
        label = ObjectUtils.firstNotNil(intlLocales.get([locale, 'arrow']), intlLocales.get(['en_US', 'arrow'])),
        value,
        onChange,
        options = [],
        width
    } = props;

    return (
        <div className='group'>
            <label>{label}</label>
            <Select
                size='small'
                value={value}
                style={{
                    width,
                    height: FormItemHeight,
                }}
                getPopupContainer={trigger => trigger.parentNode}
                optionFilterProp='children'
                onChange={(v: string) => {
                    onChange?.(v);
                }}
                filterOption={(input, option) => {
                    // @ts-ignore
                    const {label: text = ''} = option;
                    // noinspection SuspiciousTypeOfGuard
                    if (typeof text === 'string') {
                        return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    }
                    return text.toString().indexOf(input.toLowerCase()) >= 0;
                }}
                options={options}
            />
        </div>
    );
};


export default SelectField;
