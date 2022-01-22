

const paginationData = (query) => {

    let {page = 1, limit} = query    

    if (!limit) limit = 15

    limit = parseInt(limit)
    page = parseInt(page) - 1

    if (page < 0) {
        page = 0;
    }


    const offset = page ? page * (limit) : 0    


    return {offset, limit, page}


}

module.exports = {paginationData}