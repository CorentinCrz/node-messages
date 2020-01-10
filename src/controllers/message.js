import db from '../models/index';

const message = {
    async get(req, res) {
        const messages = await db.message.findAll().then();
        return res.send(messages);
    },
    async post(req, res) {
        const {title, content} = req.body;
        try {
            res.status(201).send(await db.message.create({title, content}))
        } catch(error) {
            res.status(400).send(error.message)
        }
        return res;
    },
    async delete(req, res) {
        const message = await db.message.destroy({
            where: {
            id: req.params.id
            }
        });
        return message ? res.send('deleted') : res.sendStatus(404);
    },
    async update(req, res) {
        console.log(req.body);
        const {title, content} = req.body;
        console.log({title, content});
        try {
            const message = await db.message.update({title, content}, {
                where: {
                id: req.params.id
                }
            });
            message[0] ? res.send('uptated') : res.sendStatus(404);
        } catch(error) {
            res.status(400).send(error.message)
        }
        return res
    }
}

export default message;