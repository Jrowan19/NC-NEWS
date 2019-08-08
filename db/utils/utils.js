exports.formatDates = list => {
    return list.map(({ created_at, ...restOfObject }) => {

        return created_at ?
            {
                created_at: new Date(created_at),
                ...restOfObject

            } : { ...restOfObject }
    });
};

exports.makeRefObj = (array, key, value) => {

    return array.reduce((refObj, element) => {
        refObj[element[key]] = element[value];

        return refObj
    }, {});
};

exports.formatComments = (comments, articleRef) => {
    //console.log(comments)

    return comments.map(({ created_by, belongs_to, created_at, ...restOfKeys }) => {
        return {
            author: created_by,
            article_id: articleRef[belongs_to],
            created_at: new Date(created_at),
            ...restOfKeys
        }; // change all of the properties then spread the rest of the keys out 
    });
};



























