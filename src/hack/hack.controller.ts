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
        return  this.hackService.bruteForce("c900cfa79113f5c38d746146940aea7b01965d636ec17c1a5d1dee77a2c2f4fc", "730e43b1bd0b8a7079c6fc1397bf1469");
        } 
    }



