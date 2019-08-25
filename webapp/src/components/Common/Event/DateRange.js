import React from "react";
import moment from "moment";
import 'moment/min/locales';
import './DateRange.css'

const DateRange = props => {
    const userLang = navigator.language || navigator.userLanguage;
    const language = userLang.split("-", 1);

    const start = moment(new Date(props.start));
    const end = moment(new Date(props.end));

    start.locale(language);
    end.locale(language);

    if(start.isSame(end)){
        return (
            <div className="DateRange">
                <div className="DateRange_dayname">
                    {start.format('ddd')}
                </div>
                <div className="DateRange_date">
                    {start.format('DD')}.{start.format('MM')}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="DateRange">
                <div className="DateRange_dayname">
                    {start.format('ddd')}-{end.format('ddd')}
                </div>
                <div className="DateRange_date">
                    {start.format('DD')}-{end.format('DD')}.{end.format('MM')}
                </div>
            </div>
        )
    }

};

export default DateRange;