const dataBase = require('../database/db.js');
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./formater.js');

//funcionalidades
function pageLanding(req, res) {
    return res.render('index.html');
}

async function pageStudy(req, res) {
    const filters = req.query;

    if (!filters.subject || !filters.weekday || !filters.time) {
        //render(páginaQueRenderizada, objetoQueEnviará, outroObj...pode ser vários)
        return res.render('study.html', { filters, subjects, weekdays });
    }

    const timeMinutes = convertHoursToMinutes(filters.time);

    const SQLquery = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.* 
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id 
            AND class_schedule.weekday = ${filters.weekday} 
            AND class_schedule.time_from <= ${timeMinutes} 
            AND class_schedule.time_to > ${timeMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `;

    try {
        const db = await dataBase
        const selectedProffys = await db.all(SQLquery);

        selectedProffys.map(element => {
            element.subject = getSubject(element.subject);
        });

        return res.render('study.html', { selectedProffys, filters, subjects, weekdays });
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    return res.render('give-classes.html', { subjects, weekdays });
}

async function pageGiveClassesSave(req, res) {
    const createProffy = require('../database/createProffy.js');

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    //Tabela classes
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    //Tabela class_schedule
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    });

    try {
        const db = await dataBase
        await createProffy(db, { proffyValue, classValue, classScheduleValues });
        return res.redirect('/study');
    } catch (error) {
        console.log(error);
    }

}

module.exports = { pageLanding, pageStudy, pageGiveClasses, pageGiveClassesSave };