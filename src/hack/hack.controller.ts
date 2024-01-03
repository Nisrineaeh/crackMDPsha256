import { Controller, Get } from '@nestjs/common';
import { HackService } from './hack.service';

@Controller('hack')
export class HackController {

    constructor(private hackService : HackService){}

    @Get('/2')
    async resolve2Challenge() {
        const challenge = await this.hackService.recupChallenge();
        const { id, hash, salt } = challenge;
        const password = await this.hackService.bruteForce(hash, salt);
        if (password) {
            const submitResponse = await this.hackService.responseChallenge(id, password);
            return submitResponse;
        } else {
            return { message: 'Aucun mot de passe correspondant trouvé' };
        }
    }

    @Get('')
     resolveChallenge() {
        return this.hackService.bruteForce("e428ecbe592d1e5a25da752d01e72921abc42a5254923e9fb4c808c69831dcc0", "4bac23c5eee1c4b8b80ef85be5360de5");
        } 
    }



