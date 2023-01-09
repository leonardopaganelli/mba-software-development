import Court from "@models/court.model";

async function findAllCourts () {
    return await Court.findAll({
        plain: true
    });
}

async function findOneCourt(id: number) {
    return await Court.findOne({
        where: { id },
        raw: true
    })
}

export {findAllCourts, findOneCourt}