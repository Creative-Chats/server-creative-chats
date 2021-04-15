import { Guild, router } from '../models/index.model';
import { Request, Response } from 'express';

router.get('/:id', async (req: Request, res: Response) => {
    const guild = await Guild.findOne({guildId: req.params.id});
    if (!guild) return res.status(404).send({'msg': 'The guild by ID doesn\'t exist'});
    res.status(200).send({
        'cdn': process.env.RESOURCES_URL,
        'data': guild
    });
});

router.post('/', async (req: Request, res: Response) => {
    const findGuild = await Guild.findOne({guildId: req.body.guildId});
    if (findGuild) {
        res.status(200).send({'msg': 'The guild already exist'});
    } else {
        const guild = new Guild(req.body);
        const result = await guild.save();
        res.status(201).send(result);
    }
});

router.put('/setLog/:id', async (req: Request, res: Response) => {
    const guild = await Guild.findOneAndUpdate({guildId: req.params.id}, {
        $set: {
            log: req.body.log
        }
    },
    {
        new: true
    });

    if (!guild) return res.status(404).send({'msg': 'The guild doesn\'t exist', 'id':req.params.id });
    res.status(204).send();
});

router.put('/setCategory/:id', async (req: Request, res: Response) => {
    const guild = await Guild.findOneAndUpdate({guildId: req.params.id}, {
            $set: {
                category: req.body.category
            }
        },
        {
            new: true
        });

    if (!guild) return res.status(404).send({'msg': 'The guild doesn\'t exist', 'id':req.params.id});
    res.status(204).send();
});

router.put('/setOrnaments/:id', async (req: Request, res: Response) => {
    const guild = await Guild.findOneAndUpdate({guildId: req.params.id}, {
            $set: {
                start: req.body.start,
                end: req.body.end
            }
        },
        {
            new: true
        });

    if (!guild) return res.status(404).send({'msg': 'The guild doesn\'t exist'});
    res.status(204).send();
});

export default router;
