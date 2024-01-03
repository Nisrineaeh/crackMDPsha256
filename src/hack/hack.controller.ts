import { Controller, Get } from '@nestjs/common';
import { HackService } from './hack.service';

@Controller('hack')
export class HackController {

    constructor(private hackService : HackService){}

    @Get('')
    async resolveChallenge() {
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
}


