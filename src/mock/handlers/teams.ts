import { rest } from 'msw';
import { TeamMember } from 'types';
import devTeam, { addTeamMember } from './devTeam';

export default [
    rest.get('/api/dev-team/get-teams', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                devTeam: devTeam(),
            })
        );
    }),
    rest.post('/api/dev-team/add-member', async (req, res, ctx) => {
        const { newMember, teamName } = req.body as {
            newMember: TeamMember;
            teamName: string;
        };
        if (!newMember || !teamName) {
            return res(ctx.status(400));
        }
        addTeamMember(newMember, teamName);
    }),
];
