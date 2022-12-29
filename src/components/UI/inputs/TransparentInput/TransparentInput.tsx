import React, {ChangeEvent, FC, useState} from 'react';
import Input, {InputProps} from "../Input/Input";

interface TransparentInputProps extends InputProps{
   // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TransparentInput: FC<TransparentInputProps> = ({ ...props}) => {

    const [episodeProgressWight, setEpisodeProgressWight] = useState<string>('70px');
    const [episodeProgress, setEpisodeProgress] = useState<string | null>( '0');

    const onFocusEpisodeProgress = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '-') setEpisodeProgress('');
    }

    const onBlurEpisodeProgress = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 0) {
            setEpisodeProgressWight('30px');
        }
        if (e.target.value === '') setEpisodeProgress('-');
    }


    return (
        // @ts-ignore
        <Input
            maxLength={5}
            pattern='[0-9]*'
            style={{width: episodeProgressWight}}
            value={episodeProgress!}
            onFocus={onFocusEpisodeProgress}
            onBlur={onBlurEpisodeProgress}
            className='anime-list__item__right__data__progress__input'
            {...props}
            //onChange={onChange}
        />
    );
};

export default TransparentInput;
