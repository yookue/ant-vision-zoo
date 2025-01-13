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


import InputNumberFiled from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/fields/input-number';
import ColorPicker from './color';
import InputFiled from './input';
import Position from './position';
import SelectField from './select';
import Size from './size';


export const EditorPanels: Record<string, React.FC | React.NamedExoticComponent<any>> = {
    ColorPicker,
    InputFiled,
    InputNumberFiled,
    Position,
    SelectField,
    Size,
};


export {InputFiled, ColorPicker, InputNumberFiled, Size, Position, SelectField};
