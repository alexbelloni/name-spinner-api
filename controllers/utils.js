/**
 * 
 * @param {*} stringDate e.g. 2021-12-07 or 2021-12-07T00:00:00.000Z
 * returns {d1, d2} as strings
 */
function getISODateAndOneMonthBefore(stringDate){
    if(!stringDate) return
    const d = stringDate.split('-');
    const day = d[2].indexOf('T') >= 0 ? d[2].split('T')[0]: d[2];

    const d1 = new Date(`${d[0]}-${parseInt(d[1])}-${day}T23:59:59.000Z`);
    d1.setDate(d1.getDate() - 1)
    const d2 = new Date(`${d[0]}-${parseInt(d[1])}-${day}T00:00:00.000Z`);
    d2.setMonth(d2.getMonth() - 1);    

    return {d1, d2}
}

module.exports = {getISODateAndOneMonthBefore}