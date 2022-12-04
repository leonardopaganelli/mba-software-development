import Court from "@models/court.model";

async function findAllCourts () {
    return (await Court.findAll()).map((u) => u.get());
}

async function findOneCourt(id: number){
    return (await Court.findOne({
        where: { id }
    }))?.get()
}

export {findAllCourts, findOneCourt}