import React, { useState, FormEvent, Dispatch } from "react";
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from "@material-ui/core";
import clsx from "clsx";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import style from "./style";
const cssInCode = makeStyles(style);

type Props = {
    value?: string,
    label?: string,
    multiline?: boolean,
    readOnly?: boolean,
    onChange?: (value) => void
}


const PasswordField: React.FCX<Props> = (props) => {

    const classes = cssInCode();
    const [values, setValues] = useState({
        password: props?.multiline ? "●●●●●" : (props?.value ?? ""),

        showPassword: false,
        multiline: props?.multiline ?? false,
        multilineValue: props?.value ?? "",
    });
    const handleChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        if (props.onChange) {
            props.onChange(event.target.value);
        }
    };

    const handleClickShowPassword = () => {
        // setValues({ ...values, showPassword: !values.showPassword });


        if (!values.showPassword) {
            setValues({ ...values, showPassword: !values.showPassword, password: values.multilineValue });
        } else {
            setValues({ ...values, showPassword: !values.showPassword, password: "●●●●●" });
        }
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const id = "pass-" + uuidv4();
    return (
        //        <FormControl className={clsx(classes.margin, classes.textField, props.className)}>
        <FormControl className={props.className}>
            <InputLabel htmlFor={id}>{props.label}</InputLabel>
            <Input
                id={id}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                multiline={values.multiline}
                readOnly={props.readOnly}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default PasswordField;
