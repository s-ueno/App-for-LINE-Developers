import React, { useState, useEffect } from "react";
import {
    styled,
    Button,
} from '@material-ui/core';

const StyledButton = styled(Button)({
    //ボタンのhoverスタイル
    "&:hover": {
        backgroundColor: "#f98297",
    },
});

export default StyledButton;