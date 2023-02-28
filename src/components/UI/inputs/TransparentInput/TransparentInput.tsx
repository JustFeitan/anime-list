import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

import Input, { InputProps } from "../Input/Input";
import "./TransparentInput.scss";

interface TransparentInputProps extends InputProps {
    autoSize?: boolean;
}

const TransparentInput: FC<TransparentInputProps> = ({
    value,
    onChange,
    width,
    autoSize = false,
    ...props
}) => {
    const [episodeProgress, setEpisodeProgress] = useState<
        string | number | readonly string[] | undefined
    >(value);
    const [episodeProgressWight, setEpisodeProgressWight] = useState<string>(
        (episodeProgress as string).length * 12 + "px"
    );

    const onFocusEpisodeProgress = (e: ChangeEvent<HTMLInputElement>) => {
        if (episodeProgress === "-") setEpisodeProgress("");
    };

    const onBlurEpisodeProgress = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 0) {
            setEpisodeProgressWight("30px");
        }
        if (episodeProgress === "") setEpisodeProgress("-");
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let onlyNumbers: string | null = e.target.value.replace(/\D/g, "");
        setEpisodeProgress(onlyNumbers);
        setEpisodeProgressWight((onlyNumbers as string).length * 12 + "px");
        if (!onChange) return;
        onChange(e);
    };

    return (
        <Input
            style={autoSize ? { width: episodeProgressWight } : { width }}
            onFocus={onFocusEpisodeProgress}
            onBlur={onBlurEpisodeProgress}
            value={episodeProgress}
            className="input-transparent"
            {...props}
            onChange={onChangeHandler}
            ref={null}
        />
    );
};

export default TransparentInput;
