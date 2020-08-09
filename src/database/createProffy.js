//JS parar inserir os proffys no banco a partir do front.
module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
    /*await é para q o banco espere concluir para depois continuar o código !! 
    Se tem await n precisa do then() e só pode usar await em função se tiver async antes dela.
    Eu uso then() quando quero q a função continue e await quando quero parar o código.*/

    const insertedProffyId = await db.run(`
        INSERT INTO proffys (
            name, avatar, whatsapp, bio
        ) VALUES (
            '${proffyValue.name}',
            '${proffyValue.avatar}',
            '${proffyValue.whatsapp}',
            '${proffyValue.bio}'
        );
    `);

    const insertedClassesId = await db.run(`
        INSERT INTO classes (
            subject, cost, proffy_id
        ) VALUES (
            '${classValue.subject}',
            '${classValue.cost}',
            '${insertedProffyId.lastID}'
        );
    `);

    const insertedAllClassScheduleId = classScheduleValues.map((value) => {//Executa a função para cada elemento do array e retorna um novo array com os novos valores.
        return db.run(`
            INSERT INTO class_schedule (
                class_id, weekday, time_from, time_to
            ) VALUES (
                '${insertedClassesId.lastID}',
                '${value.weekday}',
                '${value.time_from}',
                '${value.time_to}'
            );
        `);
    });

    await Promise.all(insertedAllClassScheduleId);

};