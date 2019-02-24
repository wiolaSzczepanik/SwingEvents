import React from "react";
import moment from "moment";

const DateRange = props => {
    const start = moment(new Date(props.start));
    const end = moment(new Date(props.end));

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