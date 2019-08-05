exports.formatDates = list => {
    return list.map(({ created_at, ...restOfObject }) => {
        console.log(created_at)
        return created_at ?
            {
                created_at: new Date(created_at),
                ...restOfObject

            } : { ...restOfObject }
    });

};

exports.makeRefObj = list => { };

exports.formatComments = (comments, articleRef) => { };


exports.changeShopData = (shops, refObj) => {


}