import React from "react";
import moment from "moment";
import 'moment/min/locales';

const DateRange = props => {
    const userLang = navigator.language || navigator.userLanguage;
    const language = userLang.split("-", 1);

    const start = moment(new Date(props.start));
    const end = moment(new Date(props.end));

    start.locale(language);
    end.locale(language);

    console.log("Language: " + language);
    moment.locale(language);

    if(start.isSame(end)){
        return (
            <p style={{float: 'left'}}>{start.format('DD')} {start.format('MMM YYYY')}
                &nbsp; ({start.format('ddd')})
            </p>
        )
    }
    else {

        return (
            <p style={{float: 'left'}}>{start.format('DD')} - {end.format('DD')} {end.format('MMM YYYY')}
                &nbsp; ({start.format('ddd')} - {end.format('ddd')})
            </p>
        )
    }

};

export default DateRange;